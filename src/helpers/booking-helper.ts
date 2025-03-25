import { APIRequestContext } from '@playwright/test';
import {BookingRequest} from "../models/booking-request-model";
import {BookingResponse} from "../models/booking-response-model";
import {PostBooking} from "../api/post-booking";

export class BookingHelper {
    private bookingApi: PostBooking;

    constructor(bookingApi: PostBooking) {
        this.bookingApi = bookingApi;
    }

    async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
        const response = await this.bookingApi.createBooking(bookingData);
        return response;
    }

    async getBooking(roomId: number, token: string): Promise<any> {

    }
}