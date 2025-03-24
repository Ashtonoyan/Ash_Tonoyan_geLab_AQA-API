import {test, expect} from '@playwright/test';
import {AuthHelper} from "../src/helpers/auth-helper";
import {AuthAPI} from "../src/api/auth-api";
import {PostBooking} from "../src/api/post-booking";
import {PostBookingHelper} from "../src/helpers/post-booking-helper";
import {BookingFactory} from "../src/factories/booking-factory";
import {GetBookingAPI} from "../src/api/get-booking-by-roomid-api";
import {GetBookingHelper} from "../src/helpers/get-booking-helper";
import {PutBookingAPI} from "../src/api/put-booking";
import {PutBookingHelper} from "../src/helpers/put-booking-helper";
import {DeleteBookingAPI} from "../src/api/delete-booking";
import {DeleteBookingHelper} from "../src/helpers/delete-booking";
import {faker} from "@faker-js/faker";

let token: string;
let roomNumber = faker.number.int({min: 1, max: 2000});
let bookings: any

test.describe('Work with API', () => {

    test.beforeAll('Authenfication', async ({request}) => {
        const authAPI = new AuthAPI(request)
        const authHelper = new AuthHelper(authAPI)
        const authResponse = await authHelper.authenticate();
        token = await authResponse.token;
    })

    test('Post booking', async ({request}) => {
        const bookingApi = new PostBooking(request);
        const postHelper = new PostBookingHelper(bookingApi);

        const bookingData = BookingFactory.createBooking(roomNumber);
        const response = await postHelper.createBooking(bookingData);

        expect(response.status()).toBe(200);

    })

    test.fail('Create booking with missing required fields', async ({request}) => {
        const incompleteBooking = {
            firstname: 'John',
        };

        const bookingApi = new PostBooking(request);
        const postHelper = new PostBookingHelper(bookingApi);

        const response = await postHelper.createBooking(incompleteBooking);

        expect(response.status()).toBe(400);
        expect(response.body()).toContain('Validation failed'); // Проверка сообщения об ошибке
    });

    test('Get booking', async ({request}) => {
        const getBooking = new GetBookingAPI(request)
        const getHelper = new GetBookingHelper(getBooking)
        bookings = await getHelper.getBookingsByRoomId(roomNumber, token)

    })


    test('Put booking', async ({request}) => {
        const getBooking = new GetBookingAPI(request)
        const getHelper = new GetBookingHelper(getBooking)
        bookings = await getHelper.getBookingsByRoomId(roomNumber, token)

        const putBooking = new PutBookingAPI(request)
        const putHelper = new PutBookingHelper(putBooking)

        const updateData = BookingFactory.updateBooking()
        await putHelper.updateBooking(bookings.bookings[0].bookingid, updateData, bookings.bookings[0].roomid, token);
    })

    test('Delete booking', async ({request}) => {
        const deleteBooking = new DeleteBookingAPI(request)
        const deleteHelper = new DeleteBookingHelper(deleteBooking)
        await deleteHelper.deleteBooking(bookings.bookings[0].bookingid, token)
    })

})



