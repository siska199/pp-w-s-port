import ENDPOINTS from '@apis/endpoints';

import useAPI from '@hooks/use-api';
import { TUser } from '@typescript/master-module-types';

const useAuthAPI = () => {
    const { apiClient } = useAPI();

    const signIn = async (params: Pick<TUser, 'username' | 'password'>) => {
        const payload = params;
        const result = await apiClient<TUser & { token: string }>({
            endpoint: ENDPOINTS.AUTH.SIGN_IN,
            payload,
            method: 'post',
            message: {
                sucess: 'Login successful',
            },
        });

        return result;
    };

    const signUp = async (params: Omit<TUser, 'id' | 'image' | 'profession' | 'phone_number'>) => {
        const payload = params;
        const result = await apiClient<TUser>({
            endpoint: ENDPOINTS.AUTH.SIGN_UP,
            payload,
            method: 'post',
            message: {
                sucess: 'Your account has been created successfully. You can now log in.',
            },
        });
        return result;
    };

    return {
        signIn,
        signUp,
    };
};

export default useAuthAPI;
