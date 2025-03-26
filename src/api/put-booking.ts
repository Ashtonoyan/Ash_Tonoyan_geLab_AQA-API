import {BookingRequest} from "../models/booking-request-model";
import {getRequest} from "../core/utils/api-utils";
import {APIResponse} from "@playwright/test";

const endpoint = 'api/booking';

export class PutBookingAPI {


    async updateBooking(bookingId: number, bookingToUpdate: BookingRequest, updatedData: Partial<BookingRequest>, token: string): Promise<APIResponse> {

        const updatedDatas = {
            ...bookingToUpdate,
            ...updatedData,
        };

        const response = await getRequest().put(`/${endpoint}/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
                'Content-Type': 'application/json',
            },
            data: updatedDatas,
        });

        if (!response.ok()) {
            throw new Error(`Failed to update booking! Status: ${response.status()}`);
        }

        return response;

    }
}