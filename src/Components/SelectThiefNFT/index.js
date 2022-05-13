import React, { useEffect, useState } from 'react';
import './SelectThiefNFT.css';
import { CONTRACT_ADDRESS, transformPlayerData } from '../../constants';
import thiefABIJson from '../../utils/Thief.json';
import { ethers } from 'ethers';
import LoadingIndicator from "../../Components/LoadingIndicator";

const SelectThiefNFT = ({ setThiefNFT }) => {
    // varaible to store nft to options
    const [thiefs, setThiefs] = useState([]);
    const [gameContract, setGameContract] = useState(null);

    const [mintingNFT, setMintingNFT] = useState(false);

    // effect to load contract
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

    // effect to get nft options and set up event listener for on mint
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

        const onThiefMint = async (sender, tokenId, nftTypeIndex) => {
            console.log(
              `ThiefNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} nftTypeIndex: ${nftTypeIndex.toNumber()}`
            );
        
            if (gameContract) {
                const thiefNFT = await gameContract.checkIfUserHasNFT();
                console.log('ThiefNFT: ', thiefNFT);
                setThiefNFT(transformPlayerData(thiefNFT));
                alert(`Your NFT is all done -- see it here: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
            }
        };
      
        // event listener from contract
        if (gameContract) {
            getThiefClans();
            gameContract.on('PlayerNFTMinted', onThiefMint);
        }

        // clean up listener
        return () => {
            if (gameContract) {
                gameContract.off('PlayerNFTMinted', onThiefMint);
            }
        }

      }, [gameContract]);
    // Render Methods
    const renderThiefNFTs = () => {
      return thiefs.map((thief, index) => (
        <div className={`thief-nft-item ${thief.color}`} key={thief.clan}>
            <div className='image-container'>
              <img src={"https://gateway.pinata.cloud/ipfs/" + thief.imageURI.slice(7, thief.imageURI.length)} alt={thief.clan} />
            </div>
            <div className="info-wrapper">
              <div className="nft-details">
                <h4>Clan {thief.clan}</h4>
                <p>Class #{thief.class.toString()}</p>
              </div>
              <button
                type="button"
                className="nft-mint-button"
                onClick={()=> mintThiefNFTAction(index)}
              >Mint</button>
            </div>
        </div>
      ));
    }
    
    // NFT mint function
    const mintThiefNFTAction = async (thiefID) => {
        try {
          if (gameContract) {
            setMintingNFT(true);
            console.log('Minting thief NFT in progress...');
            const mintTxn = await gameContract.mintThiefNFT(thiefID);
            await mintTxn.wait();
            console.log('mintTxn:', mintTxn);
            setMintingNFT(false);
          }
        } catch (error) {
          console.warn('MintThiefNFTAction Error:', error);
          setMintingNFT(false);
          alert('Error: failed in minting your NFT, please check you have enough funds :)');
        }
    };

    return (
        <div className="select-thieft-nft-container">
            <h2>Which wise clan would you wish to join?</h2>
            {thiefs.length > 0 && (
                <div className="nft-grid">{renderThiefNFTs()}</div>
            )}
            {!mintingNFT && (
              <div className="loading">
                <div className="indicator">
                  <LoadingIndicator />
                  <p>Minting In Progress...</p>
                </div>
                <img
                  src="https://c.tenor.com/Z8GdGNlTC5oAAAAC/ready-to-rob-pops-mask.gif"
                  alt="Minting loading indicator"
                />
              </div>
            )}
        </div>
    );
};

export default SelectThiefNFT;