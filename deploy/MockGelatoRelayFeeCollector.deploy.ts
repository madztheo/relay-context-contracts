import { deployments, getNamedAccounts } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  if (hre.network.name !== "hardhat") {
    console.error(`Only deploy Mock on hardhat`);
    process.exit(1);
  }

  await deploy("MockGelatoRelayFeeCollector", {
    from: deployer,
  });
};

func.skip = async (hre: HardhatRuntimeEnvironment) => {
  return hre.network.name !== "hardhat";
};
func.dependencies = ["MockRelay"];
func.tags = ["MockGelatoRelayFeeCollector"];

export default func;
