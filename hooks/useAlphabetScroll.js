import {useRef} from 'react';

export const useAlphabetScroll = () => {
    const scrollViewRef = useRef(null);
    const sectionRefs = useRef({});

    const scrollToLetter = (letter) => {
        const ref = sectionRefs.current[letter];
        if (ref && scrollViewRef.current) {
            ref.measureLayout(
                scrollViewRef.current,
                (x, y) => {
                    scrollViewRef.current.scrollTo({ y, animated: true });
                },
                (err) => console.warn('Scroll error', err)
            );
        }
    };

    return {
        scrollViewRef,
        sectionRefs,
        scrollToLetter,
    };
};