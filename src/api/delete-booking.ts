import {getRequest} from "../core/utils/api-utils";
import {APIResponse} from "@playwright/test";
import {test} from "../core/api-fixtures";

const endpoint = 'api/booking';

export class DeleteBookingAPI {


    static async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
        return await test.step(`Delete ${endpoint} id=${bookingId}`, async ()=>{
            const response = await getRequest().delete(`/${endpoint}/${bookingId}`, {
                headers: {
                    'Cookie': `token=${token}`,
                }
            });

            if (!response.ok()) {
                throw new Error(`Failed to delete booking! Status: ${response.status()}`);
            }

            return response;
        })

    }
}