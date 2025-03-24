import {BookingRequest} from "../models/booking-request-model";
import {BookingResponse} from "../models/booking-response-model";
import {PostBooking} from "../api/post-booking";
import {APIResponse} from "@playwright/test";

export class PostBookingHelper {
    private bookingApi: PostBooking;

    constructor(bookingApi: PostBooking) {
        this.bookingApi = bookingApi;
    }

    async createBooking(bookingData: Partial<BookingRequest>): Promise<APIResponse> {
        const response = await this.bookingApi.createBooking(bookingData);
        return response;
    }
}