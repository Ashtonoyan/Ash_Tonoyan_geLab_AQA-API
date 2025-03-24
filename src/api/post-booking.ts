import {APIRequestContext} from '@playwright/test';
import {BookingRequest} from "../models/booking-request-model";
import { APIResponse } from '@playwright/test';

const endpoint = 'api/booking';

export class PostBooking {
    private request: APIRequestContext;
    private baseUrl: string = process.env.BASE_URL!;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createBooking(bookingData: Partial<BookingRequest>): Promise<APIResponse> {
        const response = await this.request.post(`${this.baseUrl}/${endpoint}`, {
            headers: {'Content-Type': 'application/json'},
            data: bookingData
        })

        if (!response.ok()) {
            throw new Error(`Failed to create booking! Status: ${response.status()}`);
        }

        return response;
    }
}