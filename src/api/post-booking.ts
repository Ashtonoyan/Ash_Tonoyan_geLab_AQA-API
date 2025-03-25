import {APIRequestContext} from '@playwright/test';
import {BookingRequest} from "../models/booking-request-model";
import {BookingResponse} from "../models/booking-response-model";
import {getRequest} from "../core/utils/api-utils";

export class PostBooking {


    async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
        const response = await getRequest().post(`/api/booking`, {
            headers: {'Content-Type': 'application/json'},
            data: bookingData
        })

        if (!response.ok()) {
            throw new Error(`Failed to create booking! Status: ${response.status()}`);
        }

        return response.json();
    }
}