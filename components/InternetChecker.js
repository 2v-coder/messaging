import NetInfo from "@react-native-community/netinfo";
export default class InternetChecker {
    static async isNetworkAvailable() {
        const response = await NetInfo.fetch();
        return response.isConnected;
    }
}