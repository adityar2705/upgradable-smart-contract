const { ethers, upgrades } = require("hardhat");

const PROXY_ADDRESS = "0x808E7A8Aa71cBB0bf5e8E0847Db5cE63fB37EbEA";

//main function to upgrade our vending machine proxy
async function main(){
    const VendingMachineV2 = await ethers.getContractFactory("VendingMachineV2");

    //change the implementation logic to V2
    const upgraded = await upgrades.upgradeProxy(PROXY_ADDRESS, VendingMachineV2);

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS);

    console.log("The current contract owner is: " + upgraded.owner());
    console.log('Implementation contract address: ' + implementationAddress);
}

main();