import styles from "../styles/VendingMachine.module.css"
import 'bulma/css/bulma.css'
import Head from "next/head"
import {ethers} from "ethers"

export default function VendingMachine() {
  const connectWalletHandler = async () => {
    if (window && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      alert(await signer.getAddress())
    } else {
      alert("Please install wallet")
    }
  }

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
            <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <p>text</p>
        </div>
      </section>
    </div>
  )
}