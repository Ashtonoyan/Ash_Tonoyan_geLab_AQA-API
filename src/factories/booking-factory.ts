import { faker } from '@faker-js/faker';
import {BookingRequest} from "../models/booking-request-model";

const getDatesForBooking = () => {
    const currentDate = new Date(); // Текущая дата
    const checkinDate = new Date(currentDate);
    checkinDate.setDate(currentDate.getDate() + 2);

    const checkoutDate = new Date(checkinDate);
    checkoutDate.setDate(checkinDate.getDate() + 5);

    const checkin = checkinDate.toISOString().split('T')[0];
    const checkout = checkoutDate.toISOString().split('T')[0];

    return { checkin, checkout };
};

export class BookingFactory{
    static createBooking(room: number): BookingRequest{
        return{
            roomid: room,
            firstname: "Cristiano",
            lastname: "Ronaldo",
            depositpaid: false,
            bookingdates: getDatesForBooking(),
            email: "cristiano@gmail.com",
            phone: "1234567891011"
        }

    }

    static updateBooking(): Partial<BookingRequest>{
        return{
            firstname: "Leo",
            lastname: "Messi",
        }
    }
}