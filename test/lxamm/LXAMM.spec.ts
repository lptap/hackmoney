import {ethers} from "hardhat";
import {Signer, Contract, utils} from "ethers";
import web3 from "web3";
import {expect} from "chai";

describe("LXAMM", () => {
  let accounts: Signer[];
  let singerAddress: string;
  let lxAMMInstance: Contract;
  let stableCoinInstance: Contract;
  let WBTC: string;
  let uniswapInstance: Contract;
  let oracleInstance: Contract;
  let wbtcInstance: Contract;
  let lXLinkOracle: Contract;

  const {toWei} = web3.utils;
  const MAX = web3.utils.toTwosComplement(-1);
  const lpTokenABI = ["function balanceOf(address account) public view returns (uint256)"];
  const ORACLE_USD_TYPE = 0;
  const ORACLE_ETH_TYPE = 1;
  const ZERO_ADDR = "0x0000000000000000000000000000000000000000";
  const ADMIN_ROLE = utils.keccak256(utils.toUtf8Bytes("ADMIN"));

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    singerAddress = await accounts[0].getAddress();

    const stableCoin = await ethers.getContractFactory("LXStableToken");
    stableCoinInstance = await stableCoin.deploy();

    const tToken = await ethers.getContractFactory("MockERC20");
    wbtcInstance = await tToken.deploy("WBTC", "WBTC");
    WBTC = wbtcInstance.address;

    const MockUniswap = await ethers.getContractFactory("MockUniswap");
    uniswapInstance = await MockUniswap.deploy();
    await uniswapInstance.setPair(WBTC, stableCoinInstance.address, WBTC);

    const oracle = await ethers.getContractFactory("MockLXLinkOracle");
    oracleInstance = await oracle.deploy();

    const LinkOracle = await ethers.getContractFactory("LXLinkOracle");
    lXLinkOracle = await LinkOracle.deploy();

    const LXAMM = await ethers.getContractFactory("LXAMM");
    lxAMMInstance = await LXAMM.deploy(stableCoinInstance.address, lXLinkOracle.address, uniswapInstance.address);

    await lXLinkOracle.setOracleAddress(WBTC, oracleInstance.address, ORACLE_USD_TYPE);
    await lXLinkOracle.setOracleAddress(
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      oracleInstance.address,
      ORACLE_USD_TYPE
    );

    await wbtcInstance.mint(singerAddress, toWei("500"));
    await wbtcInstance.approve(lxAMMInstance.address, MAX);

    await stableCoinInstance.grantRole(ADMIN_ROLE, lxAMMInstance.address);
  });

  it("get deposit token dose not exists", async () => {
    let ok = false;
    const notExistsAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    try {
      await lxAMMInstance.getDepositedTokenAddress(notExistsAddress);
    } catch {
      ok = true;
    }

    expect(ok).to.equal(true);
  })

  it("deposit USD oracle", async () => {
    await lxAMMInstance.deposit(WBTC, toWei("10"), 2);

    const stableCoinValue = await stableCoinInstance.totalSupply();
    expect(stableCoinValue).to.equal(toWei("10"));

    const wBTCValue = await wbtcInstance.balanceOf(lxAMMInstance.address);
    expect(wBTCValue).to.equal(toWei("10"));

    const lpTokenAddress = await lxAMMInstance.getDepositedTokenAddress(WBTC);

    const lpContract = new Contract(lpTokenAddress, lpTokenABI, accounts[0]);
    const lpTokenValue = await lpContract.balanceOf(singerAddress);

    expect(lpTokenValue).to.equal(toWei("10"));
  });

  it("withdraw USD oracle", async () => {
    await lxAMMInstance.deposit(WBTC, toWei("100"), 2);
    await lxAMMInstance.withdraw(WBTC, toWei("50"), 2);

    const stableCoinValue = await stableCoinInstance.totalSupply();
    expect(stableCoinValue).to.equal(toWei("80"));

    const wBTCValue = await wbtcInstance.balanceOf(lxAMMInstance.address);
    expect(wBTCValue).to.equal(toWei("92"));

    const lpTokenAddress = await lxAMMInstance.getDepositedTokenAddress(WBTC);

    const lpContract = new Contract(lpTokenAddress, lpTokenABI, accounts[0]);
    const lpTokenValue = await lpContract.balanceOf(singerAddress);

    expect(lpTokenValue).to.equal(toWei("80"));
  });

  it("withdraw USD oracle mktPrice < amountUSD", async () => {
    await lxAMMInstance.deposit(WBTC, toWei("100"), 2);
    await lxAMMInstance.withdraw(WBTC, toWei("5"), 2);

    const stableCoinValue = await stableCoinInstance.totalSupply();
    expect(stableCoinValue).to.equal(toWei("95"));

    const wBTCValue = await wbtcInstance.balanceOf(lxAMMInstance.address);
    expect(wBTCValue).to.equal(toWei("80"));

    const lpTokenAddress = await lxAMMInstance.getDepositedTokenAddress(WBTC);

    const lpContract = new Contract(lpTokenAddress, lpTokenABI, accounts[0]);
    const lpTokenValue = await lpContract.balanceOf(singerAddress);

    expect(lpTokenValue).to.equal(toWei("80"));
  });

  it("deposit ETH oracle", async () => {
    await lXLinkOracle.setOracleAddress(WBTC, ZERO_ADDR, ORACLE_USD_TYPE);
    await lXLinkOracle.setOracleAddress(WBTC, oracleInstance.address, ORACLE_ETH_TYPE);

    await lxAMMInstance.deposit(WBTC, toWei("100"), 2);

    const stableCoinValue = await stableCoinInstance.totalSupply();
    expect(stableCoinValue).to.equal(toWei("100"));

    const wBTCValue = await wbtcInstance.balanceOf(lxAMMInstance.address);
    expect(wBTCValue).to.equal(toWei("100"));

    const lpTokenAddress = await lxAMMInstance.getDepositedTokenAddress(WBTC);

    const lpContract = new Contract(lpTokenAddress, lpTokenABI, accounts[0]);
    const lpTokenValue = await lpContract.balanceOf(singerAddress);

    expect(lpTokenValue).to.equal(toWei("100"));
  });

  it("withdraw ETH oracle", async () => {
    await lXLinkOracle.setOracleAddress(WBTC, ZERO_ADDR, ORACLE_USD_TYPE);
    await lXLinkOracle.setOracleAddress(WBTC, oracleInstance.address, ORACLE_ETH_TYPE);

    await lxAMMInstance.deposit(WBTC, toWei("100"), 2);
    await lxAMMInstance.withdraw(WBTC, toWei("20"), 2);

    const stableCoinValue = await stableCoinInstance.totalSupply();
    expect(stableCoinValue).to.equal(toWei("80"));

    const wBTCValue = await wbtcInstance.balanceOf(lxAMMInstance.address);
    expect(wBTCValue).to.equal(toWei("80"));

    const lpTokenAddress = await lxAMMInstance.getDepositedTokenAddress(WBTC);

    const lpContract = new Contract(lpTokenAddress, lpTokenABI, accounts[0]);
    const lpTokenValue = await lpContract.balanceOf(singerAddress);

    expect(lpTokenValue).to.equal(toWei("80"));
  });
});
