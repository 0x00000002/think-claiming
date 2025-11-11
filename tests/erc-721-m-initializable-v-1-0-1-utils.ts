import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  AuthorizedMinterAdded,
  AuthorizedMinterRemoved,
  ConsecutiveTransfer,
  ContractURIUpdated,
  DefaultRoyaltySet,
  Initialized,
  OwnershipHandoverCanceled,
  OwnershipHandoverRequested,
  OwnershipTransferred,
  SetActiveStage,
  SetBaseURI,
  SetContractURI,
  SetCosigner,
  SetDefaultRoyalty,
  SetGlobalWalletLimit,
  SetMaxMintableSupply,
  SetMintCurrency,
  SetMintable,
  SetTimestampExpirySeconds,
  SetTokenURISuffix,
  SetTransferable,
  TokenRoyaltySet,
  Transfer,
  UpdateStage,
  Withdraw,
  WithdrawERC20
} from "../generated/ERC721MInitializableV1_0_1/ERC721MInitializableV1_0_1"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createAuthorizedMinterAddedEvent(
  minter: Address
): AuthorizedMinterAdded {
  let authorizedMinterAddedEvent =
    changetype<AuthorizedMinterAdded>(newMockEvent())

  authorizedMinterAddedEvent.parameters = new Array()

  authorizedMinterAddedEvent.parameters.push(
    new ethereum.EventParam("minter", ethereum.Value.fromAddress(minter))
  )

  return authorizedMinterAddedEvent
}

export function createAuthorizedMinterRemovedEvent(
  minter: Address
): AuthorizedMinterRemoved {
  let authorizedMinterRemovedEvent =
    changetype<AuthorizedMinterRemoved>(newMockEvent())

  authorizedMinterRemovedEvent.parameters = new Array()

  authorizedMinterRemovedEvent.parameters.push(
    new ethereum.EventParam("minter", ethereum.Value.fromAddress(minter))
  )

  return authorizedMinterRemovedEvent
}

export function createConsecutiveTransferEvent(
  fromTokenId: BigInt,
  toTokenId: BigInt,
  from: Address,
  to: Address
): ConsecutiveTransfer {
  let consecutiveTransferEvent = changetype<ConsecutiveTransfer>(newMockEvent())

  consecutiveTransferEvent.parameters = new Array()

  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam(
      "fromTokenId",
      ethereum.Value.fromUnsignedBigInt(fromTokenId)
    )
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam(
      "toTokenId",
      ethereum.Value.fromUnsignedBigInt(toTokenId)
    )
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return consecutiveTransferEvent
}

export function createContractURIUpdatedEvent(): ContractURIUpdated {
  let contractUriUpdatedEvent = changetype<ContractURIUpdated>(newMockEvent())

  contractUriUpdatedEvent.parameters = new Array()

  return contractUriUpdatedEvent
}

export function createDefaultRoyaltySetEvent(
  receiver: Address,
  feeNumerator: BigInt
): DefaultRoyaltySet {
  let defaultRoyaltySetEvent = changetype<DefaultRoyaltySet>(newMockEvent())

  defaultRoyaltySetEvent.parameters = new Array()

  defaultRoyaltySetEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  defaultRoyaltySetEvent.parameters.push(
    new ethereum.EventParam(
      "feeNumerator",
      ethereum.Value.fromUnsignedBigInt(feeNumerator)
    )
  )

  return defaultRoyaltySetEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createOwnershipHandoverCanceledEvent(
  pendingOwner: Address
): OwnershipHandoverCanceled {
  let ownershipHandoverCanceledEvent =
    changetype<OwnershipHandoverCanceled>(newMockEvent())

  ownershipHandoverCanceledEvent.parameters = new Array()

  ownershipHandoverCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "pendingOwner",
      ethereum.Value.fromAddress(pendingOwner)
    )
  )

  return ownershipHandoverCanceledEvent
}

export function createOwnershipHandoverRequestedEvent(
  pendingOwner: Address
): OwnershipHandoverRequested {
  let ownershipHandoverRequestedEvent =
    changetype<OwnershipHandoverRequested>(newMockEvent())

  ownershipHandoverRequestedEvent.parameters = new Array()

  ownershipHandoverRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "pendingOwner",
      ethereum.Value.fromAddress(pendingOwner)
    )
  )

  return ownershipHandoverRequestedEvent
}

export function createOwnershipTransferredEvent(
  oldOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSetActiveStageEvent(activeStage: BigInt): SetActiveStage {
  let setActiveStageEvent = changetype<SetActiveStage>(newMockEvent())

  setActiveStageEvent.parameters = new Array()

  setActiveStageEvent.parameters.push(
    new ethereum.EventParam(
      "activeStage",
      ethereum.Value.fromUnsignedBigInt(activeStage)
    )
  )

  return setActiveStageEvent
}

export function createSetBaseURIEvent(baseURI: string): SetBaseURI {
  let setBaseUriEvent = changetype<SetBaseURI>(newMockEvent())

  setBaseUriEvent.parameters = new Array()

  setBaseUriEvent.parameters.push(
    new ethereum.EventParam("baseURI", ethereum.Value.fromString(baseURI))
  )

  return setBaseUriEvent
}

export function createSetContractURIEvent(uri: string): SetContractURI {
  let setContractUriEvent = changetype<SetContractURI>(newMockEvent())

  setContractUriEvent.parameters = new Array()

  setContractUriEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return setContractUriEvent
}

export function createSetCosignerEvent(cosigner: Address): SetCosigner {
  let setCosignerEvent = changetype<SetCosigner>(newMockEvent())

  setCosignerEvent.parameters = new Array()

  setCosignerEvent.parameters.push(
    new ethereum.EventParam("cosigner", ethereum.Value.fromAddress(cosigner))
  )

  return setCosignerEvent
}

export function createSetDefaultRoyaltyEvent(
  receiver: Address,
  feeNumerator: BigInt
): SetDefaultRoyalty {
  let setDefaultRoyaltyEvent = changetype<SetDefaultRoyalty>(newMockEvent())

  setDefaultRoyaltyEvent.parameters = new Array()

  setDefaultRoyaltyEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  setDefaultRoyaltyEvent.parameters.push(
    new ethereum.EventParam(
      "feeNumerator",
      ethereum.Value.fromUnsignedBigInt(feeNumerator)
    )
  )

  return setDefaultRoyaltyEvent
}

export function createSetGlobalWalletLimitEvent(
  globalWalletLimit: BigInt
): SetGlobalWalletLimit {
  let setGlobalWalletLimitEvent =
    changetype<SetGlobalWalletLimit>(newMockEvent())

  setGlobalWalletLimitEvent.parameters = new Array()

  setGlobalWalletLimitEvent.parameters.push(
    new ethereum.EventParam(
      "globalWalletLimit",
      ethereum.Value.fromUnsignedBigInt(globalWalletLimit)
    )
  )

  return setGlobalWalletLimitEvent
}

export function createSetMaxMintableSupplyEvent(
  maxMintableSupply: BigInt
): SetMaxMintableSupply {
  let setMaxMintableSupplyEvent =
    changetype<SetMaxMintableSupply>(newMockEvent())

  setMaxMintableSupplyEvent.parameters = new Array()

  setMaxMintableSupplyEvent.parameters.push(
    new ethereum.EventParam(
      "maxMintableSupply",
      ethereum.Value.fromUnsignedBigInt(maxMintableSupply)
    )
  )

  return setMaxMintableSupplyEvent
}

export function createSetMintCurrencyEvent(
  mintCurrency: Address
): SetMintCurrency {
  let setMintCurrencyEvent = changetype<SetMintCurrency>(newMockEvent())

  setMintCurrencyEvent.parameters = new Array()

  setMintCurrencyEvent.parameters.push(
    new ethereum.EventParam(
      "mintCurrency",
      ethereum.Value.fromAddress(mintCurrency)
    )
  )

  return setMintCurrencyEvent
}

export function createSetMintableEvent(mintable: boolean): SetMintable {
  let setMintableEvent = changetype<SetMintable>(newMockEvent())

  setMintableEvent.parameters = new Array()

  setMintableEvent.parameters.push(
    new ethereum.EventParam("mintable", ethereum.Value.fromBoolean(mintable))
  )

  return setMintableEvent
}

export function createSetTimestampExpirySecondsEvent(
  timestampExpirySeconds: BigInt
): SetTimestampExpirySeconds {
  let setTimestampExpirySecondsEvent =
    changetype<SetTimestampExpirySeconds>(newMockEvent())

  setTimestampExpirySecondsEvent.parameters = new Array()

  setTimestampExpirySecondsEvent.parameters.push(
    new ethereum.EventParam(
      "timestampExpirySeconds",
      ethereum.Value.fromUnsignedBigInt(timestampExpirySeconds)
    )
  )

  return setTimestampExpirySecondsEvent
}

export function createSetTokenURISuffixEvent(
  suffix: string
): SetTokenURISuffix {
  let setTokenUriSuffixEvent = changetype<SetTokenURISuffix>(newMockEvent())

  setTokenUriSuffixEvent.parameters = new Array()

  setTokenUriSuffixEvent.parameters.push(
    new ethereum.EventParam("suffix", ethereum.Value.fromString(suffix))
  )

  return setTokenUriSuffixEvent
}

export function createSetTransferableEvent(
  transferable: boolean
): SetTransferable {
  let setTransferableEvent = changetype<SetTransferable>(newMockEvent())

  setTransferableEvent.parameters = new Array()

  setTransferableEvent.parameters.push(
    new ethereum.EventParam(
      "transferable",
      ethereum.Value.fromBoolean(transferable)
    )
  )

  return setTransferableEvent
}

export function createTokenRoyaltySetEvent(
  tokenId: BigInt,
  receiver: Address,
  feeNumerator: BigInt
): TokenRoyaltySet {
  let tokenRoyaltySetEvent = changetype<TokenRoyaltySet>(newMockEvent())

  tokenRoyaltySetEvent.parameters = new Array()

  tokenRoyaltySetEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tokenRoyaltySetEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  tokenRoyaltySetEvent.parameters.push(
    new ethereum.EventParam(
      "feeNumerator",
      ethereum.Value.fromUnsignedBigInt(feeNumerator)
    )
  )

  return tokenRoyaltySetEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createUpdateStageEvent(
  stage: BigInt,
  price: BigInt,
  mintFee: BigInt,
  walletLimit: BigInt,
  merkleRoot: Bytes,
  maxStageSupply: i32,
  startTimeUnixSeconds: BigInt,
  endTimeUnixSeconds: BigInt
): UpdateStage {
  let updateStageEvent = changetype<UpdateStage>(newMockEvent())

  updateStageEvent.parameters = new Array()

  updateStageEvent.parameters.push(
    new ethereum.EventParam("stage", ethereum.Value.fromUnsignedBigInt(stage))
  )
  updateStageEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  updateStageEvent.parameters.push(
    new ethereum.EventParam(
      "mintFee",
      ethereum.Value.fromUnsignedBigInt(mintFee)
    )
  )
  updateStageEvent.parameters.push(
    new ethereum.EventParam(
      "walletLimit",
      ethereum.Value.fromUnsignedBigInt(walletLimit)
    )
  )
  updateStageEvent.parameters.push(
    new ethereum.EventParam(
      "merkleRoot",
      ethereum.Value.fromFixedBytes(merkleRoot)
    )
  )
  updateStageEvent.parameters.push(
    new ethereum.EventParam(
      "maxStageSupply",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(maxStageSupply))
    )
  )
  updateStageEvent.parameters.push(
    new ethereum.EventParam(
      "startTimeUnixSeconds",
      ethereum.Value.fromUnsignedBigInt(startTimeUnixSeconds)
    )
  )
  updateStageEvent.parameters.push(
    new ethereum.EventParam(
      "endTimeUnixSeconds",
      ethereum.Value.fromUnsignedBigInt(endTimeUnixSeconds)
    )
  )

  return updateStageEvent
}

export function createWithdrawEvent(value: BigInt): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return withdrawEvent
}

export function createWithdrawERC20Event(
  mintCurrency: Address,
  value: BigInt
): WithdrawERC20 {
  let withdrawErc20Event = changetype<WithdrawERC20>(newMockEvent())

  withdrawErc20Event.parameters = new Array()

  withdrawErc20Event.parameters.push(
    new ethereum.EventParam(
      "mintCurrency",
      ethereum.Value.fromAddress(mintCurrency)
    )
  )
  withdrawErc20Event.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return withdrawErc20Event
}
