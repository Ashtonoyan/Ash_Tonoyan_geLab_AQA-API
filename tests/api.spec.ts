import {test} from '../src/core/api-fixtures'
import {AuthHelper} from "../src/helpers/auth-helper";
import {AuthAPI} from "../src/api/auth-api";
import {PostBooking} from "../src/api/post-booking";
import {BookingHelper} from "../src/helpers/booking-helper";
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
    const bookingHelper = new BookingHelper(bookingApi);

    const bookingData = BookingFactory.createBooking(roomNumber);
    const bookingResponse = await bookingHelper.createBooking(bookingData);

  })


  test('Get Bookings', async () => {

    const getBooking = new GetBookingByRoomIDAPI()
    const getBookingHelper = new GetBookingHelper(getBooking);
    const bookings = await getBookingHelper.getBooking(roomNumber, token)

  })

  test('Put Bookings', async () => {

    const getBooking = new GetBookingByRoomIDAPI()
    const getBookingHelper = new GetBookingHelper(getBooking);
    const bookings = await getBookingHelper.getBooking(roomNumber, token)
    const bookingToUpdate = bookings.bookings[0]

    const putBooking = new PutBookingAPI()
    const putBookingHelper = new PutBookingHelper(putBooking);
    const bookingData = BookingFactory.updateBooking();

    const updateResponse = await putBookingHelper.updateBooking(bookingToUpdate.bookingid, bookingToUpdate, bookingData, token);

  })

  test('Delete Bookings', async () => {
    const getBooking = new GetBookingByRoomIDAPI()
    const getBookingHelper = new GetBookingHelper(getBooking);
    const bookings = await getBookingHelper.waitForBooking(roomNumber, token)

    const deleteBooking = new DeleteBookingAPI()
    const deleteHelper = new DeleteBookingHelper(deleteBooking)
    await deleteHelper.deleteBooking(bookings.bookings[0].bookingid, token)
  })

})




