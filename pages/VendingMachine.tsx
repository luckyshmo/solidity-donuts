import styles from '../styles/VendingMachine.module.css'
import 'bulma/css/bulma.css'
import Head from 'next/head'
import { ethers } from 'ethers'
import vmContract from '../api/vending'
import { useState, useEffect } from 'react'
import getUserContract from '../api/userVending'

export default function VendingMachine() {
  const [donutsCount, setDonutsCount] = useState('0')
  const [myDonutsCount, setMyDonutsCount] = useState('0')
  const [provider, setProvider] = useState<null | ethers.providers.Web3Provider>(null)

  const connectWalletHandler = async () => {
    if (window && window.ethereum) {
      const userProvider = new ethers.providers.Web3Provider(window.ethereum as any)
      await userProvider.send('eth_requestAccounts', [])
      setProvider(userProvider)
      getMyDonutsHandler(userProvider)
    } else {
      alert('Please install wallet')
    }
  }

  const buyDonut = async () => {
    if (provider) {
      const contract = getUserContract(provider)
      contract.purchase(ethers.BigNumber.from(1), {
        // from: send_account,
        // to: to_address,
        // nonce: window.ethersProvider.getTransactionCount(send_account, 'latest'),
        value: ethers.utils.parseEther('0.001'),
        gasPrice: 100,
        gasLimit: 9000000,
      })
    } else {
      alert('Please connect wallet')
    }
  }

  const restockDonut = async () => {
    const restockAmount = ethers.BigNumber.from(1)
    if (provider) {
      const contract = getUserContract(provider)
      contract.restock(restockAmount, {
        gasPrice: 100,
        gasLimit: 9000000,
      })
    } else {
      alert('Please connect wallet')
    }
  }

  const getMyDonutsHandler = async (provider: any) => {
    const userAddress = await provider.getSigner().getAddress()
    const myDonuts = await vmContract.donutBalances(userAddress)
    setMyDonutsCount(myDonuts.toString())
  }

  const getDonutsHandler = async () => {
    const balance = await vmContract.getVendingMachineBalance()
    setDonutsCount(balance.toString())
  }

  useEffect(() => {
    getDonutsHandler()
  }, [provider])

  return (
    <div className={styles.main}>
      <Head>
        <title>VendingMachine demo</title>
      </Head>
      <nav className="navbar mt-4 mb-4">
        <div className="container">
          <div className="navbar-brand">
            <h1>VendingMachine</h1>
          </div>
          <div className="navbar-end">
            <button onClick={connectWalletHandler} className="button is-primary">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>
      <div>
        <div className="container">
          <h2>Donut count: {donutsCount}</h2>
          <h2>My donuts: {myDonutsCount}</h2>
          <button onClick={buyDonut} className="button is-primary">
            Buy donut
          </button>
          <button onClick={restockDonut} className="button is-primary">
            Restock
          </button>
        </div>
      </div>
    </div>
  )
}
