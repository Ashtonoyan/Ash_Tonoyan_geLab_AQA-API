import {BookingRequest} from "../models/booking-request-model";
import {getRequest} from "../core/utils/api-utils";

const endpoint = 'api/booking';

export class PutBookingAPI{


    async updateBooking(bookingId: number, bookingToUpdate: BookingRequest,updatedData: Partial<BookingRequest>, token: string): Promise<any> {

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

        const updatedBooking = await response.json();

        return updatedBooking;

    }
}