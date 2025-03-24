import {APIRequestContext} from "@playwright/test";
import dotenv from "dotenv"
import {AuthenticationResponse} from "../models/authentication-response-model";

dotenv.config()

const endpoint = 'api/auth/login';

export class AuthAPI {
    private request: APIRequestContext;
    private baseUrl: string = process.env.BASE_URL!;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async authenticate(username: string, password: string): Promise<AuthenticationResponse> {
        const responce = await this.request.post(`${this.baseUrl}/${endpoint}`, {
            headers: {"Content-Type": "application/json"},
            data: {
                username, password
            }
        })


        if (!responce.ok()) {
            throw new Error(`Authentication failed. Status: ${responce.status}`);
        }

        const responseData: AuthenticationResponse = await responce.json();
        return responseData;

    }
}