import {DeleteBookingAPI} from "../api/delete-booking";
import {APIResponse} from "@playwright/test";

export class DeleteBookingHelper {
    private bookingApi: DeleteBookingAPI;

    constructor(bookingApi: DeleteBookingAPI) {
        this.bookingApi = bookingApi;
    }

    async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
        const response = await this.bookingApi.deleteBooking(bookingId, token);
        return response;
    }

}