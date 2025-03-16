import {BookingDates} from "./booking-dates-model";

export interface BookingRequest {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    dates: BookingDates;
}