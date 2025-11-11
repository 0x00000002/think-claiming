```
{
  walletAggregates(
    where: { id: "0xd5ce1dd361b644bfdaaa3c0ce570eeb0635028ee"}
  ) {
    id
    totalStaked
    lastUpdated
  }
}

```

```
{
  rewardClaimeds(
    where: { user: "0xd5ce1dd361b644bfdaaa3c0ce570eeb0635028ee" }
    first: 20
    orderBy: blockNumber
    orderDirection: desc
  ) {
    id
    user
    stakeId
    poolId
    strategyId
    rewardAmount
    claimDay
    blockNumber
    transactionHash
  }
}
```

```
{
  pool(id: "6") {
    id
    startDay
    endDay
    totalPoolWeight
  }
}
```
