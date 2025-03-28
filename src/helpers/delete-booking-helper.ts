import {DeleteBookingAPI} from "../api/delete-booking";
import {APIResponse} from "@playwright/test";
import {test} from "../core/api-fixtures";

export class DeleteBookingAPIHelper {

    static async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
        return await test.step(`deleteBooking with bookingid ${bookingId}`, async ()=> {
            const response = await DeleteBookingAPI.deleteBooking(bookingId, token)
            return response;
        })

    }

}