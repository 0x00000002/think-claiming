import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  Paused,
  RewardClaimed,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StrategyFunded,
  StrategyWithdrawn,
  Unpaused
} from "../generated/RewardManagerV1_1/RewardManagerV1_1"

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRewardClaimedEvent(
  user: Address,
  stakeId: Bytes,
  poolId: BigInt,
  strategyId: BigInt,
  rewardAmount: BigInt,
  claimDay: i32
): RewardClaimed {
  let rewardClaimedEvent = changetype<RewardClaimed>(newMockEvent())

  rewardClaimedEvent.parameters = new Array()

  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam("stakeId", ethereum.Value.fromFixedBytes(stakeId))
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "strategyId",
      ethereum.Value.fromUnsignedBigInt(strategyId)
    )
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAmount",
      ethereum.Value.fromUnsignedBigInt(rewardAmount)
    )
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "claimDay",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(claimDay))
    )
  )

  return rewardClaimedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createStrategyFundedEvent(
  poolId: BigInt,
  strategyId: BigInt,
  amount: BigInt
): StrategyFunded {
  let strategyFundedEvent = changetype<StrategyFunded>(newMockEvent())

  strategyFundedEvent.parameters = new Array()

  strategyFundedEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  strategyFundedEvent.parameters.push(
    new ethereum.EventParam(
      "strategyId",
      ethereum.Value.fromUnsignedBigInt(strategyId)
    )
  )
  strategyFundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return strategyFundedEvent
}

export function createStrategyWithdrawnEvent(
  poolId: BigInt,
  strategyId: BigInt,
  amount: BigInt
): StrategyWithdrawn {
  let strategyWithdrawnEvent = changetype<StrategyWithdrawn>(newMockEvent())

  strategyWithdrawnEvent.parameters = new Array()

  strategyWithdrawnEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  strategyWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "strategyId",
      ethereum.Value.fromUnsignedBigInt(strategyId)
    )
  )
  strategyWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return strategyWithdrawnEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
