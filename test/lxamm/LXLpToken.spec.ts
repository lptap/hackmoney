import {ethers} from "hardhat";
import {constants, Contract} from "ethers";
import {expect} from "chai";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

describe("LXLpToken", () => {
  let deployer: SignerWithAddress;
  let other: SignerWithAddress;
  let lxLpTokenInstance: Contract;

  const tokenName = "MockToken";
  const tokenSymbol = "MK";

  beforeEach(async () => {
    [deployer, other] = await ethers.getSigners();
    const LXLpToken = await ethers.getContractFactory("LXLpToken");
    lxLpTokenInstance = await LXLpToken.deploy("MockToken", "MK");
  });

  it("correct name and symbol", async () => {
    expect(await lxLpTokenInstance.name()).to.equal(`lxLP ${tokenName}`);
    expect(await lxLpTokenInstance.symbol()).to.equal(`lx${tokenSymbol}`);
  });

  it("only owner can mint", async () => {
    await lxLpTokenInstance.connect(deployer).mint(deployer.address, constants.MaxUint256);
    const balance = await lxLpTokenInstance.balanceOf(deployer.address);
    expect(balance).to.equal(constants.MaxUint256);
  });

  it("others cannot mint", async () => {
    await expect(lxLpTokenInstance.connect(other).mint(other.address, constants.MaxUint256)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("only owner can burn", async () => {
    await lxLpTokenInstance.connect(deployer).mint(deployer.address, constants.MaxUint256);
    await lxLpTokenInstance.connect(deployer).burn(deployer.address, constants.MaxUint256);
    const balance = await lxLpTokenInstance.balanceOf(deployer.address);
    expect(balance).to.equal(0);
  });

  it("others cannot burn", async () => {
    await lxLpTokenInstance.connect(deployer).mint(other.address, constants.MaxUint256);
    await expect(lxLpTokenInstance.connect(other).burn(other.address, constants.MaxUint256)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });
});
