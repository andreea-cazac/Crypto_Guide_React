export const groupGlossaryTerms = (terms) => {
    if (!terms || !Array.isArray(terms)) return { grouped: {}, alphabet: [] };

    const sorted = terms.sort((a, b) =>
        a.term.toLowerCase().localeCompare(b.term.toLowerCase())
    );

    const grouped = sorted.reduce((acc, item) => {
        const letter = item.term[0].toUpperCase();
        acc[letter] = [...(acc[letter] || []), item];
        return acc;
    }, {});

    const alphabet = Object.keys(grouped).sort();

    return { grouped, alphabet };
};