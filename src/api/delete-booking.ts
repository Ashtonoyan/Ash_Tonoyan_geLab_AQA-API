import { APIRequestContext } from '@playwright/test';

const endpoint = 'api/booking';

export class DeleteBookingAPI {
    private request: APIRequestContext;
    private baseUrl:  string = process.env.BASE_URL!;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async deleteBooking(bookingId: number, token: string): Promise<void> {
        const response = await this.request.delete(`${this.baseUrl}/${endpoint}/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,  // Использование токена в cookies
            }
        });

        if (!response.ok()) {  // Проверяем успешность ответа
            throw new Error(`Failed to delete booking! Status: ${response.status()}`);
        }

        console.log('Booking deleted successfully');
    }

}