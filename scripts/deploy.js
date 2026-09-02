const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying NovaToken with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  const NovaToken = await hre.ethers.getContractFactory("NovaToken");
  const nova = await NovaToken.deploy();
  await nova.waitForDeployment();

  const address = await nova.getAddress();
  console.log("\nNovaToken deployed to:", address);

  console.log("Waiting for confirmations before reading total supply...");
  const deployTx = nova.deploymentTransaction();
  if (deployTx) {
    await deployTx.wait(3);
  }

  let totalSupply;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      totalSupply = await nova.totalSupply();
      break;
    } catch (err) {
      if (attempt === 5) throw err;
      console.log(`Retrying total supply read (attempt ${attempt})...`);
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
  }

  console.log("Total supply:", hre.ethers.formatUnits(totalSupply, 18), "NOVA");
  console.log(
    "\nNext step — verify on Basescan:\n" +
      `  npx hardhat verify --network ${hre.network.name} ${address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});