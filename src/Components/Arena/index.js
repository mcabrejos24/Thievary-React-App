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
                playerArr.push(transformPlayerData(playerInfo));
            }
            setAllPlayers([...playerArr]);
            console.log(allPlayers);
            console.log('above');
        }

        if(gameContract) {
            fetchAllPlayers();
        }

    }, [gameContract]);
        
    const renderOtherPlayers = () => {
        let finalRender = [];
        if (allPlayers.length > 0) {
            for (let  player of allPlayers) {
                finalRender.push(<div className="player">
                    <div className="image-content">
                      <h2>{player.color + " " + player.clan}</h2>
                      <img
                          src={"https://gateway.pinata.cloud/ipfs/" + player.imageURI.slice(7, player.imageURI.length)}
                          alt={`Thief ${player.clan}`}
                      />
                      <div className="health-bar">
                          <progress value={player.stealsLeft} max={player.maxSteals} />
                          <p>{`${player.stealsLeft} / ${player.maxSteals} Steals`}</p>
                        </div>
                    </div>
                    <div className="stats">
                      <h4>{`Total Daggers: ${player.daggerCount}`}</h4>
                    </div>
                </div>);
            }
          return (
            <div className="players-container">
              <h2 className="all-players-card-title">Players to steal from:</h2>
              <div className="players-grid">
                { finalRender }
              </div>
            </div>
          );
  
      
      }
    }
    return (
      <div className="arena-container">
        {thiefNFT && (
          <div className="your-player-container">
            <h2 className="player-card-title">Your Player Card:</h2>
            <div className={`player-item ${thiefNFT.color}`} key={thiefNFT.clan}>
              <div className='image-container'>
                <img src={"https://gateway.pinata.cloud/ipfs/" + thiefNFT.imageURI.slice(7, thiefNFT.imageURI.length)} alt={thiefNFT.clan} />
                <p class="player-class">Class #{thiefNFT.class.toString()}</p>
              </div>
              <div className="info-wrapper">
                <div className="your-player-details">
                  <div className="your-player-stats">
                    <progress className="steals-left" value={thiefNFT.stealsLeft} max={thiefNFT.maxSteals} />
                    <p className="steals-left-number">{`${thiefNFT.stealsLeft} / ${thiefNFT.maxSteals} Steals`}</p>
                    <div className="stats">
                      <p className="total-daggers">{`Total Daggers: ${thiefNFT.daggerCount}`}</p>
                      <p className="total-shields">{`Total Shields: ${thiefNFT.shieldCount}`}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Players */}
        {renderOtherPlayers()}

      </div>
    );
  };

export default Arena;