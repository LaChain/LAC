const { task } = require("hardhat/config");

task("register-entity", "Adds a new entity")
  .addParam("contractAddress", "lcs contract address")
  .addParam("domain", "entity domain")
  .addParam("entityAddress", "Address of the entity")
  .addParam("publicKey", "entity public key")
  .setAction(async (taskArgs, hre) => {
    let [admin] = await hre.ethers.getSigners();

    const lcs = (
      await hre.ethers.getContractFactory("LocalCoinSettlementV2")
    ).attach(taskArgs.contractAddress);

    console.log("Register a new entity...");
    const newEntityTx = await lcs
      .connect(admin)
      .registerEntity(
        taskArgs.domain,
        taskArgs.entityAddress,
        taskArgs.publicKey
      );
    await newEntityTx.wait(1);
    console.log("new Entity added: ", taskArgs.domain);
  });

module.exports = {};
