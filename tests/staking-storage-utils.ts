import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  CheckpointCreated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Staked,
  Unstaked
} from "../generated/StakingStorage/StakingStorage"

export function createCheckpointCreatedEvent(
  staker: Address,
  day: i32,
  balance: BigInt,
  stakesCount: i32
): CheckpointCreated {
  let checkpointCreatedEvent = changetype<CheckpointCreated>(newMockEvent())

  checkpointCreatedEvent.parameters = new Array()

  checkpointCreatedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  checkpointCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "day",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(day))
    )
  )
  checkpointCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )
  checkpointCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "stakesCount",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(stakesCount))
    )
  )

  return checkpointCreatedEvent
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

export function createStakedEvent(
  staker: Address,
  stakeId: Bytes,
  amount: BigInt,
  stakeDay: i32,
  daysLock: i32,
  flags: i32
): Staked {
  let stakedEvent = changetype<Staked>(newMockEvent())

  stakedEvent.parameters = new Array()

  stakedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam("stakeId", ethereum.Value.fromFixedBytes(stakeId))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam(
      "stakeDay",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(stakeDay))
    )
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam(
      "daysLock",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(daysLock))
    )
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam(
      "flags",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(flags))
    )
  )

  return stakedEvent
}

export function createUnstakedEvent(
  staker: Address,
  stakeId: Bytes,
  unstakeDay: i32,
  amount: BigInt
): Unstaked {
  let unstakedEvent = changetype<Unstaked>(newMockEvent())

  unstakedEvent.parameters = new Array()

  unstakedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  unstakedEvent.parameters.push(
    new ethereum.EventParam("stakeId", ethereum.Value.fromFixedBytes(stakeId))
  )
  unstakedEvent.parameters.push(
    new ethereum.EventParam(
      "unstakeDay",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(unstakeDay))
    )
  )
  unstakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return unstakedEvent
}
