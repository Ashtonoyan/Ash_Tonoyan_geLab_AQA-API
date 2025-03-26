import {getRequest} from "../core/utils/api-utils";
import {APIResponse} from "@playwright/test";

const endpoint = 'api/booking';

export class DeleteBookingAPI {


    async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
        const response = await getRequest().delete(`/${endpoint}/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
            }
        });

        if (!response.ok()) {
            throw new Error(`Failed to delete booking! Status: ${response.status()}`);
        }

        return response;
    }
}