import CryptoJS from 'crypto-js';
import SecureStorage from 'secure-web-storage';

import CONFIG from '@lib/config/config';
import { TKeyStorageVariable } from '@lib/config/storage-variable';

const secureStorage = (storage = localStorage) =>
    new SecureStorage(storage, {
        hash: function hash(key: any) {
            key = CryptoJS?.SHA256(key, CONFIG.SECRET_KEY);
            return key?.toString();
        },
        encrypt: function encrypt(data: any) {
            data = CryptoJS?.AES?.encrypt(data, CONFIG.SECRET_KEY);
            data = data?.toString();

            return data;
        },
        decrypt: function decrypt(data: any) {
            data = CryptoJS?.AES?.decrypt(data, CONFIG.SECRET_KEY);
            data = data?.toString(CryptoJS.enc.Utf8);

            return data;
        },
    });

export const getItemSecureWebstorage = <T>(key: TKeyStorageVariable, storage = localStorage): T => {
    return secureStorage(storage)?.getItem(key);
};

export const setItemSecureWebstorage = (key: TKeyStorageVariable, value: any, storage = localStorage) => {
    return JSON.stringify(secureStorage(storage)?.setItem(key, value));
};

export const removeItemSecureWebstorage = (key: TKeyStorageVariable, storage = localStorage) => {
    return secureStorage(storage)?.removeItem(key);
};
