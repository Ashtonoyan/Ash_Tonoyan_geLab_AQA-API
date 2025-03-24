import {BookingRequest} from "../models/booking-request-model";
import {BookingResponse} from "../models/booking-response-model";
import {PutBookingAPI} from "../api/put-booking";

export class PutBookingHelper {
    private bookingApi: PutBookingAPI

    constructor(bookingApi: PutBookingAPI) {
        this.bookingApi = bookingApi;
    }

    async updateBooking(bookingId: number, updatedData: Partial<BookingRequest>, roomId: number, token: string): Promise<void> {
        const response = await this.bookingApi.updateBooking(bookingId, updatedData, roomId, token);
        return response;
    }
}