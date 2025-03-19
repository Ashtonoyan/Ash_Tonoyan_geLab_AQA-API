import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { BookingAPI } from '../src/api/booking-api';
import { BookingRequest } from '../src/models/booking-request-model';
import { BookingResponse } from '../src/models/booking-response-model';

// Тестирование класса BookingAPI
test('Should authenticate and get token', async ({ request }) => {
  const baseUrl = 'https://automationintesting.online/api';
  const apiTest = new BookingAPI(request, baseUrl);
  await apiTest.authenticate('admin', 'password');

  const bookingData = {
    roomid: 1,
    firstname: "John",
    lastname: "Doe",
    depositpaid: false,
    dates: {
      checkin: "2025-03-15",
      checkout: "2025-03-20"
    },
    email: 'john@doe.com',
    phone: '1234567891011',
  };

  const bookingResponse = await apiTest.createBooking(bookingData);

  expect(bookingResponse.bookingid).toBeDefined()

});
