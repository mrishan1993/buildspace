const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory("Domains")
    const domainContract = await domainContractFactory.deploy("batman")
    await domainContract.deployed()
    console.log("Contract deployed to : ", domainContract.address)
    let transaction = await domainContract.register("bajru", {value: hre.ethers.utils.parseEther('0.1')})
    await transaction.wait()
    console.log("Minted name bajru.batman")
    transaction = await domainContract.setRecord("bajru", "I am the real batman and I love batman. DC is better than Marvel. Batman is better than Iron Man. Marvel sucks!")
    await transaction.wait()
    console.log("Set record for bajru.batman")

    const address = await domainContract.getAddress("bajru")
    console.log("Owner of bajru batman domain :", address)

    const balance = await hre.ethers.provider.getBalance(domainContract.address)
    console.log("Contract balance : ", hre.ethers.utils.formatEther(balance))
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.error("Error :", error)
        process.exit(1)
    }
}

runMain()