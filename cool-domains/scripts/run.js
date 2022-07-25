const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("batman");
    await domainContract.deployed()
    console.log("domain contract deployed at ", domainContract.address);
    console.log("Contract deployed by : ", owner.address);
    const transaction = await domainContract.register("ishan", {value: hre.ethers.utils.parseEther('0.1')});
    await transaction.wait();
    const domainOwner = await domainContract.getAddress("ishan");
    console.log("Owner of domain : ", domainOwner);
    const balance = await hre.ethers.provider.getBalance(domainContract.address)
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance));
};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();

//  0x5FbDB2315678afecb367f032d93F642f64180aa3