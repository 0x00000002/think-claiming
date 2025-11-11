import {
  AnnouncePool as AnnouncePoolEvent,
  PoolUpserted as PoolUpsertedEvent,
  StrategyAddedToLayer as StrategyAddedToLayerEvent,
  StrategyRemovedFromLayer as StrategyRemovedFromLayerEvent
} from "../generated/PoolManager/PoolManager";
import {
  AnnouncePool,
  PoolUpserted,
  StrategyAddedToLayer,
  StrategyRemovedFromLayer,
  Pool
} from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handlePoolUpserted(event: PoolUpsertedEvent): void {
  let entity = new PoolUpserted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.poolId = event.params.poolId;
  entity.startDay = event.params.startDay;
  entity.endDay = event.params.endDay;
  entity.totalPoolWeight = event.params.totalPoolWeight;
  entity.parentPoolId = event.params.parentPoolId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // id = poolId как строка
  let id = event.params.poolId.toString();
  let p = Pool.load(id);

  if (p == null) {
    p = new Pool(id);
    // дефолты на случай первого апдейта
    p.totalPoolWeight = BigInt.zero();
    p.hasAnnounced = false;
    p.parentPoolId = BigInt.zero();
    p.startDay = 0;
    p.endDay = 0;
  }

  // обновляем поля из события
  p.startDay = event.params.startDay; // uint16 -> Int
  p.endDay = event.params.endDay; // uint16 -> Int
  p.totalPoolWeight = event.params.totalPoolWeight; // uint256 -> BigInt
  p.parentPoolId = event.params.parentPoolId; // uint256 -> BigInt

  // метка времени последнего апдейта
  p.lastUpdated = event.block.timestamp;

  p.save();
}

export function handleAnnouncePool(event: AnnouncePoolEvent): void {
  // Save immutable event entity
  let entity = new AnnouncePool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.poolId = event.params.poolId;
  entity.startDay = event.params.startDay;
  entity.endDay = event.params.endDay;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update Pool entity
  let id = event.params.poolId.toString();
  let p = Pool.load(id);

  if (p == null) {
    // если почему-то анонс пришёл до первого PoolUpserted — создадим скелет
    p = new Pool(id);
    p.totalPoolWeight = BigInt.zero();
    p.parentPoolId = BigInt.zero();
    p.startDay = event.params.startDay;
    p.endDay = event.params.endDay;
  } else {
    // обновим даты из события анонса (на всякий случай)
    p.startDay = event.params.startDay;
    p.endDay = event.params.endDay;
  }

  p.hasAnnounced = true;
  p.lastUpdated = event.block.timestamp;

  p.save();
}

export function handleStrategyAddedToLayer(
  event: StrategyAddedToLayerEvent
): void {
  let entity = new StrategyAddedToLayer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.poolId = event.params.poolId;
  entity.layer = event.params.layer;
  entity.strategyId = event.params.strategyId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleStrategyRemovedFromLayer(
  event: StrategyRemovedFromLayerEvent
): void {
  let entity = new StrategyRemovedFromLayer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.poolId = event.params.poolId;
  entity.layer = event.params.layer;
  entity.strategyId = event.params.strategyId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
