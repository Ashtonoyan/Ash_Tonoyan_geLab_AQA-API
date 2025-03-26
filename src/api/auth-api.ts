import dotenv from "dotenv"
import {AuthenticationResponse} from "../models/authentication-response-model";
import {getRequest} from "../core/utils/api-utils";
import * as fs from 'fs';
import * as path from 'path';

const TOKEN_FILE_PATH = path.join(__dirname, '..', '..', 'auth-token.json');


dotenv.config()

const endpoint = 'api/auth/login';


export class AuthAPI {
    private static token: string | null = null;

    private static loadToken(): void {
        if (fs.existsSync(TOKEN_FILE_PATH)) {
            const tokenData = fs.readFileSync(TOKEN_FILE_PATH, "utf-8");
            const {token} = JSON.parse(tokenData);
            AuthAPI.token = token;
        }
    }

    private static saveToken(token: string): void {
        fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify({token}), "utf-8");
        AuthAPI.token = token;
    }

    public static getToken(): string | null {
        if (!AuthAPI.token) {
            AuthAPI.loadToken();
        }
        return AuthAPI.token;
    }

    async authenticate(username: string, password: string): Promise<AuthenticationResponse> {
        const response = await getRequest().post(`/${endpoint}`, {
            headers: {"Content-Type": "application/json"},
            data: {username, password},
        });

        if (!response.ok()) {
            throw new Error(`Authentication failed. Status: ${response.status}`);
        }

        const responseData: AuthenticationResponse = await response.json();

        AuthAPI.saveToken(responseData.token);

        return responseData;
    }
}