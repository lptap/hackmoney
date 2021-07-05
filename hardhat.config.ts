import "dotenv/config";
import "@nomiclabs/hardhat-waffle";
import {constants} from "ethers";
import "solidity-coverage";

const CHAIN_IDS = {
  hardhat: 1337,
  kovan: 42,
  rinkeby: 4,
};

const INFURA_KEY = process.env.INFURA_KEY || "";
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || constants.HashZero.slice(2);

module.exports = {
  namedAccounts: {
    deployer: 0,
    factory: {
      1: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      4: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    },
  },
  networks: {
    hardhat: {
      chainId: CHAIN_IDS.hardhat,
      allowUnlimitedContractSize: true,
    },
    kovan: {
      chainId: CHAIN_IDS.kovan,
      url: `https://kovan.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
    rinkeby: {
      chainId: CHAIN_IDS.rinkeby,
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`], // Using private key instead of mnemonic for vanity deploy
      saveDeployments: true,
    },
  },
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
