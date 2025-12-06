import { Claimed as ClaimedEvent } from "../generated/Claiming/Claiming";
import { Claimed } from "../generated/schema";

export function handleClaimed(event: ClaimedEvent): void {
  let entity = new Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.claimer = event.params.claimer;
  entity.amount = event.params.amount;
  entity.timestamp = event.params.timestamp;
  entity.daysLock = event.params.daysLock;

  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
