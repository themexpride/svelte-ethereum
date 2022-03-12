require("@nomiclabs/hardhat-waffle");// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 
const test = 'cdf54bff4468d6595aa5098c61a5620a5b0e7552a0d768b2a8d1e3c9a7c0ea74';
module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
		chainId: 1337,
	},
	/*
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/680a69f1f8aa48718acd2a421daacf2f",
	  accounts: [`0x${test}`]
    }
	*/
  },
  solidity: "0.8.4",
};
