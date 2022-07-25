const main = async () => {
    const [owner, superCoder] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("batman");
    await domainContract.deployed()
    console.log("domain contract deployed at ", domainContract.address);
    console.log("Contract deployed by : ", owner.address);
    let transaction = await domainContract.register("ishan", {value: hre.ethers.utils.parseEther('0.1')});
    await transaction.wait();
    const balance = await hre.ethers.provider.getBalance(domainContract.address)
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance));
    try {
        transaction = await domainContract.connect(superCoder).withdraw();
        await transaction.wait()
    } catch (error) {
        console.error("Error ", error)
    }
    let ownerBalance = await hre.ethers.provider.getBalance(owner.address)
    console.log("Balance of owner before withdrawls: ", hre.ethers.utils.formatEther(ownerBalance))
    transaction = await domainContract.connect(owner).withdraw();
    await transaction.wait();
    const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
    console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
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