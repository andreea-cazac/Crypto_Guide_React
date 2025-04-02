import { renderHook, act, waitFor } from '@testing-library/react-native'; // ✅ Include waitFor!
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApiConfig } from '../../hooks/useApiConfig';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));

describe('useApiConfig', () => {
    const mockInitialConfig = { news: 'local', coins: 'external' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('loads default config if no config is stored', async () => {
        AsyncStorage.getItem.mockResolvedValue(null);
        const { result } = renderHook(() => useApiConfig());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.config).toEqual({ news: 'external', coins: 'external' });
    });

    it('loads config from AsyncStorage if present', async () => {
        AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockInitialConfig));
        const { result } = renderHook(() => useApiConfig());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.config).toEqual(mockInitialConfig);
    });

    it('updates config and saves to AsyncStorage', async () => {
        AsyncStorage.getItem.mockResolvedValue(null);
        const { result } = renderHook(() => useApiConfig());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        const newConfig = { news: 'external', coins: 'local' };

        await act(async () => {
            await result.current.updateConfig(newConfig);
        });

        expect(AsyncStorage.setItem).toHaveBeenCalledWith('apiConfig', JSON.stringify(newConfig));
        expect(result.current.config).toEqual(newConfig);
    });

    it('handles update config errors gracefully', async () => {
        AsyncStorage.getItem.mockResolvedValue(null);
        AsyncStorage.setItem.mockRejectedValueOnce(new Error('Fail'));
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const { result } = renderHook(() => useApiConfig());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        await act(async () => {
            await result.current.updateConfig({ coins: 'local', news: 'external' });
        });

        expect(consoleSpy).toHaveBeenCalledWith('Failed to update API config', expect.any(Error));
        consoleSpy.mockRestore();
    });

    it('handles load config errors gracefully', async () => {
        AsyncStorage.getItem.mockRejectedValueOnce(new Error('Load failed'));
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const { result } = renderHook(() => useApiConfig());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(consoleSpy).toHaveBeenCalledWith('Failed to load API config', expect.any(Error));
        consoleSpy.mockRestore();
    });
});
