const CONTRACT_ADDRESS = '0x6fBAf3DE88dac24b38049C6D97Ba50270722d270';

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