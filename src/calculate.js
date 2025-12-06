import { request, gql } from 'graphql-request';

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/YOUR_SUBGRAPH';

const query = gql`
  query GetClaims($claimer: Bytes!) {
    claimeds(where: { claimer: $claimer }) {
      amount
      timestamp
    }
  }
`;

async function calculateRemaining(
  claimer: string, 
  eligibleAmount: bigint
): Promise<bigint> {
  const data = await request(SUBGRAPH_URL, query, { claimer: claimer.toLowerCase() });
  
  const totalClaimed = data.claimeds.reduce(
    (sum: bigint, claim: any) => sum + BigInt(claim.amount), 
    0n
  );
  
  return eligibleAmount - totalClaimed;
}

// Пример использования
const allocations = JSON.parse(fs.readFileSync('Claiming.json', 'utf8'));

for (const [address, eligible] of Object.entries(allocations)) {
  const remaining = await calculateRemaining(address, BigInt(eligible as string));
  console.log(`${address}: ${remaining.toString()} remaining`);
}