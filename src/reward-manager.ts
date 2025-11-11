import { RewardClaimed as RewardClaimedEvent } from "../generated/RewardManagerV1_1/RewardManagerV1_1";
import { RewardClaimed } from "../generated/schema";

export function handleRewardClaimed(event: RewardClaimedEvent): void {
  let entity = new RewardClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.stakeId = event.params.stakeId;
  entity.poolId = event.params.poolId;
  entity.strategyId = event.params.strategyId;
  entity.rewardAmount = event.params.rewardAmount;
  entity.claimDay = event.params.claimDay;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
