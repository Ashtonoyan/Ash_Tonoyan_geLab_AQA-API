import {getRequest} from "../core/utils/api-utils";
import {APIResponse} from "@playwright/test";
import {test} from "../core/api-fixtures";

const endpoint = 'api/booking';

export class GetBookingByRoomIDAPI {


    static async getBookingsByRoomId(roomId: number, token: string): Promise<APIResponse> {
        return await test.step(`GET ${endpoint} by ${roomId}`, async()=> {
            const response = await getRequest().get(`/${endpoint}`, {
                params: {
                    roomid: roomId.toString(),
                },
                headers: {
                    'Cookie': `token=${token}`
                }
            });

            if (!response.ok()) {
                throw new Error(`Failed to fetch bookings! Status: ${response.status()} ${response.statusText()}`);
            }

            return response;
        })

    }
}