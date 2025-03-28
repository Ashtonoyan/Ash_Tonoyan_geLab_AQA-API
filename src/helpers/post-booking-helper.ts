import {APIResponse} from '@playwright/test';
import {BookingRequest} from "../models/booking-request-model";
import {PostBooking} from "../api/post-booking";
import {test} from "../core/api-fixtures";

export class PostBookingAPIHelper {


    static async createBooking(bookingData: BookingRequest): Promise<APIResponse> {
        return await test.step('POST booking', async()=>{
            const response = await PostBooking.createBooking(bookingData);
            return response;
        })

    }

}