# Nova (NOVA)

A fixed-supply ERC-20 token on Base.

- **Name:** Nova
- **Symbol:** NOVA
- **Decimals:** 18 (ERC-20 standard)
- **Total supply:** 1,000,000 NOVA, minted entirely to your wallet the moment the contract is deployed
- **Admin functions:** none. No owner, no mint function, no pause function. Once deployed, nobody — including you — can change the contract's behavior or create more tokens.

This has already been compiled and locally tested in this project (`npx hardhat test` passes: correct name/symbol/decimals, correct total supply, correct minting, and a normal transfer). What's left is deploying it with your own wallet, which only you can do — nobody else should ever have your private key, including Claude.

## 1. Prerequisites

- [Node.js](https://nodejs.org) installed (v18+)
- A wallet you control (e.g. MetaMask) with its private key available to you
- Some Base ETH for gas (real ETH for mainnet, free test ETH for the testnet step)

## 2. Install

```bash
cd nova-token
npm install
```

## 3. Configure your wallet (locally, never shared)

```bash
cp .env.example .env
```

Open `.env` and paste in your wallet's private key (in MetaMask: **Account details → Show private key**). This file stays on your machine — never send it to anyone, paste it in a chat, or commit it to git (it's already in `.gitignore`).

## 4. Deploy to Base Sepolia (testnet) first

This costs nothing and lets you confirm everything works before risking real money.

1. Get free Base Sepolia ETH from a faucet, e.g. https://www.alchemy.com/faucets/base-sepolia (paste in your wallet address).
2. Deploy:
   ```bash
   npm run deploy:sepolia
   ```
3. The script prints your contract address. Add the token to MetaMask (Import tokens → paste the contract address) to see your 1,000,000 NOVA balance.
4. Optional — verify the source code on Basescan so anyone can read the contract:
   ```bash
   npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS>
   ```
   (Needs a free API key from https://basescan.org/myapikey in your `.env`.)

## 5. Deploy to Base mainnet

Once you're happy with the testnet run:

1. Make sure your wallet has real Base ETH (bridge from Ethereum, or buy directly on Base via Coinbase).
2. Deploy:
   ```bash
   npm run deploy:mainnet
   ```
3. Verify on Basescan the same way:
   ```bash
   npx hardhat verify --network base <CONTRACT_ADDRESS>
   ```

Your contract address is now permanent and public. Anyone can look it up on https://basescan.org, see the fixed supply, and see that there's no admin function that could ever change it — that transparency is what makes a fixed-supply, no-admin-key token trustworthy to others.

## Alternative: deploy without touching a private key in any file

If you'd rather not put your private key in a `.env` file at all, you can deploy the same contract through [Remix](https://remix.ethereum.org) connected to MetaMask instead:

1. Open remix.ethereum.org, create a new file, paste in `contracts/NovaToken.sol`.
2. In the Solidity Compiler tab, compile with version 0.8.24 (Remix downloads its own compiler in your browser).
3. In the Deploy & Run tab, set environment to "Injected Provider - MetaMask", pick Base Sepolia (or Base mainnet) in MetaMask, and click Deploy. MetaMask will pop up to sign — your key never leaves your wallet.

## A note on rules, not advice

Launching a token that other people can acquire may fall under securities or financial regulations depending on your jurisdiction and especially on how you market it (e.g. promising profits, running a public sale). This isn't legal advice, and none of this is a substitute for checking your local rules if you plan to distribute NOVA beyond a small circle of friends. Consider talking to a lawyer before any public sale or promotion.
