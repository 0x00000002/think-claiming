import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CheckpointCreated } from "../generated/schema"
import { CheckpointCreated as CheckpointCreatedEvent } from "../generated/StakingStorage/StakingStorage"
import { handleCheckpointCreated } from "../src/staking-storage"
import { createCheckpointCreatedEvent } from "./staking-storage-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let staker = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let day = 123
    let balance = BigInt.fromI32(234)
    let stakesCount = 123
    let newCheckpointCreatedEvent = createCheckpointCreatedEvent(
      staker,
      day,
      balance,
      stakesCount
    )
    handleCheckpointCreated(newCheckpointCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("CheckpointCreated created and stored", () => {
    assert.entityCount("CheckpointCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CheckpointCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "staker",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CheckpointCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "day",
      "123"
    )
    assert.fieldEquals(
      "CheckpointCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "balance",
      "234"
    )
    assert.fieldEquals(
      "CheckpointCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "stakesCount",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
