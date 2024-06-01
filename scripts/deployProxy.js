const { ethers, upgrades } = require("hardhat");
/*
Proxy contract address :  0x808E7A8Aa71cBB0bf5e8E0847Db5cE63fB37EbEA
Implementation contract address :  0xce2f062ebE5aA5A7A6aeA1440584E9f562F56dbC
*/

//creating the main function to deploy the proxy
async function main(){
    const VendingMachineV1 = await ethers.getContractFactory("VendingMachineV1");

    //deploy proxy with initial no. of sodas set as 100
    const proxy = await upgrades.deployProxy(VendingMachineV1,[100]);
    await proxy.waitForDeployment();

    //get the implementation address
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy.target);
    console.log("Proxy contract address : ", proxy.target);
    console.log("Implementation contract address : ", implementationAddress);
}

main();