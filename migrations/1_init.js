var VendingMachine = artifacts.require("VendingMachine");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(VendingMachine);
};