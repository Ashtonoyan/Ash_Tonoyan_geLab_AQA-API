import {test} from '../src/core/api-fixtures'
import {expect} from "@playwright/test";
import {AuthAPIHelper} from "../src/helpers/auth-helper";
import {PostBookingAPIHelper} from "../src/helpers/post-booking-helper";
import {BookingFactory} from "../src/factories/booking-factory";
import {GetBookingAPIHelper} from "../src/helpers/get-booking-helper";
import {PutBookingAPIHelper} from "../src/helpers/put-booking-helper";
import {DeleteBookingAPIHelper} from "../src/helpers/delete-booking-helper";
import {faker} from '@faker-js/faker'
import {setRequest} from "../src/core/utils/api-utils";
import {SoftAssert} from "../src/helpers/soft-assert";

let token: string;
const roomNumber = faker.number.int({min: 3, max: 2000});

test.describe('API', () => {
    test.beforeAll('Authenfication', async ({request}) => {
        await setRequest(request);

        token = await AuthAPIHelper.authenticate()
    })

    test('Post Booking', async () => {
        const softAssert = new SoftAssert();
        const bookingData = BookingFactory.validPostBooking(roomNumber);
        const bookingResponse = await PostBookingAPIHelper.createBooking(bookingData);


        softAssert.assert(
            bookingResponse.status() === 200,
            `Expected status to be 200, but got ${bookingResponse.status()}`
        );

        softAssert.assert(
            bookingResponse.headers()['content-type']?.includes('application/json'),
            `Expected 'Content-Type' header to contain 'application/json', but got '${bookingResponse.headers()['content-type']}'`
        );

        softAssert.check();
        ;

    })


    test('Get Bookings', async () => {
        const softAssert = new SoftAssert();
        const response = await GetBookingAPIHelper.getBooking(roomNumber, token)

        softAssert.assert(
            response.status() === 200,
            `Expected status to be 200, but got ${response.status()}`
        );

        softAssert.assert(
            response.headers()['content-type']?.includes('application/json'),
            `Expected 'Content-Type' header to contain 'application/json', but got '${response.headers()['content-type']}'`
        );

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookings');
        expect(Array.isArray(responseBody.bookings)).toBe(true);
        expect(responseBody.bookings.length).toBeGreaterThan(0);

        const firstBooking = responseBody.bookings[0];
        softAssert.assert(
            firstBooking.hasOwnProperty('bookingid'),
            `Property 'bookingid' is missing in the firstBooking object`
        );

        softAssert.assert(
            firstBooking.hasOwnProperty('roomid'),
            `Property 'roomid' is missing in the firstBooking object`
        );

        softAssert.assert(
            firstBooking.hasOwnProperty('firstname'),
            `Property 'firstname' is missing in the firstBooking object`
        );

        softAssert.assert(
            firstBooking.hasOwnProperty('lastname'),
            `Property 'lastname' is missing in the firstBooking object`
        );

        softAssert.assert(
            firstBooking.hasOwnProperty('depositpaid'),
            `Property 'depositpaid' is missing in the firstBooking object`
        );

        softAssert.assert(
            firstBooking.hasOwnProperty('bookingdates'),
            `Property 'bookingdates' is missing in the firstBooking object`
        );

        softAssert.assert(
            firstBooking.bookingdates.hasOwnProperty('checkin'),
            `Property 'checkin' is missing in bookingdates`
        );

        softAssert.assert(
            firstBooking.bookingdates.hasOwnProperty('checkout'),
            `Property 'checkout' is missing in bookingdates`
        );

        softAssert.check();

    })

    test('Put Bookings', async () => {
        const softAssert = new SoftAssert();
        const bookings = await GetBookingAPIHelper.getBooking(roomNumber, token)
        const responseBody = await bookings.json();

        const bookingToUpdate = responseBody.bookings[0]

        const bookingData = BookingFactory.updateBooking();

        const response = await PutBookingAPIHelper.updateBooking(bookingToUpdate.bookingid, bookingToUpdate, bookingData, token);

        softAssert.assert(
            response.status() === 200,
            `Expected response status to be 200, but got ${response.status()}`
        );

        softAssert.assert(
            response.headers()['content-type']?.includes('application/json'),
            `Expected 'Content-Type' header to contain 'application/json', but got '${response.headers()['content-type']}'`
        );

        const responseJson = await response.json();
        softAssert.assert(
            responseJson.hasOwnProperty('success') && responseJson.success === true,
            `Expected 'success' property to be true, but got ${responseJson.success}`
        );

        softAssert.check();

    })

    test('Delete Bookings', async () => {
        const softAssert = new SoftAssert();
        const bookings = await GetBookingAPIHelper.getBooking(roomNumber, token)
        const responseBody = await bookings.json();

        const response = await DeleteBookingAPIHelper.deleteBooking(responseBody.bookings[0].bookingid, token)

        softAssert.assert(
            response.status() === 200,
            `Expected response status to be 200, but got ${response.status()}`
        );

        softAssert.assert(
            response.headers()['content-type']?.includes('application/json'),
            `Expected 'Content-Type' header to contain 'application/json', but got '${response.headers()['content-type']}'`
        );

        const responseJson = await response.json();
        softAssert.assert(
            responseJson.hasOwnProperty('success') && responseJson.success === true,
            `Expected 'success' property to be true, but got ${responseJson.success}`
        );

        softAssert.check();
    })

})




