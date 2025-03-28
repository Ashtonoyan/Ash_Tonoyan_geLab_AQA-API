import {AuthAPI} from "../api/auth-api";
import {AuthenticationResponse} from "../models/authentication-response-model";
import dotenv from "dotenv";
import {test} from "../core/api-fixtures";

dotenv.config()


export class AuthAPIHelper {
    private static username: string = process.env.username_api!;
    private static password: string = process.env.password_api!;

    static async authenticate(): Promise<string> {
        return await test.step("Authentication response", async () => {
            const responce =  await AuthAPI.getValidToken(this.username, this.password);
            return responce;
        })

    }
}