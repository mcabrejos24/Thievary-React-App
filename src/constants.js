const CONTRACT_ADDRESS = '0x641b102aBD757472C844C597Cfa6d8922C16Ac39';

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