import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformPlayerData } from '../../constants';
import thiefABIJson from '../../utils/Thief.json';
import './Arena.css';

const Arena = ({ thiefNFT }) => {
    // State
    const [gameContract, setGameContract] = useState(null);
    const [allPlayers, setAllPlayers] = useState([]);

    const [stealState, setStealState] = useState('');

    const [tokenIdToPlayer, setTokenIdToPlayer] = useState(new Map());

    const stealADagger = async (playerItemId) => {
      try {
        setStealState('Successful Stole!');

        // let victimAddress = tokenIdToPlayer.get(playerItemId);
        // let stealTxn = await gameContract.steal(victimAddress);
        // await stealTxn.wait();
      } catch (error) {
        console.error('Error stealing from a player:', error);
        setStealState('');
      }
    }
  
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
                // adds to map state of token ids to player addresses
                setTokenIdToPlayer(prev => new Map([...prev, [playerInfo.itemId.toString(), allPlayersTxn[i].toString()]]));
            }
            setAllPlayers([...playerArr]);
            console.log(allPlayers);
            console.log('above');
        }

        if(gameContract) {
            fetchAllPlayers();
        }

    }, [gameContract]);
        
    // function to render all other players that have minted an NFT
    const renderOtherPlayers = () => {
        let finalRender = [];
        if (allPlayers.length > 0) {
            for (let player of allPlayers) {
              // skip rendering your player
              if(thiefNFT.itemId.toString() === player.itemId.toString()) continue;
              finalRender.push(
                <div className="player-card-container">
                  <div className={`player-item ${player.color}`} key={player.clan}>
                    <div className='image-container'>
                      <img src={"https://gateway.pinata.cloud/ipfs/" + player.imageURI.slice(7, player.imageURI.length)} alt={player.clan} />
                      <p className="player-class">Class #{player.class.toString()}</p>
                    </div>
                    <div className="info-wrapper">
                        <div className="player-stats">
                          <progress className="steals-left" value={player.stealsLeft} max={player.maxSteals} />
                          <p className="steals-left-number">{`${player.stealsLeft} / ${player.maxSteals} Steals`}</p>
                          <div className="stats">
                            <p className="total-daggers">{`Total Daggers: ${player.daggerCount}`}</p>
                            <p className="total-shields">{`Total Shields: ${player.shieldCount}`}</p>
                          </div>
                        </div>
                    </div>
                    <div className="steal-button-wrapper">
                      <button
                        type="button"
                        className="steal-button"
                        onClick={()=> stealADagger(player.itemId.toString())}
                      >Steal A Dagger</button>
                    </div>
                  </div>
                </div>
              );
            }
          return (
            <div className="players-container">
              <div className="all-players-card-title-wrapper">
                <h2 className="all-players-card-title">Players to steal from:</h2>
              </div>
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
          <div className="player-card-container">
            <div class="player-card-title-wrapper">
              <h2 className="player-card-title">Your Player Card: </h2>
            </div>
            <div className={`player-item ${thiefNFT.color}`} key={thiefNFT.clan}>
              <div className='image-container'>
                <img src={"https://gateway.pinata.cloud/ipfs/" + thiefNFT.imageURI.slice(7, thiefNFT.imageURI.length)} alt={thiefNFT.clan} />
                <p className="player-class">Class #{thiefNFT.class.toString()}</p>
              </div>
              <div className="info-wrapper">
                  <div className="player-stats">
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
        )}

        {/* Other Players */}
        {renderOtherPlayers()}

      </div>
    );
  };

export default Arena;