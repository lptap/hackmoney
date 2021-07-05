import {ethers} from "hardhat";
import {utils} from "ethers";
import {expect} from "chai";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

describe("LXLinkOracle", () => {
  let deployer: SignerWithAddress;
  let other: SignerWithAddress;
  let lXLinkOracle: any;
  let mockOracle: any;

  const ORACLE_USD_TYPE = 0;
  const ORACLE_ETH_TYPE = 1;
  const ORACLE_INVALID_TYPE = 2;
  const ZERO_ADDR = "0x0000000000000000000000000000000000000000";
  const ADMIN_ROLE = utils.keccak256(utils.toUtf8Bytes("ADMIN"));

  beforeEach(async () => {
    [deployer, other] = await ethers.getSigners();
    const LXAMM = await ethers.getContractFactory("LXLinkOracle");
    lXLinkOracle = await LXAMM.deploy();

    const MockOracle = await ethers.getContractFactory("MockLXLinkOracle");
    mockOracle = await MockOracle.deploy();
  });

  it("revert set oracle address", async () => {
    let ok = false;
    try {
      await lXLinkOracle.setOracleAddress(
        "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        mockOracle.address,
        ORACLE_INVALID_TYPE
      );
    } catch (e) {
      ok = true;
    }
    expect(ok).to.equal(true);
  });

  it("set oracle address USD", async () => {
    await lXLinkOracle.setOracleAddress(
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      mockOracle.address,
      ORACLE_USD_TYPE
    );
    const res = await lXLinkOracle.tokensUSD("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599");

    expect(res).to.equal(mockOracle.address);
  });

  it("set oracle address ETH", async () => {
    await lXLinkOracle.setOracleAddress(
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      mockOracle.address,
      ORACLE_ETH_TYPE
    );
    const res = await lXLinkOracle.tokensETH("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599");

    expect(res).to.equal(mockOracle.address);
  });

  it("remove oracle address USD", async () => {
    await lXLinkOracle.setOracleAddress(
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      mockOracle.address,
      ORACLE_USD_TYPE
    );
    const res = await lXLinkOracle.tokensUSD("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599");

    expect(res).to.equal(mockOracle.address);

    await lXLinkOracle.setOracleAddress("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", ZERO_ADDR, ORACLE_USD_TYPE);
    const orcAddr = await lXLinkOracle.tokensUSD("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599");
    expect(orcAddr).to.equal(ZERO_ADDR);
  });

  it("remove oracle address ETH", async () => {
    await lXLinkOracle.setOracleAddress(
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      mockOracle.address,
      ORACLE_ETH_TYPE
    );
    const res = await lXLinkOracle.tokensETH("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599");

    expect(res).to.equal(mockOracle.address);

    await lXLinkOracle.setOracleAddress("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", ZERO_ADDR, ORACLE_ETH_TYPE);
    const orcAddr = await lXLinkOracle.tokensETH("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599");
    expect(orcAddr).to.equal(ZERO_ADDR);
  });

  it("get price", async () => {
    await lXLinkOracle.setOracleAddress(
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      mockOracle.address,
      ORACLE_USD_TYPE
    );
    const price = await lXLinkOracle.getPriceUSD("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599");
    expect(price).to.equal("1");
  });

  it("get price if token not exists", async () => {
    const notExistsAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    await lXLinkOracle.setOracleAddress(
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      mockOracle.address,
      ORACLE_USD_TYPE
    );
    const price = await lXLinkOracle.getPriceUSD(notExistsAddress);
    expect(price).to.equal("0");
  });

  it("other cannot set oracle", async () => {
    await expect(
      lXLinkOracle
        .connect(other)
        .setOracleAddress("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", mockOracle.address, ORACLE_USD_TYPE)
    ).to.be.revertedWith(`AccessControl: account ${other.address.toLowerCase()} is missing role ${ADMIN_ROLE}`);
  });
});
