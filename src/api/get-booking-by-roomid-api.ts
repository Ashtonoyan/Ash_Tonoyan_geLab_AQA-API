import {APIRequestContext, APIResponse} from '@playwright/test';
import {BookingResponse} from "../models/booking-response-model";

const endpoint = 'api/booking';

export class GetBookingAPI {
    private request: APIRequestContext;
    private baseUrl: string = process.env.BASE_URL!;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getBookingByRoomId(roomId: number, token: string): Promise<APIResponse> {
        const response = await this.request.get(`${this.baseUrl}/${endpoint}`, {
            params: {
                roomid: roomId.toString(),
            },
            headers: {
                'Cookie': `token=${token}`
            }
        });

        if (!response.ok()) {
            throw new Error(`Failed to fetch bookings! Status: ${response.status()} ${response.statusText()}`);
        }

        return response;
    }
}