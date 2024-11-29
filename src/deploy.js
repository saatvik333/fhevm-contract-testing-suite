import { JsonRpcProvider, Wallet, ContractFactory } from "ethers";
import getCompiledContract from "./compile.js";
import dotenv from "dotenv";
import logger from "./utils/logger.js";

dotenv.config();

async function deployContract(
  networkUrl,
  privateKey,
  contractFile,
  constructorArgs = [],
) {
  try {
    const compiledContract = getCompiledContract(contractFile);
    const { abi, evm } = compiledContract;

    const provider = new JsonRpcProvider(networkUrl);
    const wallet = new Wallet(privateKey, provider);

    const factory = new ContractFactory(abi, evm.bytecode, wallet);
    const contract = await factory.deploy(...constructorArgs);

    await contract.waitForDeployment();
    return { contract };
  } catch (error) {
    logger.error(`Error deploying contract ${contractFile}:`, error.message);
    throw error;
  }
}

export default deployContract;
