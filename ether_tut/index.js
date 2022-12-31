
const axios = require("axios")
require("dotenv").config()

const { ethers } = require("ethers");

(async () => {
    const provider = ethers.getDefaultProvider("ropsten", {
        infura: {
          projectId: "98ca232a337e49ad9ef2b411a83f5bfd",
          projectSecret: "ac505bc2e8634974af7325492b9d0e5c",
        },
        
    });



    const  abi = [
        "function name() view returns (string)",
        "function symobol() view returns(string)"
    ]
    const balance = await provider.getBalance("0x6B9176E2dffD71a130A7303581C166070646d1E5")
    const wallet = new ethers.Wallet("ecb0a5bacdcc2db25a663f897e63a3ab5e9ea86f6164a470794bd11a7562e920")
    const contract = new ethers.Contract("0x0Aea21827CEDbf88F76C70E1f45A6A03D6590c79", abi, provider)
    const privateKey = wallet.privateKey
    console.log(privateKey)
    console.log(wallet.publicKey)
    console.log(wallet.provider)

    // const balance = await wallet.getBalance()
    console.log(ethers.utils.formatEther(balance, "gwei"))
    console.log(contract.interface)
    
    // const blockNumber = await provider.getBlockNumber()
    // const balance = await provider.getBalance("0x6B9176E2dffD71a130A7303581C166070646d1E5")
    // const name = await provider.getNetwork()
    // const gasFee = await provider.getFeeData()
    // console.log(ethers.utils.formatEther(balance))
    // console.log(utils.formatUnits(gasFee, "gwei"))

}) ();

