import {BookingDates} from "./booking-dates-model";

export interface BookingRequest {
    roomid: number;
    firstname: string;
    lastname: string;
    depositpaid: boolean;
    bookingdates: BookingDates;
    email: string;
    phone: string;
}