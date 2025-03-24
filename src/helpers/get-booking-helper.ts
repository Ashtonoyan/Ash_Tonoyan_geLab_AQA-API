import {BookingRequest} from "../models/booking-request-model";
import {BookingResponse} from "../models/booking-response-model";
import {GetBookingAPI} from "../api/get-booking-by-roomid-api";
import {PostBooking} from "../api/post-booking";

export class GetBookingHelper {
    private bookingApi: GetBookingAPI;

    constructor(bookingApi: GetBookingAPI) {
        this.bookingApi = bookingApi;
    }
    async getBookingsByRoomId(roomId: number, token: string) :Promise<any> {
        const bookings = await this.bookingApi.getBookingByRoomId(roomId, token); // Вызов API метода
        return bookings;
    }}
