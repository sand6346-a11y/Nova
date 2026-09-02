const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NovaToken", function () {
  it("mints the entire fixed supply to the deployer and has no admin functions", async function () {
    const [deployer, other] = await ethers.getSigners();

    const NovaToken = await ethers.getContractFactory("NovaToken");
    const nova = await NovaToken.deploy();
    await nova.waitForDeployment();

    expect(await nova.name()).to.equal("Nova");
    expect(await nova.symbol()).to.equal("NOVA");
    expect(await nova.decimals()).to.equal(18);

    const expectedSupply = ethers.parseUnits("1000000", 18);
    expect(await nova.totalSupply()).to.equal(expectedSupply);
    expect(await nova.balanceOf(deployer.address)).to.equal(expectedSupply);

    // Ordinary transfer works like any ERC-20.
    const sendAmount = ethers.parseUnits("100", 18);
    await nova.transfer(other.address, sendAmount);
    expect(await nova.balanceOf(other.address)).to.equal(sendAmount);
    expect(await nova.balanceOf(deployer.address)).to.equal(
      expectedSupply - sendAmount
    );

    // No mint/owner functions exist on the contract at all.
    expect(nova.mint).to.equal(undefined);
    expect(nova.owner).to.equal(undefined);
  });
});
