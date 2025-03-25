import {DeleteBookingAPI} from "../api/delete-booking";

export class DeleteBookingHelper {
    private bookingApi: DeleteBookingAPI;

    constructor(bookingApi: DeleteBookingAPI) {
        this.bookingApi = bookingApi;
    }

    async deleteBooking(bookingId: number, token: string): Promise<void> {
        const response = await this.bookingApi.deleteBooking(bookingId, token);
        return response;
    }

}