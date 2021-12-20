const hre = require("hardhat");

const main = async () => {
  const MyEpicNFT = await hre.ethers.getContractFactory("MyEpicNFT");
  const nftContract = await MyEpicNFT.deploy();
  await nftContract.deployed();
  console.log("NFT contract deployed to:", nftContract.address);

  let tx = await nftContract.makeAnEpicNFT();
  await tx.wait();
  console.log("Mint #1");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
