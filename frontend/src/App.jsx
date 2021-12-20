import React from "react";
import "./styles/App.css";

// Constants
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;

const App = () => {
  // // Render Methods
  // const renderNotConnectedContainer = () => (

  // );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {/* {renderNotConnectedContainer()} */}
          <button
            className="cta-button connect-wallet-button"
            onClick={() => console.log("trouxa")}
            onDoubleClick={() => console.log("mais trouxa ainda")}
          >
            Connect to Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
