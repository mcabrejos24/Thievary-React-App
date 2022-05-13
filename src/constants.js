const CONTRACT_ADDRESS = '0xEc61Dd17BCCe3C713d1c5F46C7d4EA0Ee14c6372';

const transformPlayerData = (playerData) => {
    return {
        itemId: playerData.itemId,
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
