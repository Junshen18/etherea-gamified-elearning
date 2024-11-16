// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract EthereaCharacter is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() ERC721("EthereaCharacter", "ETC") {
        tokenCounter = 0;
    }

    function createNFT(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _setTokenURI(newItemId, tokenURI);  // Set token URI
        _safeMint(msg.sender, newItemId);   // Mint the token
        tokenCounter = tokenCounter + 1;
        return newItemId;
    }

    // Function to update metadata (tokenURI)
    function updateMetadata(uint256 tokenId, string memory newTokenURI) public {
        // No access control - anyone can call this function
        _setTokenURI(tokenId, newTokenURI);
    }
}