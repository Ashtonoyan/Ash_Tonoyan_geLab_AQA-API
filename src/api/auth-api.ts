import dotenv from "dotenv"
import {AuthenticationResponse} from "../models/authentication-response-model";
import {getRequest} from "../core/utils/api-utils";
import * as fs from 'fs';
import * as path from 'path';
import {test} from "../core/api-fixtures";
import {expect} from "@playwright/test";
import {APIResponse} from "@playwright/test";

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

    public static async getValidToken(username: string, password: string): Promise<string> {
        if (!AuthAPI.token) {
            AuthAPI.loadToken();
        }

        const isValid = await AuthAPI.validateToken();

        if (!isValid) {
            console.log('Authenticating to get a new token...');
            await AuthAPI.authenticate(username, password);
        }

        return AuthAPI.token!;
    }

    private static async validateToken(): Promise<boolean> {
        if (!AuthAPI.token) return false;

        const response: APIResponse = await getRequest().get('/api/booking', {
            params: {
                roomid: 25,
            },
            headers: {
                'Cookie': `token=${AuthAPI.token}`
            }

        });


        if (response.status() === 401 || response.status() === 500) {
            console.log('Token is invalid. Removing token file...');
            fs.unlinkSync(TOKEN_FILE_PATH);
            AuthAPI.token = null;
            return false;
        }

        return true;
    }

    public static async authenticate(username: string, password: string): Promise<void> {
        await test.step('User authentication', async () => {
            const response = await getRequest().post(`/${endpoint}`, {
                headers: {"Content-Type": "application/json"},
                data: {username, password},
            });

            expect(response.ok(), `Authentication failed. Status: ${response.status()}`).toBeTruthy();

            const responseData: AuthenticationResponse = await response.json();
            AuthAPI.saveToken(responseData.token);
        });

    }
}