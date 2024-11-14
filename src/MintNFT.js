import React, { useState, useEffect } from 'react';
import getWeb3 from './web3';
import NFTContract from './contracts/NFTContract.json';
import './MintNFT.css';

const MintNFT = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [tokenURI, setTokenURI] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = NFTContract.networks[networkId];
        const contractInstance = new web3.eth.Contract(
          NFTContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Error connecting to web3:', error);
        setError('Failed to connect to web3');
      }
    };
    init();
  }, []);

  const mintNFT = async () => {
    if (!tokenURI) {
      setError('Token URI is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await contract.methods.mint(accounts[0], tokenURI).send({ from: accounts[0] });
      alert('NFT minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error);
      setError('Failed to mint NFT');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Mint Your NFT</h2>
      <input
        type="text"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        placeholder="Enter Token URI"
      />
      <button onClick={mintNFT} disabled={loading}>
        {loading ? 'Minting...' : 'Mint NFT'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MintNFT;
