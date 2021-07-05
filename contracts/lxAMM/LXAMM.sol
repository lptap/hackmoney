// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

import "./LXLinkOracle.sol";
import "./LXLpToken.sol";
import "./LXStableToken.sol";

import "../interfaces/IERC20Detailed.sol";
/**
 * @dev Contract for the LXAMM (Automated Market Maker).
 *
 * This AMM creates decentralized trading pools on different DEXs.
 * Liquidity is provided with one token only.
 * Tokens can be deposited and withdrawn from this contract.
 * Governance has control over this token.
 *
 * More details about this AMM contact can be found in the README file.
 **/
contract LXAMM is AccessControl {
    bytes32 public constant ADMIN = keccak256("ADMIN");

    enum Dex {
        PANCAKESWAP,
        SUSHISWAP,
        UNISWAP
    }
    mapping(address => address) private _depositedTokens;

    address public immutable lxUSD;
    address public immutable oracle;
    address public immutable uniswap;

    constructor(
        address _lxUSD,
        address _oracle,
        address _uniswap
    ) {
        _setupRole(ADMIN, msg.sender);

        lxUSD = _lxUSD;
        oracle = _oracle;
        uniswap = _uniswap;
    }

    function getDepositedTokenAddress(address _token) external view returns (address) {
        require(_depositedTokens[_token] != address(0), "LXAMM: Address does not exist");
        return _depositedTokens[_token];
    }

    function deposit(
        address token,
        uint256 amount,
        Dex dex
    ) external {
        // calculate market price
        uint256 mktPrice = LXLinkOracle(oracle).getPriceUSD(token) * amount;
        // mint lxUSD synthetic stablecoin
        LXStableToken(lxUSD).mint(address(this), mktPrice);

        // acquire token from sender
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // deposit into DEX of choice
        uint256 liquidity = 0;
        if (dex == Dex.PANCAKESWAP) {}

        if (dex == Dex.SUSHISWAP) {}

        if (dex == Dex.UNISWAP) {
            liquidity = _uniswapDeposit(lxUSD, mktPrice, token, amount);
        }

        // mint lxLP token
        address lxLP = _depositedTokens[token];
        if (lxLP == address(0)) {
            lxLP = address(new LXLpToken(IERC20Detailed(token).name(), IERC20Detailed(token).symbol()));
            _depositedTokens[token] = lxLP;
        }
        LXLpToken(lxLP).mint(msg.sender, amount);
    }

    function withdraw(
        address token,
        uint256 amount,
        Dex dex
    ) external {
        // remove liquidity
        uint256 amountToken = 0;
        uint256 amountUSD = 0;
        if (dex == Dex.PANCAKESWAP) {}

        if (dex == Dex.SUSHISWAP) {}

        if (dex == Dex.UNISWAP) {
            (amountToken, amountUSD) = _uniswapWithdraw(token, lxUSD, amount);
        }
        // burn lxLP token
        LXLpToken(_depositedTokens[token]).burn(msg.sender, amountToken);

        // calculate market price
        uint256 mktPrice = LXLinkOracle(oracle).getPriceUSD(token) * amount;
        require(mktPrice > 0, "LxUniswap: market price cannot be zero.");
        if (mktPrice > amountUSD) {
            amountToken = (amountToken * amountUSD) / mktPrice;
            mktPrice = amountUSD;
        }

        // burn lxUSD
        LXStableToken(lxUSD).burn(address(this), mktPrice);

        // transfer token to sender
        IERC20(token).transfer(msg.sender, amountToken);

        // if impermanent loss, compenste with lxUSD
        if (mktPrice < amountUSD) {
            LXStableToken(lxUSD).transfer(msg.sender, amountUSD - mktPrice);
        }
    }

    function _uniswapDeposit(
        address token,
        uint256 amountToken,
        address stableToken,
        uint256 amountUSD
    ) internal returns (uint256) {
        // add liquidity to ERC20 <-> lxUSD pair pool
        IERC20(stableToken).approve(uniswap, amountUSD);
        IERC20(token).approve(uniswap, amountToken);
        (, , uint256 liquidity) = IUniswapV2Router02(uniswap).addLiquidity(
            token, // tokenA
            stableToken, // tokenB
            amountToken, // amountADesired
            amountUSD, // amountBDesired
            amountToken, // amountAMin
            amountUSD, // amountBMin
            address(this), // to
            block.timestamp + 1800 // deadline (30 mins)
        );

        return liquidity;
    }

    function _uniswapWithdraw(
        address token,
        address stableToken,
        uint256 liquidity
    ) internal returns (uint256, uint256) {
        // get address of the pair ERC20 <-> lxUSD
        address pair = IUniswapV2Factory(uniswap).getPair(token, stableToken);
        // remove liquidity from ERC20 <-> lxUSD pool
        IERC20(pair).approve(uniswap, liquidity);
        (uint256 amountToken, uint256 amountUSD) = IUniswapV2Router02(uniswap).removeLiquidity(
            token,
            stableToken,
            liquidity, // liquidity
            0, //amountAMin
            0, // amountBMin
            address(this), // to
            block.timestamp + 1800 // deadline (30 mins)
        );

        return (amountToken, amountUSD);
    }
}
