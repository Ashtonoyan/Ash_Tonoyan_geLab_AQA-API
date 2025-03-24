import { faker } from '@faker-js/faker';
import {BookingRequest} from "../models/booking-request-model";

export class BookingFactory{
    static createBooking(room: number): BookingRequest{
        return{
            roomid: room,
            firstname: "Cristiano",
            lastname: "Ronaldo",
            depositpaid: true,
            bookingdates: {
                checkin: "2025-03-20",
                checkout: "2025-03-25"
            },
            email: "cristiano@gmail.com",
            phone: "1234567891011"
        }

    }

    static updateBooking(): Partial<BookingRequest>{
        return{
            firstname: "Leo",
            lastname: "Messi",
            depositpaid: false,
            bookingdates: {
                checkin: "2025-03-25",
                checkout: "2025-03-30"
            },
            email: "leomessi@gmail.com",
        }
    }
}