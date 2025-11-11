import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/ERC721MInitializableV1_0_1/ERC721MInitializableV1_0_1";
import { Transfer, NFTBalance } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  // Update NFT balances
  updateNFTBalance(event.params.from, -1, event.block.timestamp);
  updateNFTBalance(event.params.to, 1, event.block.timestamp);
}

function updateNFTBalance(
  address: Address,
  delta: i32,
  timestamp: BigInt
): void {
  let zeroAddress = "0x0000000000000000000000000000000000000000";
  if (address.toHex() == zeroAddress) return;

  let id = address.toHex();
  let balance = NFTBalance.load(id);

  if (balance == null) {
    balance = new NFTBalance(id);
    balance.count = 0;
  }

  let newCount = balance.count + delta;
  balance.count = newCount < 0 ? 0 : newCount;
  balance.lastUpdated = timestamp;
  balance.save();
}
