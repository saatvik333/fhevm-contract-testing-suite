import logger from "../src/utils/logger.js";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import { initFhevm, createInstance } from "fhevmjs";
import dotenv from "dotenv";

dotenv.config();

initFhevm().then(async () => {
  const instance = await createInstance({
    chainId: 9000,
    networkUrl: process.env.PROVIDER_URL,
    gatewayUrl: process.env.GATEWAY_URL,
  });
});
