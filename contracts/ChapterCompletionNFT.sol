// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ChapterCompletionNFT is ERC721 {
    uint256 public tokenCounter;
    mapping(uint256 => string) private _tokenURIs; // Mapping for chapter-based token URIs

    constructor() ERC721("ChapterCompletionNFT", "CCN") {
        tokenCounter = 0;

        // Predefine chapter-based token URIs
        _tokenURIs[1] = "ipfs://QmQwZ4r1gCPM8avazcEvNDiWh329YRoBS3LRwDuiDLx7qX";
        _tokenURIs[2] = "ipfs://QmYs1RFrDPXLLHfjHuTvx8MQa6Su5dqpJjHxZUuCpTYfPP";
        _tokenURIs[3] = "ipfs://Qmb7vtcAdBTvuWEzXoYyEe6Ebsr6CD15CaxNgiU2cCa4tJ";
        _tokenURIs[4] = "ipfs://QmVAEsewMn3UiA1xXgr9EFHcFzYqsUeY7LtQmhNLZhEq12";
        _tokenURIs[5] = "ipfs://QmWSXocp3S5bSKcDiccyBoWRqeqLfpgVhWfMJDSmSZnGVF";
        _tokenURIs[6] = "ipfs://QmQneqe3mugwDbKEnstxuUiAXdRPSAjwX84jNssg2mDwCD";
        _tokenURIs[7] = "ipfs://Qmep2nCV4kLzULxZZWoSJP8YYoDNiSBLu36qB8hm78V6Yn";
        _tokenURIs[8] = "ipfs://QmaXTdVZNCtw8b4MrtQd5LFTF2Ahi2vacAohCtcKRqG31A";
        _tokenURIs[9] = "ipfs://QmYSMgxCLfhYhAD1UsZyekatT9UJoPowidUrDEBTvuGRxz";
    }

    // Function to mint NFT upon chapter completion
    function completeChapter(uint256 chapter) public {
        require(chapter >= 1 && chapter <= 9, "Invalid chapter number");

        uint256 newItemId = tokenCounter;

        // Mint the NFT to msg.sender
        _safeMint(msg.sender, newItemId);

        // Dynamically assign the token URI based on chapter
        _setTokenURI(newItemId, _tokenURIs[chapter]);

        tokenCounter++;
    }

    // Override tokenURI function to support dynamic URIs
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    // Internal function to set the token URI
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }
}
