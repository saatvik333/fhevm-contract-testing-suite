import dotenv from "dotenv";
import solc from "solc";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTRACTS_DIR = path.resolve(__dirname, "../contracts");
const NODE_MODULES_DIR = path.resolve(__dirname, "../node_modules");

function getContractPath(contractName) {
  const contractPath = path.join(CONTRACTS_DIR, contractName);
  if (!fs.existsSync(contractPath)) {
    throw new Error(
      `Contract file ${contractName} not found in contracts directory.`,
    );
  }
  return contractPath;
}

function readContractSource(contractPath) {
  return fs.readFileSync(contractPath, "utf8");
}

function createCompilerInput(contractName, source) {
  return {
    language: "Solidity",
    sources: {
      [contractName]: {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode"],
        },
      },
    },
  };
}

function findImports(importPath) {
  const fullPath = path.join(NODE_MODULES_DIR, importPath);
  if (fs.existsSync(fullPath)) {
    return { contents: fs.readFileSync(fullPath, "utf8") };
  }
  return { error: `Import file ${importPath} not found in node_modules.` };
}

function compileContract(input) {
  return JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports }),
  );
}

function handleCompilationErrors(errors) {
  errors.forEach((error) => {
    if (error.severity === "error") {
      throw new Error(`Solidity compilation error: ${error.formattedMessage}`);
    } else {
      console.warn(`Solidity compilation warning: ${error.formattedMessage}`);
    }
  });
}

function extractCompiledContract(output, contractName) {
  const contractKey = Object.keys(output.contracts[contractName])[0];
  return output.contracts[contractName][contractKey];
}

function getCompiledContract(contractName) {
  try {
    const contractPath = getContractPath(contractName);
    const source = readContractSource(contractPath);
    const input = createCompilerInput(contractName, source);
    const output = compileContract(input);

    if (output.errors) {
      handleCompilationErrors(output.errors);
    }

    return extractCompiledContract(output, contractName);
  } catch (error) {
    console.error(`Error compiling contract ${contractName}:`, error.message);
    throw error;
  }
}

export default getCompiledContract;
