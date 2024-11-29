// code to test the functions of the simple storage contract
import logger from "../src/utils/logger.js";
import { JsonRpcProvider, Wallet, Contract } from "ethers";

async function testSimpleStorage(abi, contractAddress, networkUrl, privateKey) {
  const provider = new JsonRpcProvider(networkUrl);
  const wallet = new Wallet(privateKey, provider);

  const contract = new Contract(contractAddress, abi, wallet);

  logger.info("Setting value to 69...");
  const tx = await contract.setValue(69);
  await tx.wait();
  logger.info("Value set!");

  logger.info("Reading value...");
  const value = await contract.getValue();
  logger.info("Stored value is:", value.toString());
}

export default testSimpleStorage;
