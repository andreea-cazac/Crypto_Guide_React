export const groupDexByBaseName = (dexList = []) => {
    const dexMap = new Map();

    dexList.forEach(dex => {
        const baseName = dex.name.split(/ v\d| CLMM| \(|\//i)[0].trim();
        const existing = dexMap.get(baseName);
        const marketShare = parseFloat(dex.market_share || 0);

        if (existing) {
            dexMap.set(baseName, {
                marketShare: existing.marketShare + marketShare
            });
        } else {
            dexMap.set(baseName, {
                marketShare: marketShare
            });
        }
    });

    return dexMap;
};