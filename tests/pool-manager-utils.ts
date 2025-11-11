import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import {
  AnnouncePool,
  PoolUpserted,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StrategyAddedToLayer,
  StrategyRemovedFromLayer
} from "../generated/PoolManager/PoolManager"

export function createAnnouncePoolEvent(
  poolId: BigInt,
  startDay: i32,
  endDay: i32
): AnnouncePool {
  let announcePoolEvent = changetype<AnnouncePool>(newMockEvent())

  announcePoolEvent.parameters = new Array()

  announcePoolEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  announcePoolEvent.parameters.push(
    new ethereum.EventParam(
      "startDay",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(startDay))
    )
  )
  announcePoolEvent.parameters.push(
    new ethereum.EventParam(
      "endDay",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(endDay))
    )
  )

  return announcePoolEvent
}

export function createPoolUpsertedEvent(
  poolId: BigInt,
  startDay: i32,
  endDay: i32,
  totalPoolWeight: BigInt,
  parentPoolId: BigInt
): PoolUpserted {
  let poolUpsertedEvent = changetype<PoolUpserted>(newMockEvent())

  poolUpsertedEvent.parameters = new Array()

  poolUpsertedEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  poolUpsertedEvent.parameters.push(
    new ethereum.EventParam(
      "startDay",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(startDay))
    )
  )
  poolUpsertedEvent.parameters.push(
    new ethereum.EventParam(
      "endDay",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(endDay))
    )
  )
  poolUpsertedEvent.parameters.push(
    new ethereum.EventParam(
      "totalPoolWeight",
      ethereum.Value.fromUnsignedBigInt(totalPoolWeight)
    )
  )
  poolUpsertedEvent.parameters.push(
    new ethereum.EventParam(
      "parentPoolId",
      ethereum.Value.fromUnsignedBigInt(parentPoolId)
    )
  )

  return poolUpsertedEvent
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

export function createStrategyAddedToLayerEvent(
  poolId: BigInt,
  layer: BigInt,
  strategyId: BigInt
): StrategyAddedToLayer {
  let strategyAddedToLayerEvent =
    changetype<StrategyAddedToLayer>(newMockEvent())

  strategyAddedToLayerEvent.parameters = new Array()

  strategyAddedToLayerEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  strategyAddedToLayerEvent.parameters.push(
    new ethereum.EventParam("layer", ethereum.Value.fromUnsignedBigInt(layer))
  )
  strategyAddedToLayerEvent.parameters.push(
    new ethereum.EventParam(
      "strategyId",
      ethereum.Value.fromUnsignedBigInt(strategyId)
    )
  )

  return strategyAddedToLayerEvent
}

export function createStrategyRemovedFromLayerEvent(
  poolId: BigInt,
  layer: BigInt,
  strategyId: BigInt
): StrategyRemovedFromLayer {
  let strategyRemovedFromLayerEvent =
    changetype<StrategyRemovedFromLayer>(newMockEvent())

  strategyRemovedFromLayerEvent.parameters = new Array()

  strategyRemovedFromLayerEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  strategyRemovedFromLayerEvent.parameters.push(
    new ethereum.EventParam("layer", ethereum.Value.fromUnsignedBigInt(layer))
  )
  strategyRemovedFromLayerEvent.parameters.push(
    new ethereum.EventParam(
      "strategyId",
      ethereum.Value.fromUnsignedBigInt(strategyId)
    )
  )

  return strategyRemovedFromLayerEvent
}
