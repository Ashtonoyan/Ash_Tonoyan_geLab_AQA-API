import {AuthAPI} from "../api/auth-api";
import {AuthenticationResponse} from "../models/authentication-response-model";
import dotenv from "dotenv";

dotenv.config()


export class AuthHelper {
    private authAPI: AuthAPI;
    private username: string = process.env.username_api!;
    private password: string = process.env.password_api!;

    constructor(authAPI: AuthAPI) {
        this.authAPI = authAPI;
    }

    async authenticate(): Promise<AuthenticationResponse> {
        return await this.authAPI.authenticate(this.username, this.password);
    }
}