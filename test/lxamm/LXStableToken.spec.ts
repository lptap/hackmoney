import {ethers} from "hardhat";
import {constants, Contract, utils} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";

describe("LXStableToken", () => {
  let deployer: SignerWithAddress;
  let other: SignerWithAddress;
  let lxStableTokenInstance: Contract;
  const ADMIN_ROLE = utils.keccak256(utils.toUtf8Bytes("ADMIN"));

  beforeEach(async () => {
    [deployer, other] = await ethers.getSigners();
    const LXStableToken = await ethers.getContractFactory("LXStableToken");
    lxStableTokenInstance = await LXStableToken.deploy();
  });

  it("correct name and symbol", async () => {
    expect(await lxStableTokenInstance.name()).to.equal("Layer Exchange USD");
    expect(await lxStableTokenInstance.symbol()).to.equal("lxUSD");
  });

  it("admin can mint", async () => {
    await lxStableTokenInstance.connect(deployer).mint(deployer.address, constants.MaxUint256);
    const balance = await lxStableTokenInstance.balanceOf(deployer.address);
    expect(balance).to.equal(constants.MaxUint256);
  });

  it("others cannot mint", async () => {
    await expect(lxStableTokenInstance.connect(other).mint(other.address, constants.MaxUint256)).to.be.revertedWith(
      `AccessControl: account ${other.address.toLowerCase()} is missing role ${ADMIN_ROLE}`
    );
  });

  it("admin can burn", async () => {
    await lxStableTokenInstance.connect(deployer).mint(deployer.address, constants.MaxUint256);
    await lxStableTokenInstance.connect(deployer).burn(deployer.address, constants.MaxUint256);
    const balance = await lxStableTokenInstance.balanceOf(deployer.address);
    expect(balance).to.equal(0);
  });

  it("others cannot burn", async () => {
    await lxStableTokenInstance.connect(deployer).mint(other.address, constants.MaxUint256);
    await expect(lxStableTokenInstance.connect(other).burn(other.address, constants.MaxUint256)).to.be.revertedWith(
      `AccessControl: account ${other.address.toLowerCase()} is missing role ${ADMIN_ROLE}`
    );
  });
});
