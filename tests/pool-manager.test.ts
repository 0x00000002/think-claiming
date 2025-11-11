import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import { AnnouncePool } from "../generated/schema"
import { AnnouncePool as AnnouncePoolEvent } from "../generated/PoolManager/PoolManager"
import { handleAnnouncePool } from "../src/pool-manager"
import { createAnnouncePoolEvent } from "./pool-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let poolId = BigInt.fromI32(234)
    let startDay = 123
    let endDay = 123
    let newAnnouncePoolEvent = createAnnouncePoolEvent(poolId, startDay, endDay)
    handleAnnouncePool(newAnnouncePoolEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("AnnouncePool created and stored", () => {
    assert.entityCount("AnnouncePool", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AnnouncePool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "poolId",
      "234"
    )
    assert.fieldEquals(
      "AnnouncePool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "startDay",
      "123"
    )
    assert.fieldEquals(
      "AnnouncePool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "endDay",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
