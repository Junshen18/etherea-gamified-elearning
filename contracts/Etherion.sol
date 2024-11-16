// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Etherion is ERC20, ERC20Permit, Ownable {
    constructor(address initialOwner)
        ERC20("Etherion", "ETN")
        ERC20Permit("Etherion")
        Ownable(initialOwner)
    {
        // Mint the tokens to the contract's address instead of the deployer's address
        _mint(address(this), 1000000 * 10**decimals());
    }

    // Function to transfer tokens from the contract to another address
    function transferFromContract(address recipient, uint256 amount)
        external
        onlyOwner
    {
        // Ensure the contract has enough tokens
        require(
            balanceOf(address(this)) >= amount,
            "Insufficient balance in contract"
        );

        // Transfer the tokens
        _transfer(address(this), recipient, amount);
    }

    function getToken (uint256 amount) external{
        require(
            balanceOf(address(this)) >= amount,
            "Insufficient balance in contract"
        );

        // Transfer the tokens
        _transfer(address(this), msg.sender, amount);
    }
}
