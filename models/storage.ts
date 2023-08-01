import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async function storeToken(token: string) {
        try {
            const tokenAndDate = {
                token: token,
                date: new Date().getTime(),
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
            console.log("Error occured during attempt to store auth-token.");   
        }
    },
    readToken: async function readToken(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log("Error occured while attempting to read auth-token.");   
        }
    },
    deleteToken: async function deleteToken() {
        await AsyncStorage.removeItem('@token');
    }
};

export default storage;