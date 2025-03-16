import {APIRequestContext} from "@playwright/test";
import {BookingRequest} from "../models/booking-request-model";
import {BookingResponse} from "../models/booking-response-model";

export class BookingApi{
    private request: APIRequestContext;
    private token: string | null = null;

    constructor(request: APIRequestContext){
        this.request = request;
    }

    async authenticate(username: string, password: string){
        const response = await this.request.post('/auth', {
            data: { username, password }
        });

        if (response.status() !== 200) {
            throw new Error(`Authentication failed! Status: ${response.status()}`);
        }

        const body = await response.json();
        this.token = body.token;
    }

    async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
        const response = await this.request.post('/booking', { data: bookingData });

        if (response.status() !== 200) {
            throw new Error(`Failed to create booking! Status: ${response.status()}`);
        }

        return await response.json();
    }

    async getBooking(bookingId: number): Promise<BookingRequest> {
        const response = await this.request.get(`/booking/${bookingId}`);

        if (response.status() !== 200) {
            throw new Error(`Booking not found! Status: ${response.status()}`);
        }

        return await response.json();

    }

    async updateBooking(bookingId: number, updatedData: BookingRequest): Promise<BookingRequest> {
        if (!this.token) {
            throw new Error('Authorization token is required for updating bookings.');
        }

        const response = await this.request.put(`/booking/${bookingId}`, {
            data: updatedData,
            headers: { 'Cookie': `token=${this.token}` }
        });

        if (response.status() !== 200) {
            throw new Error(`Failed to update booking! Status: ${response.status()}`);
        }

        return await response.json();
    }

    async deleteBooking(bookingId: number): Promise<void> {
        if (!this.token) {
            throw new Error('Authorization token is required for deleting bookings.');
        }

        const response = await this.request.delete(`/booking/${bookingId}`, {
            headers: { 'Cookie': `token=${this.token}` }
        });

        if (response.status() !== 201) {
            throw new Error(`Failed to delete booking! Status: ${response.status()}`);
        }
    }


}