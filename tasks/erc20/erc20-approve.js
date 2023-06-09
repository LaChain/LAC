const { task } = require("hardhat/config");
const { toWei } = require("../../utils/helpers");

task("erc20-approve", "Approve tokens for transfer")
  .addParam("erc20Address", "ERC20 contract address")
  .addParam("spender", "Spender/Recipient account")
  .addParam("amount", "Amount to mint")
  .setAction(async (taskArgs, hre) => {
    await hre.setup();
    const sender = hre.network.config.sender;

    const tERC20 = (await hre.ethers.getContractFactory("MockERC20")).attach(
      taskArgs.erc20Address
    );
    // const amount = hre.ethers.utils.parseEther(taskArgs.amount);

    console.log("Approve...");
    const approveTx = await tERC20
      .connect(sender)
      .approve(taskArgs.spender, toWei(taskArgs.amount));
    await approveTx.wait(1);
    console.log(
      `Approve spender: ${taskArgs.spender} , amount: ${taskArgs.amount}`
    );
    return approveTx;
  });

module.exports = {};
