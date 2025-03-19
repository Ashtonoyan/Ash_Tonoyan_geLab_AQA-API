import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { BookingAPI } from '../src/api/booking-api';
import { BookingRequest } from '../src/models/booking-request-model';
import { BookingResponse } from '../src/models/booking-response-model';
import { request } from '@playwright/test';


// Тестирование класса BookingAPI
test('Should authenticate and get token', async ({ request }) => {

  const baseUrl = 'https://automationintesting.online/';
  const apiTest = new BookingAPI(baseUrl);
  await apiTest.authenticate('admin', 'password');




  const bookingData = {
    roomid: 41,
    firstname: "Cristiano",
    lastname: "Ronaldo",
    depositpaid: false,
    bookingdates: {
      checkin: "2025-03-20",
      checkout: "2025-03-25"
    },
    email: "cristiano@gmail.com",
    phone: "1234567891011"
  };

  const booking = await apiTest.createBooking(bookingData);
  console.log("ID of the created booking:", booking.bookingid);








});
