import getCompiledContract from "./src/compile.js";
import deployContract from "./src/deploy.js";
// import testSimpleStorage from "./test/simple-storage.js";
const testEncryptedERC20 = (await import("./test/encrypted-erc20.cjs")).default;

import logger from "./src/utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const networkUrl = process.env.PROVIDER_URL;
  const privateKey = process.env.PRIVATE_KEY;
  const gatewayUrl = process.env.GATEWAY_URL;
  const contractFile = "encrypted-erc20.sol";
  // const contractFile = "encrypted-erc20.sol";

  getCompiledContract(contractFile);

  const constructorArgs = ["Test Token", "TEST"];
  const { contract } = await deployContract(
    networkUrl,
    privateKey,
    contractFile,
    constructorArgs,
  );
  console.log(contract);
  const contractAddress = await contract.getAddress();
  logger.info(`Contract Address: ${contractAddress}`);

  testEncryptedERC20(networkUrl, gatewayUrl);
}

main().catch((error) => {
  logger.error("Error in main execution:", error);
});
