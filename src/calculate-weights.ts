import { BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts";
import { WalletAggregate, Transfer, UserWeight } from "../generated/schema";

const NFT_CONTRACT = "0x11B3EfbF04F0bA505F380aC20444B6952970AdA6";

function getNFTMultiplier(nftCount: i32): BigDecimal {
  if (nftCount === 0) return BigDecimal.fromString("1.0");
  if (nftCount === 1) return BigDecimal.fromString("1.5");
  if (nftCount === 2) return BigDecimal.fromString("1.7");
  if (nftCount === 3) return BigDecimal.fromString("1.85");
  if (nftCount === 4) return BigDecimal.fromString("1.95");
  return BigDecimal.fromString("2.0"); // 5+
}

export function calculateUserWeight(
  walletAddress: Address,
  currentDay: i32
): void {
  let walletId = walletAddress.toHex();

  // Get stake weight
  let wa = WalletAggregate.load(walletId);
  if (wa == null) return;

  let stakeWeight = wa.totalStaked;

  // Count NFTs owned by this wallet
  let nftCount = countNFTsForWallet(walletAddress);

  // Apply multiplier
  let multiplier = getNFTMultiplier(nftCount);
  let finalWeight = stakeWeight
    .toBigDecimal()
    .times(multiplier)
    .truncate(0).digits;

  // Save result
  let userWeight = UserWeight.load(walletId);
  if (userWeight == null) {
    userWeight = new UserWeight(walletId);
  }

  userWeight.stakeWeight = stakeWeight;
  userWeight.nftCount = nftCount;
  userWeight.multiplier = multiplier;
  userWeight.finalWeight = BigInt.fromString(finalWeight);
  userWeight.lastCalculated = BigInt.fromI32(currentDay);

  userWeight.save();
}

function countNFTsForWallet(owner: Address): i32 {
  // Query all Transfer events where 'to' = owner and 'from' != owner
  // This is simplified - you'd need proper NFT balance tracking
  // Consider maintaining NFTBalance entity updated on each Transfer
  return 0; // Placeholder
}
