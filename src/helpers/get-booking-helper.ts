import {APIResponse} from '@playwright/test';
import {GetBookingByRoomIDAPI} from "../api/get-bookingByRoomID";

export class GetBookingHelper {
    private bookingApi: GetBookingByRoomIDAPI;

    constructor(bookingApi: GetBookingByRoomIDAPI) {
        this.bookingApi = bookingApi;
    }

    async getBooking(roomId: number, token: string): Promise<APIResponse> {
        const response = await this.bookingApi.getBookingsByRoomId(roomId, token);
        return response;
    }

}