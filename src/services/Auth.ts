import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { delay } from "lodash";
import moment from "moment";
import jwt_decode, { JwtPayload } from "jwt-decode";

class Auth {
    static emptyToken = "";
    static authItemPrefix = "kokon-auth";
    static isRotationActiveItemName = `${this.authItemPrefix}-is-rotation-active`;
    static tokenItemName = `${this.authItemPrefix}-auth-token`;
    static rotationIntervalItemName = `${this.authItemPrefix}-rotation-interval`;
    static httpHeader = "Authorization";
    static rotateTokenIntervalHandle: number | undefined = undefined;

    /**
     * @param {GoogleLoginResponse|GoogleLoginResponseOffline} response
     */
    static startRotateRefreshToken = (response: any) => {
        const persistToken = (token: any) => {
            Auth.putAuthTokenToStorage(token);
            Auth.updateAxiosAuthorizationHeader(token)();
        };

        const rotateToken = async () => {
            const authResponse = await response.reloadAuthResponse();
            console.info("[Auth.refreshToken] authResponse:", authResponse);
            const token = authResponse.id_token;
            persistToken(token);
        };

        const getAsMilliseconds = (timeInSeconds = 3600 - 5 * 60) => timeInSeconds * 1000;
        const authResponse = response.getAuthResponse();
        const token = authResponse.id_token;

        persistToken(token);

        const tokenRotateInterval = getAsMilliseconds(authResponse.expires_in);

        sessionStorage.setItem(this.isRotationActiveItemName, "true");
        delay(() => {
            Auth.rotateTokenIntervalHandle = window.setInterval(rotateToken, tokenRotateInterval);
        }, tokenRotateInterval);

        return token;
    };

    static setRotationInterval = (rotationInterval: number) => {
        return sessionStorage.setItem(this.isRotationActiveItemName, rotationInterval.toString());
    };

    static getRotationInterval = () => {
        const rotationInterval = sessionStorage.getItem(this.isRotationActiveItemName);
        return !!rotationInterval ? parseInt(rotationInterval) : null;
    };

    static isRotationActive = () => {
        return sessionStorage.getItem(this.isRotationActiveItemName) !== null;
    };

    static isTokenValid = (token: string) => {
        if (token === Auth.emptyToken) {
            return false;
        }
        const { exp } = jwt_decode<JwtPayload>(token);
        const leastAllowedDelta = 0.05 * (this.getRotationInterval() ?? 0);
        const tokenExpirationTime = moment(exp ?? 0, "X");
        if (moment().isAfter(tokenExpirationTime.add(leastAllowedDelta))) {
            return false;
        }
        return true;
    };

    static stopRotateRefreshToken = () => {
        const token = Auth.emptyToken;
        window.clearInterval(Auth.rotateTokenIntervalHandle);
        Auth.putAuthTokenToStorage(token);
        return token;
    };

    static getHeaderValueFromAuthToken(token: any) {
        return `Bearer ${token}`;
    }

    static getAuthTokenFromStorage() {
        return localStorage.getItem(Auth.tokenItemName) || Auth.emptyToken;
    }

    static putAuthTokenToStorage(token: any) {
        return localStorage.setItem(Auth.tokenItemName, token);
    }

    static updateAxiosAuthorizationHeader(token: any) {
        return function () {
            const isAuthenticated = token !== Auth.emptyToken;
            if (isAuthenticated) {
                const value = Auth.getHeaderValueFromAuthToken(token);
                axios.defaults.headers.common[Auth.httpHeader] = value;
            } else {
                delete axios.defaults.headers.common[Auth.httpHeader];
            }
        };
    }
}

export default Auth;
