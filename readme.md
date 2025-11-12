# THINK Staking Subgraph

The Graph subgraph for indexing THINK staking protocol events on Ethereum mainnet.

## Overview

This subgraph indexes:

- **Staking events** (Staked/Unstaked)
- **Pool management** (Pool creation, announcements, weights)
- **Reward claims**
- **NFT transfers** (THINK Agent Bundle)

## Contracts Indexed

| Contract                   | Address                                      | Start Block |
| -------------------------- | -------------------------------------------- | ----------- |
| StakingStorage             | `0xFaa8A501cf7Ffd8080B0864F2C959E8cbcf83030` | 22975181    |
| RewardManagerV1_1          | `0xA865F7aA0c487e7A16b8192ABB7276D9D1bBd693` | 23686623    |
| PoolManager                | `0xC7e162f85a4470046B22d059dc6a85A40f039AD1` | 23194149    |
| ERC721MInitializableV1_0_1 | `0x11B3EfbF04F0bA505F380aC20444B6952970AdA6` | 22321767    |

## Entities

### Staking

- `Staked` - Individual stake events
- `Unstaked` - Individual unstake events
- `WalletAggregate` - Aggregated total staked per wallet

### Pools

- `Pool` - Pool configuration and weights
- `PoolUpserted` - Pool update events
- `AnnouncePool` - Pool announcement events
- `StrategyAddedToLayer` / `StrategyRemovedFromLayer` - Strategy management

### Rewards

- `RewardClaimed` - Reward claim events

### NFTs

- `Transfer` - NFT transfer events
- `NFTBalance` - Current NFT balance per wallet

## Setup

### Prerequisites

`npm install -g @graphprotocol/graph-cli`

### Installation

`npm install`

### Development

#### Generate types

`graph codegen`

#### Build

`graph build`

#### Deploy to Studio

`graph deploy think --version-label v0.1.x`

## GraphQL Queries

### Get active stakers

```graphql
{
  walletAggregates(where: { totalStaked_gt: "0" }, first: 100) {
    id
    totalStaked
    lastUpdated
  }
}
```

### Get pool info

```graphql
{
  pool(id: "5") {
    startDay
    endDay
    totalPoolWeight
    hasAnnounced
  }
}
```

### Get user stakes

```graphql
{
  stakeds(where: { staker: "0x..." }, first: 100) {
    stakeId
    amount
    stakeDay
    daysLock
  }
}
```

### Get NFT balances

```graphql
{
  nftbalances(orderBy: count, orderDirection: desc, first: 100) {
    id
    count
    lastUpdated
  }
}
```

## Endpoints

### Studio (Development)

- https://api.studio.thegraph.com/query/87795/think/version/latest

### Playground

- https://thegraph.com/studio/subgraph/think/

## Key Logic

### Pool Weight Calculation

Pool weight is calculated as:livePoolWeight = Σ(amount × effectiveDays)

Where:

- `effectiveStart = max(stakeDay, poolStartDay)`
- `effectiveEnd = min(unstakeDay || poolEndDay, poolEndDay)`
- `effectiveDays = effectiveEnd - effectiveStart`

### NFT Balance Tracking

NFT balances are updated on every `Transfer` event:

- Increment receiver balance
- Decrement sender balance
- Zero address (mint/burn) is ignored

## Files Structure

```
├── abis/ # Contract ABIs
│ ├── StakingStorage.json
│ ├── RewardManagerV1_1.json
│ ├── PoolManager.json
│ └── ERC721MInitializableV1_0_1.json
├── src/ # Mapping handlers
│ ├── staking-storage.ts
│ ├── reward-manager.ts
│ ├── pool-manager.ts
│ └── erc-721-m-initializable-v-1-0-1.ts
├── schema.graphql # GraphQL schema
├── subgraph.yaml # Subgraph manifest
└── package.json
```

## Troubleshooting

### Reindexing

If you need to force reindex, deploy a new version with updated `startBlock`.

### Query Performance

- Use `first` parameter to limit results
- Use `skip` for pagination
- Filter with `where` clauses

### Common Issues

**"Type Query has no field"**

- Run `graph codegen` to regenerate types
- Ensure entity is listed in `subgraph.yaml` under `entities`

**Slow indexing**

- Check block range (fewer blocks = faster)
- Verify contract addresses are correct
- Check Studio dashboard for errors

## Contributing

1. Create feature branch
2. Update schema if needed
3. Run `graph codegen && graph build`
4. Test queries in playground
5. Deploy with new version label

## Resources

- [The Graph Docs](https://thegraph.com/docs/)
- [AssemblyScript Book](https://www.assemblyscript.org/)
- [Studio Dashboard](https://thegraph.com/studio/)2.
