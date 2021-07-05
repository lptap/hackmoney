// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./MockERC20.sol";

contract MockPair {}

contract MockUniswap {
    mapping(address => mapping(address => address)) private _pair;

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        pure
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        )
    {
        return (0, 0, 5 * 10**18);
    }

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external pure returns (uint256 amountA, uint256 amountB) {
        return (20 * 10**18, 20 * 10**18);
    }

    /**
     * @dev set pair address
     *
     * @param token0 token 0
     * @param token1 token 1
     * @param pairAddress the pairAddress correspond to (token0, token1)
     **/
    function setPair(
        address token0,
        address token1,
        address pairAddress
    ) public {
        _pair[token0][token1] = pairAddress;
        _pair[token1][token0] = pairAddress;
    }

    /**
     * @dev get pair address
     *
     * @param token0 token 0
     * @param token1 token 1
     **/
    function getPair(address token0, address token1) public view returns (address) {
        return _pair[token0][token1];
    }
}
