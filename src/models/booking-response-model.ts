import {BookingRequest} from "./booking-request-model";

export interface BookingResponse {
    bookingid: number;
    booking: BookingRequest;
}