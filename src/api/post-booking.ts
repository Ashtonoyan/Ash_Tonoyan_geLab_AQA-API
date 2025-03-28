import {BookingRequest} from "../models/booking-request-model";
import {getRequest} from "../core/utils/api-utils";
import {APIResponse} from "@playwright/test";
import {test} from "../core/api-fixtures";

const endpoint = 'api/booking';

export class PostBooking {


    static async createBooking(bookingData: BookingRequest): Promise<APIResponse> {
        return await test.step(`POST ${endpoint}`, async ()=>{
            const response = await getRequest().post(`/${endpoint}`, {
                headers: {'Content-Type': 'application/json'},
                data: bookingData
            })

            if (!response.ok()) {
                throw new Error(`Failed to create booking! Status: ${response.status()}`);
            }

            return response;
        })

    }
}