import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        await provider.request({ method: 'eth_requestAccounts' });
        resolve(web3);
      } else {
        alert('MetaMask not found. Please install MetaMask to use this application.');
        reject(new Error('MetaMask not found'));
      }
    } catch (error) {
      alert('An error occurred while connecting to MetaMask');
      reject(error);
    }
  });

export default getWeb3;


