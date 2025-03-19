import {APIRequestContext} from "@playwright/test";
import {BookingRequest} from "../models/booking-request-model";
import {BookingResponse} from "../models/booking-response-model";

export class BookingAPI{
    private request: APIRequestContext;
    private token: string | null = null;
    private baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string){
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async authenticate(username: string, password: string){
        const response = await this.request.post(`${this.baseUrl}/auth/login`, {
            data: { username, password }
        });

        if (response.status() !== 200) {
            throw new Error(`Authentication failed! Status: ${response.status()}`);
        }

        const body = await response.json();
        this.token = body.token;

    }

    async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
        if (!this.token) {
            throw new Error('Authentication required! Call authenticate() first.');
        }
        const response = await this.request.post(`${this.baseUrl}/booking`, {
            headers: {
                Cookie: `token=${this.token}`
            },
            data: bookingData });

        if (response.status() !== 200) {
            if (response.status() !== 200) {
                const responseBody = await response.json();
                console.error('Response Body:', responseBody);
                throw new Error(`Failed to create booking! Status: ${response.status()}`);
            }
        }

        return await response.json();
    }

    async getBooking(bookingId: number): Promise<BookingRequest> {
        const response = await this.request.get(`${this.baseUrl}/booking/${bookingId}`);

        if (response.status() !== 200) {
            throw new Error(`Booking not found! Status: ${response.status()}`);
        }

        return await response.json();

    }

    async updateBooking(bookingId: number, updatedData: BookingRequest): Promise<BookingRequest> {
        if (!this.token) {
            throw new Error('Authorization token is required for updating bookings.');
        }

        const response = await this.request.put(`${this.baseUrl}/booking/${bookingId}`, {
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

        const response = await this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
            headers: { 'Cookie': `token=${this.token}` }
        });

        if (response.status() !== 201) {
            throw new Error(`Failed to delete booking! Status: ${response.status()}`);
        }
    }


}