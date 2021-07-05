// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev Contract for the lxLP token.
 *
 * This token holds the liquidity exchange value of a provided asset.
 * The token owner is granted exclusive access to the tokens.
 **/
contract LXLpToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol)
        ERC20(string(abi.encodePacked("lxLP ", name)), string(abi.encodePacked("lx", symbol)))
    {}

    /**
     * @dev Mints tokens to an account.
     *
     * @param account the account to mint tokens to.
     * @param amount  the amount of tokens to mint.
     **/
    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    /**
     * @dev Burns tokens from an account.
     *
     * @param account the account to burn tokens from.
     * @param amount  the amount of tokens to burn.
     **/
    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
