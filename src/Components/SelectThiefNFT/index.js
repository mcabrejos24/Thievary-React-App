import React, { useEffect, useState } from 'react';
import './SelectThiefNFT.css';
import { CONTRACT_ADDRESS, transformPlayerData } from '../../constants';
import thiefABIJson from '../../utils/Thief.json';
import { ethers } from 'ethers';


const SelectThiefNFT = ({ setThiefNFT }) => {
    const [thiefs, setThiefs] = useState([]);
    const [gameContract, setGameContract] = useState(null);

    useEffect(() => {
        const { ethereum } = window;
      
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const gameContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            thiefABIJson.abi,
            signer
          );
      
          setGameContract(gameContract);
        } else {
          console.log('Ethereum object not found');
        }
    }, []);


    useEffect(() => {
        const getThiefClans = async () => {
          try {
            console.log('Getting contract theif clans to mint');
      
            // Call contract to get all mint-able theif cards
            const thiefsTxn = await gameContract.getAllDefaultThiefs();
            console.log('thiefsTxn:', thiefsTxn);
      
            // Go through all of our NFT clans and transform the data
            const thiefs = thiefsTxn.map((thiefData) =>
                transformPlayerData(thiefData)
            );
      
            setThiefs(thiefs);
          } catch (error) {
            console.error('Something went wrong fetching thief NFT cards:', error);
          }
        };
      
        if (gameContract) {
            getThiefClans();
        }
      }, [gameContract]);

    // Render Methods
    const renderThiefNFTs = () =>
    thiefs.map((thief, index) => (
    <div className="character-item" key={thief.clan}>
        <div className="name-container">
        <p>{thief.clan}</p>
        </div>
        <img src={"https://gateway.pinata.cloud/ipfs/" + thief.imageURI.slice(7, thief.imageURI.length)} alt={thief.clan} />
        <button
        type="button"
        className="character-mint-button"
        onClick={()=> mintThiefNFTAction(index)}
        >{`Mint ${thief.color + " " + thief.clan}`}</button>
    </div>
    ));

    const mintThiefNFTAction = async (thiefID) => {
        try {
          if (gameContract) {
            console.log('Minting thief NFT in progress...');
            const mintTxn = await gameContract.mintThiefNFT(thiefID);
            await mintTxn.wait();
            console.log('mintTxn:', mintTxn);
          }
        } catch (error) {
          console.warn('MintThiefNFTAction Error:', error);
        }
    };

    return (
        <div className="select-character-container">
            <h2>Which wise clan would you wish to join?</h2>
            {thiefs.length > 0 && (
                <div className="character-grid">{renderThiefNFTs()}</div>
            )}
        </div>
    );
};



export default SelectThiefNFT;