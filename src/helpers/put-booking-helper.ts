import {BookingRequest} from "../models/booking-request-model";
import {APIResponse} from "@playwright/test";
import {PutBookingAPI} from "../api/put-booking";
import {test} from "../core/api-fixtures";

export class PutBookingAPIHelper {

    static async updateBooking(bookingId: number, bookingToUpdate: BookingRequest, updatedData: Partial<BookingRequest>, token: string): Promise<APIResponse> {
        return await test.step(`PUT booking with bookingid ${bookingId}`, async()=>{
            const response = await PutBookingAPI.updateBooking(bookingId, bookingToUpdate, updatedData, token);
            return response;
        })

    }
}