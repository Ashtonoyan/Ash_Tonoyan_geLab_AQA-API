import { APIRequestContext } from '@playwright/test';
import {BookingRequest} from "../models/booking-request-model";
import {GetBookingAPI} from "./get-booking-by-roomid-api";
import {GetBookingHelper} from "../helpers/get-booking-helper";

const endpoint = 'api/booking';

export class PutBookingAPI{
    private request: APIRequestContext;
    private baseUrl:  string = process.env.BASE_URL!;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async updateBooking(bookingId: number, updatedData: Partial<BookingRequest>, roomId: number, token: string): Promise<void> {
        const getBooking = new GetBookingAPI(this.request)
        const getHelper = new GetBookingHelper(getBooking)
        const currentBooking = await getHelper.getBookingsByRoomId(roomId, token);

        if (!currentBooking || currentBooking.length === 0) {
            throw new Error("Booking not found for update.");
        }

        const bookingToUpdate = currentBooking.bookings[0];

        const updatedDatas = {
            ...bookingToUpdate,
            ...updatedData,
        };

        const response = await this.request.put(`${this.baseUrl}/${endpoint}/${bookingId}`, {
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