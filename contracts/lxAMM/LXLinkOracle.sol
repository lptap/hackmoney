// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @dev Contract to calculate the USD market value of an asset.
 *
 * This call Chainlink (LINK) oracle to calculate the USD market value of
 * a provided asset.
 * Governance has control over this contract.
 **/
contract LXLinkOracle is AccessControl {
    bytes32 public constant ADMIN = keccak256("ADMIN");

    mapping(address => address) public tokensUSD;
    mapping(address => address) public tokensETH;
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    enum OracleType {
        ORACLE_USD_TYPE,
        ORACLE_ETH_TYPE
    }

    constructor() {
        _setRoleAdmin(ADMIN, ADMIN);
        _setupRole(ADMIN, msg.sender);

        // wBTC
        tokensUSD[0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599] = 0xF5fff180082d6017036B771bA883025c654BC935;
        // wETH
        tokensUSD[WETH] = 0xF79D6aFBb6dA890132F9D7c355e3015f15F3406F;

        // wBTC
        tokensETH[0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599] = 0x0133Aa47B6197D0BA090Bf2CD96626Eb71fFd13c;
    }

    /**
     * @dev Gets the USD market value of a given token.
     *
     * @param token the token to calculate the market value of.
     **/
    function getPriceUSD(address token) external view returns (uint256) {
        if (tokensUSD[token] != address(0)) {
            (, int256 price, , , ) = AggregatorV3Interface(tokensUSD[token]).latestRoundData();

            return uint256(price);
        } else if (tokensETH[token] != address(0)) {
            (, int256 priceInETH, , , ) = AggregatorV3Interface(tokensETH[token]).latestRoundData();
            (, int256 ETHtoUSD, , , ) = AggregatorV3Interface(tokensUSD[WETH]).latestRoundData();
            uint256 price = uint256(priceInETH * ETHtoUSD);

            return price;
        }

        return 0;
    }

    /**
     * @dev Set oracle address for token
     *
     * @param token the token want to set.
     * @param oracleAddress the oracle address for token.
     * @param oracleType type of oracle for token: ORACLE_USD_TYPE or ORACLE_ETH_TYPE.
     **/
    function setOracleAddress(
        address token,
        address oracleAddress,
        OracleType oracleType
    ) external onlyRole(ADMIN) {
        if (oracleType == OracleType.ORACLE_USD_TYPE) {
            tokensUSD[token] = oracleAddress;
        } else if (oracleType == OracleType.ORACLE_ETH_TYPE) {
            tokensETH[token] = oracleAddress;
        }
    }
}
