import {BookingRequest} from "../models/booking-request-model";
import {getRequest} from "../core/utils/api-utils";
import {APIResponse} from "@playwright/test";

export class PostBooking {


    async createBooking(bookingData: BookingRequest): Promise<APIResponse> {
        const response = await getRequest().post(`/api/booking`, {
            headers: {'Content-Type': 'application/json'},
            data: bookingData
        })

        if (!response.ok()) {
            throw new Error(`Failed to create booking! Status: ${response.status()}`);
        }

        return response;
    }
}