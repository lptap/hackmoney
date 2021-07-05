// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma abicoder v2;

contract MockLXLinkOracle {
    function latestRoundData()
        external
        pure
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (1, 1, 1, 1, 1);
    }
}
