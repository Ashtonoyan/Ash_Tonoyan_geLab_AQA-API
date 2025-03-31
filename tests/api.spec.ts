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

let token: string;
const roomNumber = faker.number.int({min: 3, max: 2000});

test.describe('API', () => {
    test.beforeAll('Authenfication', async ({request}) => {
        await setRequest(request);

        token = await AuthAPIHelper.authenticate()
    })

    test('Post Booking', async () => {
        const bookingData = BookingFactory.validPostBooking(roomNumber);
        const bookingResponse = await PostBookingAPIHelper.createBooking(bookingData);


        expect.soft(bookingResponse.status(), `Expected status to be 200, but got ${bookingResponse.status()}`).toBe(200);

        expect.soft(bookingResponse.headers()['content-type']?.includes('application/json'),
            `Expected 'Content-Type' header to contain 'application/json', but got '${bookingResponse.headers()['content-type']}'`)
            .toBe(true);


    })


    test('Get Bookings', async () => {
        const response = await GetBookingAPIHelper.getBooking(roomNumber, token)


        expect.soft(response.status(), `Expected status to be 200, but got ${response.status()}`).toBe(200);

        expect.soft(response.headers()['content-type']?.includes('application/json'),
            `Expected 'Content-Type' header to contain 'application/json', but got '${response.headers()['content-type']}'`)
            .toBe(true);

        const responseBody = await response.json();

        expect.soft(responseBody, 'Error: Property bookings is missing from response.').toHaveProperty('bookings');
        expect.soft(Array.isArray(responseBody.bookings), 'Error: "bookings" is not an array').toBe(true);
        expect.soft(responseBody.bookings.length, 'Error: array "bookings" is empty').toBeGreaterThan(0);

        const firstBooking = responseBody.bookings[0];

        expect.soft(firstBooking, 'Property \'bookingid\' is missing in the firstBooking object').toHaveProperty('bookingid');
        expect.soft(firstBooking, 'Property \'roomid\' is missing in the firstBooking object').toHaveProperty('roomid');
        expect.soft(firstBooking, 'Property \'firstname\' is missing in the firstBooking object').toHaveProperty('firstname');
        expect.soft(firstBooking, 'Property \'lastname\' is missing in the firstBooking object').toHaveProperty('lastname');
        expect.soft(firstBooking, 'Property \'depositpaid\' is missing in the firstBooking object').toHaveProperty('depositpaid');
        expect.soft(firstBooking, 'Property \'bookingdates\' is missing in the firstBooking object').toHaveProperty('bookingdates');
        expect.soft(firstBooking.bookingdates, 'Property \'checkin\' is missing in bookingdates').toHaveProperty('checkin');
        expect.soft(firstBooking.bookingdates, 'Property \'checkout\' is missing in bookingdates').toHaveProperty('checkout');


    })

    test('Put Bookings', async () => {
        const bookings = await GetBookingAPIHelper.getBooking(roomNumber, token)
        const responseBody = await bookings.json();

        const bookingToUpdate = responseBody.bookings[0]

        const bookingData = BookingFactory.updateBooking();

        const response = await PutBookingAPIHelper.updateBooking(bookingToUpdate.bookingid, bookingToUpdate, bookingData, token);


        expect.soft(response.status(), `Expected status to be 200, but got ${response.status()}`).toBe(200);

        expect.soft(response.headers()['content-type']?.includes('application/json'),
            `Expected 'Content-Type' header to contain 'application/json', but got '${response.headers()['content-type']}'`)
            .toBe(true);

        const responseJson = await response.json();

        expect.soft(responseJson, 'Expected "success" property to be true').toHaveProperty('success');
        expect.soft(responseJson.success, `Expected 'success' property to be true, but got ${responseJson.success}`).toBe(true);


    })

    test('Delete Bookings', async () => {
        const bookings = await GetBookingAPIHelper.getBooking(roomNumber, token)
        const responseBody = await bookings.json();

        const response = await DeleteBookingAPIHelper.deleteBooking(responseBody.bookings[0].bookingid, token)


        expect.soft(response.status(), `Expected status to be 200, but got ${response.status()}`).toBe(200);


        expect.soft(response.headers()['content-type']?.includes('application/json'),
            `Expected 'Content-Type' header to contain 'application/json', but got '${response.headers()['content-type']}'`)
            .toBe(true);

        const responseJson = await response.json();

        expect.soft(responseJson, 'Expected "success" property to be true').toHaveProperty('success');
        expect.soft(responseJson.success, `Expected 'success' property to be true, but got ${responseJson.success}`).toBe(true);

    })

})




