import { APIRequestContext } from '@playwright/test';
import {BookingRequest} from "../models/booking-request-model";
import {BookingResponse} from "../models/booking-response-model";
import {PostBooking} from "../api/post-booking";
import {GetBookingByRoomIDAPI} from "../api/get-bookingByRoomID";

export class GetBookingHelper {
    private bookingApi: GetBookingByRoomIDAPI;

    constructor(bookingApi: GetBookingByRoomIDAPI) {
        this.bookingApi = bookingApi;
    }

    async getBooking(roomId: number, token: string): Promise<any> {
        const response = await this.bookingApi.getBookingsByRoomId(roomId, token);
        return response;
    }

    async waitForBooking(roomId: number, token: string, maxRetries = 10, delay = 3000) {
        let retries = 0;
        let bookings;

        while (retries < maxRetries) {
            bookings = await this.getBooking(roomId, token);

            if (bookings && bookings.bookings.length > 0) {
                return bookings;
            }

            retries++;
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        throw new Error(`Booking for roomId=${roomId} was not found after ${maxRetries} attempts`);
    }
}