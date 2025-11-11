import { BigInt } from "@graphprotocol/graph-ts";
import { WalletAggregate } from "../generated/schema";
import {
  Staked as StakedEvent,
  Unstaked as UnstakedEvent
} from "../generated/StakingStorage/StakingStorage";
import { Staked, Unstaked } from "../generated/schema";

export function handleStaked(event: StakedEvent): void {
  let entity = new Staked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.staker = event.params.staker;
  entity.stakeId = event.params.stakeId;
  entity.amount = event.params.amount;
  entity.stakeDay = event.params.stakeDay;
  entity.daysLock = event.params.daysLock;
  entity.flags = event.params.flags;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Increase total staked amount for the wallet

  let walletId = event.params.staker.toHex();
  let wa = WalletAggregate.load(walletId);
  if (wa == null) {
    wa = new WalletAggregate(walletId);
    wa.totalStaked = event.params.amount;
  } else {
    wa.totalStaked = wa.totalStaked.plus(event.params.amount);
  }
  wa.lastUpdated = event.block.timestamp;
  wa.save();
}

export function handleUnstaked(event: UnstakedEvent): void {
  let entity = new Unstaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.staker = event.params.staker;
  entity.stakeId = event.params.stakeId;
  entity.unstakeDay = event.params.unstakeDay;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Decrease total staked amount for the wallet
  let walletId = event.params.staker.toHex();
  let wa = WalletAggregate.load(walletId);
  if (wa != null) {
    if (wa.totalStaked < event.params.amount) {
      wa.totalStaked = BigInt.fromI32(0);
    } else {
      wa.totalStaked = wa.totalStaked.minus(event.params.amount);
    }
    wa.lastUpdated = event.block.timestamp;
    wa.save();
  }
}
