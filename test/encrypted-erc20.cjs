// const logger = require("../src/utils/logger.js");
// const { JsonRpcProvider, Wallet, Contract } = require("ethers");
const { createInstance } = require("fhevmjs");
const dotenv = require("dotenv");

dotenv.config();

async function testEncryptedERC20(networkUrl, gatewayUrl) {
  const instance = await createInstance({
    chainId: 9000,
    networkUrl: networkUrl,
    gatewayUrl: gatewayUrl,
  });
  console.log(instance);
}

module.exports = testEncryptedERC20;
