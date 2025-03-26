import {getRequest} from "../core/utils/api-utils";
import {APIResponse} from "@playwright/test";

const endpoint = 'api/booking';

export class GetBookingByRoomIDAPI {


    async getBookingsByRoomId(roomId: number, token: string): Promise<APIResponse> {


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
    }
}