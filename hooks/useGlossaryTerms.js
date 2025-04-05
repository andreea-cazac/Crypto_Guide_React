import { useEffect, useState } from 'react';
import { getAllGlossaryTerms } from '../services/api/glossaryApi';
import { groupGlossaryTerms } from '../utils/groupGlossaryTerms';

export const useGlossaryTerms = () => {
    const [groupedTerms, setGroupedTerms] = useState({});
    const [alphabet, setAlphabet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const data = await getAllGlossaryTerms();
                const { grouped, alphabet } = groupGlossaryTerms(data);
                setGroupedTerms(grouped);
                setAlphabet(alphabet);
            } catch (_error) {
                setErrorMessage({
                    title: 'Oops! Something went wrong',
                    message: 'We couldn’t load the glossary. Please check your connection or try again later.',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTerms();
    }, []);

    return {
        groupedTerms,
        alphabet,
        loading,
        errorMessage
    };
};
