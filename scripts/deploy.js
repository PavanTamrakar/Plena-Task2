const hre = require("hardhat");

import goerliTokenABI from "./GOERLItoken.json"
import LendingPoolAddressesProviderABI from "./@aave/core-v3/artifacts/contracts/protocol/configuration/PoolAddressesProvider.sol/PoolAddressesProvider.json"
import LendingPoolABI from "./LendingPool.json"

async function main() {
  
  if (window.ethereum) {
      window.ethereum.enable();
  }
  
  const goerliAmountinWei = web3.utils.toWei("100", "ether").toString()
  const goerliAddress = '0xdD69DB25F6D620A7baD3023c5d32761D353D3De9' 
  const referralCode = '0'
  const userAddress = '0xc84BF495a639240cf55740B593Bc7CF9012d8a2D'
  
  const lpAddressProviderAddress = '0x24a42fD28C976A61Df5D00D0599C34c4f90748c8'
  const lpAddressProviderContract = new web3.eth.Contract(LendingPoolAddressesProviderABI, lpAddressProviderAddress)
  
  const lpCoreAddress = await lpAddressProviderContract.methods
      .getLendingPoolCore()
      .call()
      .catch((e) => {
          throw Error(`Error getting lendingPool address: ${e.message}`)
      })
  
  
  const daiContract = new web3.eth.Contract(DAITokenABI, daiAddress)
  await daiContract.methods
      .approve(
          lpCoreAddress,
          daiAmountinWei
      )
      .send()
      .catch((e) => {
          throw Error(`Error approving DAI allowance: ${e.message}`)
      })
  
  
  const lpAddress = await lpAddressProviderContract.methods
      .getLendingPool()
      .call()
      .catch((e) => {
          throw Error(`Error getting lendingPool address: ${e.message}`)
      })
  
  
  const lpContract = new web3.eth.Contract(LendingPoolABI, lpAddress)
  await lpContract.methods
      .deposit(
          daiAddress,
          daiAmountinWei,
          referralCode
      )
      .send()
      .catch((e) => {
          throw Error(`Error depositing to the LendingPool contract: ${e.message}`)
      })
  
  web3.eth.getAccounts()
  .then(function(accounts) {
      return method.send({from: accounts[0]});
  })
  .then(function(receipt) {
      console.log(receipt);
  })
  .catch(function(error) {
      console.error(error);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
