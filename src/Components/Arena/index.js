import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformPlayerData } from '../../constants';
import thiefABIJson from '../../utils/Thief.json';
import './Arena.css';

const Arena = ({ thiefNFT }) => {
    // State
    const [gameContract, setGameContract] = useState(null);
    const [allPlayers, setAllPlayers] = useState([]);
  
    // UseEffects
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
        const fetchAllPlayers = async () => {
            const allPlayersTxn = await gameContract.getPlayerAddresses();
            console.log("Players: ", allPlayersTxn);
            let playerArr = [];
            for(let i=0; i<allPlayersTxn.length; i++) {
                let playerInfo = await gameContract.getAPlayerNftDetails(allPlayersTxn[i]);
                playerArr.push(allPlayersTxn);
            }
            setAllPlayers([...playerArr]);
        }

        if(gameContract) {
            fetchAllPlayers();
            console.log(allPlayers);
        }

    }, []);
        
  
    return (
      <div className="arena-container">
        {/* Boss */}
  
    {thiefNFT && (
      <div className="players-container">
        <div className="player-container">
          <h2>Your Thief</h2>
          <div className="player">
            <div className="image-content">
              <h2>{thiefNFT.color + " " + thiefNFT.clan}</h2>
              <img
                src={"https://gateway.pinata.cloud/ipfs/" + thiefNFT.imageURI.slice(7, thiefNFT.imageURI.length)}
                alt={`Thief ${thiefNFT.clan}`}
              />
              <div className="health-bar">
                <progress value={thiefNFT.stealsLeft} max={thiefNFT.maxSteals} />
                <p>{`${thiefNFT.stealsLeft} / ${thiefNFT.maxSteals} Steals`}</p>
              </div>
            </div>
            <div className="stats">
              <h4>{`Total Daggers: ${thiefNFT.daggerCount}`}</h4>
            </div>
          </div>
        </div>
      </div>
    )}

      </div>
    );
  };
  
  export default Arena;