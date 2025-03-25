import {getRequest} from "../core/utils/api-utils";

const endpoint = 'api/booking';

export class GetBookingByRoomIDAPI {


    async getBookingsByRoomId(roomId: number, token: string): Promise<any> {


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

        const responseData = await response.json();
        return responseData;
    }
}