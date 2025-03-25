import {getRequest} from "../core/utils/api-utils";

const endpoint = 'api/booking';

export class DeleteBookingAPI {


    async deleteBooking(bookingId: number, token: string): Promise<void> {
        const response = await getRequest().delete(`/${endpoint}/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
            }
        });

        if (!response.ok()) {
            throw new Error(`Failed to delete booking! Status: ${response.status()}`);
        }

        console.log('Booking deleted successfully');
    }
}