import getCompiledContract from "./src/compile.js";
import deployContract from "./src/deploy.js";
import testSimpleStorage from "./test/simple-storage.js";
import logger from "./src/utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const networkUrl = process.env.PROVIDER_URL;
  const privateKey = process.env.PRIVATE_KEY;
  const contractFile = "simple-storage.sol";

  const { abi } = getCompiledContract(contractFile);

  const { contract } = await deployContract(
    networkUrl,
    privateKey,
    contractFile,
  );
  const contractAddress = await contract.getAddress();
  logger.info(`Contract Address: ${contractAddress}`);

  try {
    await testSimpleStorage(abi, contractAddress, networkUrl, privateKey);
    logger.info("Contract tested successfully!");
  } catch (error) {
    logger.error("Error testing contract:", error);
  }
}

main().catch((error) => {
  logger.error("Error in main execution:", error);
});
