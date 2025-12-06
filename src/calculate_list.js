import { request, gql } from "graphql-request";
import fs from "fs";

const SUBGRAPH_URL =
  "https://api.studio.thegraph.com/query/87795/think-claiming/v0.0.1";

const queryAllClaims = gql`
  query GetAllClaims($skip: Int!) {
    claimeds(
      first: 1000
      skip: $skip
      orderBy: blockNumber
      orderDirection: asc
    ) {
      claimer
      amount
      timestamp
      blockNumber
    }
  }
`;

async function getAllClaims() {
  let allClaims = [];
  let skip = 0;
  let hasMore = true;

  while (hasMore) {
    const data = await request(SUBGRAPH_URL, queryAllClaims, { skip });
    allClaims = allClaims.concat(data.claimeds);

    hasMore = data.claimeds.length === 1000;
    skip += 1000;

    if (hasMore) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  return allClaims;
}

function toWei(amount) {
  const [whole, decimal = "0"] = String(amount).split(".");
  const paddedDecimal = decimal.padEnd(18, "0").slice(0, 18);
  return BigInt(whole + paddedDecimal);
}

function fromWei(amount) {
  const str = amount.toString().padStart(19, "0");
  const whole = str.slice(0, -18) || "0";
  const decimal = str.slice(-18).replace(/0+$/, "");
  return decimal ? `${whole}.${decimal}` : whole;
}

async function main() {
  const allocations = JSON.parse(fs.readFileSync("claimers.json", "utf8"));

  const TOTAL_DEPOSITED = toWei("12992197");
  const CURRENT_BALANCE = 0n;

  const allocationsMap = {};
  let totalPlanned = 0n;

  for (const [addr, amount] of Object.entries(allocations)) {
    const planned = toWei(amount);
    allocationsMap[addr.toLowerCase()] = planned;
    totalPlanned += planned;
  }

  console.log("Fetching all claims from subgraph...");
  const allClaims = await getAllClaims();

  const claimsByAddress = {};
  for (const claim of allClaims) {
    const addr = claim.claimer.toLowerCase();
    if (!claimsByAddress[addr]) {
      claimsByAddress[addr] = 0n;
    }
    claimsByAddress[addr] += BigInt(claim.amount);
  }

  let totalClaimed = 0n;
  let totalOverclaim = 0n;
  let totalRemaining = 0n;
  let addressesWithClaims = 0;

  // Только адреса из списка
  for (const [address, planned] of Object.entries(allocationsMap)) {
    const claimed = claimsByAddress[address] || 0n;
    const remaining = planned - claimed;

    totalClaimed += claimed;

    if (claimed > 0n) {
      addressesWithClaims++;
    }

    if (remaining < 0n) {
      totalOverclaim += -remaining;
    } else {
      totalRemaining += remaining;
    }

    console.log(
      `${address}, ${planned.toString()}, ${claimed.toString()}, ${remaining.toString()}`
    );
  }

  console.log("\n" + "=".repeat(80));
  console.log("TOTALS (KNOWN ADDRESSES ONLY)");
  console.log("=".repeat(80));
  console.log(`Total addresses in list: ${Object.keys(allocationsMap).length}`);
  console.log(`Addresses with claims: ${addressesWithClaims}`);
  console.log(
    `Total planned: ${fromWei(totalPlanned)} tokens (${totalPlanned.toString()} wei)`
  );
  console.log(
    `Total claimed: ${fromWei(totalClaimed)} tokens (${totalClaimed.toString()} wei)`
  );
  console.log(
    `Total overclaim: ${fromWei(totalOverclaim)} tokens (${totalOverclaim.toString()} wei)`
  );
  console.log(
    `Total non-claimed (remaining > 0): ${fromWei(totalRemaining)} tokens (${totalRemaining.toString()} wei)`
  );
  console.log();
  console.log(
    `Contract deposited: ${fromWei(TOTAL_DEPOSITED)} tokens (${TOTAL_DEPOSITED.toString()} wei)`
  );
  console.log(
    `Contract current balance: ${fromWei(CURRENT_BALANCE)} tokens (${CURRENT_BALANCE.toString()} wei)`
  );
  console.log();

  const expectedBalance = TOTAL_DEPOSITED - totalClaimed;
  const discrepancy = expectedBalance - CURRENT_BALANCE;
  const listDiscrepancy = TOTAL_DEPOSITED - totalPlanned;

  console.log("DISCREPANCIES");
  console.log("=".repeat(80));
  console.log(
    `Expected balance: ${fromWei(expectedBalance)} tokens (deposited - claimed by known)`
  );
  console.log(`Actual balance: ${fromWei(CURRENT_BALANCE)} tokens`);
  console.log(`Balance discrepancy: ${fromWei(discrepancy)} tokens`);
  console.log();
  console.log(
    `List vs Deposited: ${fromWei(listDiscrepancy)} tokens difference`
  );
  console.log(
    `  (Deposited ${fromWei(TOTAL_DEPOSITED)} - Planned ${fromWei(totalPlanned)})`
  );
  console.log();

  if (totalOverclaim > 0n) {
    console.log(
      `⚠️  OVERCLAIM: ${fromWei(totalOverclaim)} tokens claimed above planned amounts`
    );
  }

  if (discrepancy !== 0n) {
    console.log(
      `⚠️  BALANCE MISMATCH: ${fromWei(Math.abs(Number(discrepancy)))} tokens ${discrepancy > 0n ? "missing" : "extra"}`
    );
  }

  if (listDiscrepancy !== 0n) {
    console.log(
      `⚠️  LIST MISMATCH: ${fromWei(Math.abs(Number(listDiscrepancy)))} tokens ${listDiscrepancy > 0n ? "not in list" : "extra in list"}`
    );
  }

  const csvLines = ["address,planned,claimed,remaining"];

  for (const [address, planned] of Object.entries(allocationsMap)) {
    const claimed = claimsByAddress[address] || 0n;
    const remaining = planned - claimed;

    csvLines.push(
      `${address},${fromWei(planned)},${fromWei(claimed)},${fromWei(remaining)}`
    );
  }

  fs.writeFileSync("results.csv", csvLines.join("\n"));
  console.log("\nResults saved to results.csv (Excel-ready)");
}

main().catch(console.error);
