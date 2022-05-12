const CONTRACT_ADDRESS = '0xf09D50bD2E6C8df0d7785179b9e52b1b16a1C8Fa';

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
