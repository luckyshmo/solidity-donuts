import { ethers } from 'ethers'
import abi from './abi'

const contractAddress = '0x4101FBf98590a8D09723c725c43d567B47e443dd'

if (!ethers.utils.isAddress(contractAddress)) throw new Error('invalid address provided')

function getUserContract(provider: ethers.providers.Web3Provider) {
  return new ethers.Contract(contractAddress, abi, provider.getSigner())
}

export default getUserContract
