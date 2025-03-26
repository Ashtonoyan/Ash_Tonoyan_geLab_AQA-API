import {test} from '../src/core/api-fixtures'
import {expect} from "@playwright/test";
import {AuthHelper} from "../src/helpers/auth-helper";
import {AuthAPI} from "../src/api/auth-api";
import {PostBooking} from "../src/api/post-booking";
import {PostBookingHelper} from "../src/helpers/post-booking-helper";
import {BookingFactory} from "../src/factories/booking-factory";
import {GetBookingByRoomIDAPI} from "../src/api/get-bookingByRoomID";
import {GetBookingHelper} from "../src/helpers/get-booking-helper";
import {PutBookingAPI} from "../src/api/put-booking";
import {PutBookingHelper} from "../src/helpers/put-booking-helper";
import {DeleteBookingAPI} from "../src/api/delete-booking";
import {DeleteBookingHelper} from "../src/helpers/delete-booking-helper";
import {faker} from '@faker-js/faker'
import {setRequest} from "../src/core/utils/api-utils";

let token: string;
const roomNumber = faker.number.int({min: 3, max: 2000});

test.describe('API', () => {
    test.beforeAll('Authenfication', async ({request}) => {
        await setRequest(request);

        token = AuthAPI.getToken()!;

        if (!token) {
            const authAPI = new AuthAPI()
            const authHelper = new AuthHelper(authAPI)
            const authResponse = await authHelper.authenticate();
            token = authResponse.token;
        }
    })

    test('Post Booking', async () => {
        const bookingApi = new PostBooking();
        const bookingHelper = new PostBookingHelper(bookingApi);

        const bookingData = BookingFactory.correctPostBooking(roomNumber);
        const bookingResponse = await bookingHelper.createBooking(bookingData);

        await expect(bookingResponse.status()).toBe(200);

        await expect(bookingResponse.headers()['content-type']).toContain('application/json');

    })


    test('Get Bookings', async () => {

        const getBooking = new GetBookingByRoomIDAPI()
        const getBookingHelper = new GetBookingHelper(getBooking);
        const response = await getBookingHelper.getBooking(roomNumber, token)

        expect(response.status()).toBe(200);

        expect(response.headers()['content-type']).toContain('application/json');

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookings');
        expect(Array.isArray(responseBody.bookings)).toBe(true);
        expect(responseBody.bookings.length).toBeGreaterThan(0);

        const firstBooking = responseBody.bookings[0];
        expect(firstBooking).toHaveProperty('bookingid');
        expect(firstBooking).toHaveProperty('roomid');
        expect(firstBooking).toHaveProperty('firstname');
        expect(firstBooking).toHaveProperty('lastname');
        expect(firstBooking).toHaveProperty('depositpaid');
        expect(firstBooking).toHaveProperty('bookingdates');
        expect(firstBooking.bookingdates).toHaveProperty('checkin');
        expect(firstBooking.bookingdates).toHaveProperty('checkout');

    })

    test('Put Bookings', async () => {

        const getBooking = new GetBookingByRoomIDAPI()
        const getBookingHelper = new GetBookingHelper(getBooking);
        const bookings = await getBookingHelper.getBooking(roomNumber, token)
        const responseBody = await bookings.json();

        const bookingToUpdate = responseBody.bookings[0]

        const putBooking = new PutBookingAPI()
        const putBookingHelper = new PutBookingHelper(putBooking);
        const bookingData = BookingFactory.updateBooking();

        const response = await putBookingHelper.updateBooking(bookingToUpdate.bookingid, bookingToUpdate, bookingData, token);

        expect(response.status()).toBe(200);

        expect(response.headers()['content-type']).toContain('application/json');

        const responseJson = await response.json();
        expect(responseJson).toHaveProperty('success', true);

    })

    test('Delete Bookings', async () => {
        const getBooking = new GetBookingByRoomIDAPI()
        const getBookingHelper = new GetBookingHelper(getBooking);
        const bookings = await getBookingHelper.getBooking(roomNumber, token)
        const responseBody = await bookings.json();


        const deleteBooking = new DeleteBookingAPI()
        const deleteHelper = new DeleteBookingHelper(deleteBooking)
        const response = await deleteHelper.deleteBooking(responseBody.bookings[0].bookingid, token)

        expect(response.status()).toBe(200);

        expect(response.headers()['content-type']).toContain('application/json');

        const responseJson = await response.json();
        expect(responseJson).toHaveProperty('success', true);
    })

})




