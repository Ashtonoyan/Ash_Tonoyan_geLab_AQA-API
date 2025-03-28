import {APIResponse} from '@playwright/test';
import {GetBookingByRoomIDAPI} from "../api/get-bookingByRoomID";
import {test} from "../core/api-fixtures";

export class GetBookingAPIHelper {

    static async getBooking(roomId: number, token: string): Promise<APIResponse> {
        return await test.step(`GET by roomid= ${roomId}`, async ()=> {
            const response = await GetBookingByRoomIDAPI.getBookingsByRoomId(roomId, token)
            return response;
        })

    }

}