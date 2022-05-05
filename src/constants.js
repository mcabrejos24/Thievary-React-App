const CONTRACT_ADDRESS = '0x8E0C8790D0ed5fBc355bD26D2244469288416872';

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