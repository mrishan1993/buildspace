pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import { Base64 } from "./libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;
    string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string[] firstWords = ["Blue", "Red", "Green", "White", "Black", "Purple"];

    string[] secondWords = ["Blood", "Sweat", "Potty", "Piss", "Puss", "Spit"];

    string[] thirdWords = ["Jack", "Queen", "King"];
    event NewEpicNFTMinted(address sender, uint256 tokenId);
    constructor () ERC721 ("EpicNFT", "EPIC") {
        console.log("This is my NFT contract");
    }
    function pickRandomFirstWord (uint256 tokenID) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("Blue", Strings.toString(tokenID))));
        rand = rand % firstWords.length;
        return firstWords[rand];
    }
    function pickRandomSecondWord (uint256 tokenID) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("Blood", Strings.toString(tokenID))));
        rand = rand % secondWords.length;
        return secondWords[rand];
    }
    function pickRandomThirdWord (uint256 tokenID) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("Blue", Strings.toString(tokenID))));
        rand = rand % thirdWords.length;
        return thirdWords[rand];
    }
    function random (string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
    function makeAnEpicNFT () public {
        uint256 newItemID = _tokenIDs.current();
        console.log("1");
        string memory first = pickRandomFirstWord(newItemID);
        string memory second = pickRandomSecondWord(newItemID);
        string memory third = pickRandomThirdWord(newItemID);
        string memory combinedWord = string(abi.encodePacked(first, second, third));
        console.log("2");
        string memory finalSvg = string(abi.encodePacked(baseSvg, first, second, third, "</text></svg>"));
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        // We set the title of our NFT as the generated word.
                        combinedWord,
                        '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );
        string memory finalTokenURI = string(abi.encodePacked("data:application/json;base64,",json));
        console.log("\n--------------------");
        console.log(finalSvg);
        console.log("--------------------\n");
        _safeMint(msg.sender, newItemID);
        _setTokenURI(newItemID, finalTokenURI);
        _tokenIDs.increment();
        emit NewEpicNFTMinted(msg.sender, newItemId);
    }
}

