import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyEpicNFT from "./utils/MyEpicNFT.json";
import "./styles/App.css";

// Constants
const OPENSEA_LINK = "https://testnets.opensea.io/assets/";
const TOTAL_MINT_COUNT = 50;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  // Checks if the user is connected to the site
  const checkIfWalletIsConnected = async () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found and authorized account: ", account);
      setCurrentAccount(account);
      setupEventListner();
    } else console.log("Did not found authorized account");
  };

  // connects the users metamask account of choice
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(`${accounts[0]} connected!`);
      setCurrentAccount(accounts[0]);
      setupEventListner();
    } catch (error) {
      console.log(error);
    }
  };

  // the button to connect the wallet
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet}>Connect to Wallet</button>
  );

  // the button to connect the wallet
  const renderConnectedContainer = () => (
    <button onClick={askContractToMintNft}>Mine an NFT</button>
  );

  const askContractToMintNft = async () => {
    const contractAddress = "0x615b6bAcbe28fC8488085fE35DD661284a6D00D3";
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          MyEpicNFT.abi,
          signer
        );

        let mineNFT = await connectedContract.makeAnEpicNFT();
        console.log("Mining your NFT...");
        await mineNFT.wait();

        console.log(
          `NFT mined! se in etherscan: https://rinkeby.etherscan.io/tx/${mineNFT.hash}`
        );
      } else {
        console.log("Did not find the ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setupEventListner = async () => {
    const contractAddress = "0x615b6bAcbe28fC8488085fE35DD661284a6D00D3";

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          MyEpicNFT.abi,
          signer
        );

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(`${from} sender and token ID: ${tokenId}`);

          alert(
            `Your NFT is available in ${OPENSEA_LINK}${contractAddress}/${tokenId}/`
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount
            ? renderConnectedContainer()
            : renderNotConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default App;
