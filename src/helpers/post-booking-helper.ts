import {APIResponse} from '@playwright/test';
import {BookingRequest} from "../models/booking-request-model";
import {PostBooking} from "../api/post-booking";

export class PostBookingHelper {
    private bookingApi: PostBooking;

    constructor(bookingApi: PostBooking) {
        this.bookingApi = bookingApi;
    }

    async createBooking(bookingData: BookingRequest): Promise<APIResponse> {
        const response = await this.bookingApi.createBooking(bookingData);
        return response;
    }

}