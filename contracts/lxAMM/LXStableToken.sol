// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev Contract for the lxUSD synthetic stablecoin.
 *
 * This token holds the USD market value value of a provided asset.
 * Governance has control over this token.
 **/
contract LXStableToken is AccessControl, ERC20("Layer Exchange USD", "lxUSD") {
    bytes32 public constant ADMIN = keccak256("ADMIN");

    constructor() {
        _setRoleAdmin(ADMIN, ADMIN);
        _setupRole(ADMIN, msg.sender);
    }

    /**
     * @dev Mints tokens to an account.
     *
     * @param account the account to mint tokens to.
     * @param amount  the amount of tokens to mint.
     **/
    function mint(address account, uint256 amount) external onlyRole(ADMIN) {
        _mint(account, amount);
    }

    /**
     * @dev Burns tokens from an account.
     *
     * @param account the account to burn tokens from.
     * @param amount  the amount of tokens to burn.
     **/
    function burn(address account, uint256 amount) external onlyRole(ADMIN) {
        _burn(account, amount);
    }
}
