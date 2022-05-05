const CONTRACT_ADDRESS = '0x1564b3572bD80FB5EeD6FDda7bAed4C1dd4b8FFF';

const transformPlayerData = (playerData) => {
    return {
        clan: playerData.clan,
        color: playerData.color,
        imageURI: playerData.imageURI,
        class: playerData.class,
        stealsLeft: playerData.stealsLeft,
        maxSteals: playerData.maxSteals,
        totalStealsAttempted: playerData.totalStealsAttempted,
        daggerCount: playerData.daggerCount,
        shieldCount: playerData.shieldCount,
        level: playerData.level
    };
  };
  
  export { CONTRACT_ADDRESS, transformPlayerData };