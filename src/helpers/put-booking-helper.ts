import {BookingRequest} from "../models/booking-request-model";
import {APIResponse} from "@playwright/test";
import {PutBookingAPI} from "../api/put-booking";

export class PutBookingHelper {
    private bookingApi: PutBookingAPI;

    constructor(bookingApi: PutBookingAPI) {
        this.bookingApi = bookingApi;
    }

    async updateBooking(bookingId: number, bookingToUpdate: BookingRequest, updatedData: Partial<BookingRequest>, token: string): Promise<APIResponse> {
        const response = await this.bookingApi.updateBooking(bookingId, bookingToUpdate, updatedData, token);
        return response;
    }
}