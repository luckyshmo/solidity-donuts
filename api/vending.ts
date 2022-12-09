import { ethers } from 'ethers'
import abi from './abi'

const provider = new ethers.providers.InfuraProvider('goerli', '40d7cf95001e4114b889fda2d0292b7c') //ok
const contractAddress = '0x4101FBf98590a8D09723c725c43d567B47e443dd'

if (
  !(ethers.utils.isAddress(provider.network.ensAddress!) && ethers.utils.isAddress(contractAddress))
)
  throw new Error('invalid address provided')

const vmContract = new ethers.Contract(contractAddress, abi, provider)

export default vmContract
