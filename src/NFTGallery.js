import React, { useState, useEffect } from 'react';
import getWeb3 from './web3';
import axios from 'axios';
import NFTContract from './contracts/NFTContract.json'; // Ensure this path is correct
import './NFTGallery.css'; // Import a CSS file for styling

const NFTGallery = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
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
        await loadNFTs(contractInstance, accounts[0]);
      } catch (error) {
        console.error('Error connecting to web3:', error);
        setError('Failed to connect to web3');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const loadNFTs = async (contract, account) => {
    try {
      const totalSupply = await contract.methods.totalSupply().call();
      const nfts = [];
      for (let i = 0; i < totalSupply; i++) {
        const tokenId = await contract.methods.tokenByIndex(i).call();
        const tokenURI = await contract.methods.tokenURI(tokenId).call();
        const metadata = await axios.get(tokenURI);
        nfts.push({ tokenId, ...metadata.data });
      }
      setNfts(nfts);
    } catch (error) {
      console.error('Error loading NFTs:', error);
      setError('Failed to load NFTs');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="nft-gallery">
      {nfts.length > 0 ? (
        nfts.map((nft, index) => (
          <div key={index} className="nft-card">
            <img src={nft.image} alt={nft.name} className="nft-image" />
            <h3>{nft.name}</h3>
            <p>{nft.description}</p>
          </div>
        ))
      ) : (
        <p>No NFTs found</p>
      )}
    </div>
  );
};

export default NFTGallery;


