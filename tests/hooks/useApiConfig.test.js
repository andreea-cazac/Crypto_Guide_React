import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useApiConfig } from '../../hooks/useApiConfig';
import api from '../../services/interceptor/axiosInterceptor';

jest.mock('../../services/interceptor/axiosInterceptor', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

describe('useApiConfig', () => {
    const mockServerConfig = { useLocalNews: false, useLocalCoins: true };
    const expectedClientConfig = { news: 'external', coins: 'local' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('loads config from server and maps to client config', async () => {
        api.get.mockResolvedValueOnce({ data: mockServerConfig });

        const { result } = renderHook(() => useApiConfig());

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.config).toEqual(expectedClientConfig);
    });

    it('updates config and sends correct data to server', async () => {
        api.get.mockResolvedValueOnce({ data: mockServerConfig });
        api.put.mockResolvedValueOnce({
            data: { useLocalNews: true, useLocalCoins: false },
        });

        const { result } = renderHook(() => useApiConfig());
        await waitFor(() => expect(result.current.loading).toBe(false));

        await act(async () => {
            await result.current.updateConfig({ news: 'local', coins: 'external' });
        });

        expect(api.put).toHaveBeenCalledWith('/api/config', {
            useLocalNews: true,
            useLocalCoins: false,
        });

        expect(result.current.config).toEqual({ news: 'local', coins: 'external' });
    });

    it('handles server fetch error gracefully', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        api.get.mockRejectedValueOnce(new Error('Load failed'));

        const { result } = renderHook(() => useApiConfig());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeTruthy();
        expect(consoleSpy).toHaveBeenCalledWith(
            'Failed to load config from server:',
            expect.any(Error)
        );
        consoleSpy.mockRestore();
    });

    it('handles update config errors gracefully', async () => {
        api.get.mockResolvedValueOnce({ data: mockServerConfig });
        api.put.mockRejectedValueOnce(new Error('Update failed'));
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const { result } = renderHook(() => useApiConfig());
        await waitFor(() => expect(result.current.loading).toBe(false));

        await act(async () => {
            await result.current.updateConfig({ news: 'local', coins: 'external' });
        });

        expect(result.current.error).toBeTruthy();
        expect(consoleSpy).toHaveBeenCalledWith(
            'Failed to update config on server:',
            expect.any(Error)
        );
        consoleSpy.mockRestore();
    });
});