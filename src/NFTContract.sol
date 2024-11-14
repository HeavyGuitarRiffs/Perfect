// contracts/NFTContract.sol
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTContract is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public admin;

    constructor() ERC721("NFT", "NFT") {
        admin = msg.sender;
    }

    // Event to log minted NFTs
    event Mint(address indexed to, uint256 indexed tokenId, string tokenURI);

    // Mint function to create new NFTs
    function mint(address to, string memory tokenURI) external onlyOwner {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit Mint(to, newItemId, tokenURI);
    }

    // Override base URI to return a default IPFS gateway
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/";
    }
}

