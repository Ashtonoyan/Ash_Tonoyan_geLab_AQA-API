import {APIRequestContext} from "@playwright/test";
import {BookingRequest} from "../models/booking-request-model";
import {BookingResponse} from "../models/booking-response-model";
import { request } from 'playwright';


export class BookingAPI{
    private request!: APIRequestContext;
    private token: string | null = null;
    private baseUrl: string;


    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
    }

    async init() {
        this.request = await request.newContext();
    }

    async authenticate(username: string, password: string){
        await this.init()
        const response = await this.request.post(`${this.baseUrl}/api/auth/login`, {
            data: { username, password }
        });

        if (response.status() !== 200) {
            throw new Error(`Authentication failed! Status: ${response.status()}`);
        }

        const body = await response.json();
        this.token = body.token;
        console.log(this.token);


    }

    async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
        await this.init()
        if (!this.request) {
            throw new Error("Request context is not initialized. Call init() first.");
        }

        const response = await this.request.post(`${this.baseUrl}/api/booking`, {
            headers: { 'Content-Type': 'application/json' },
            data: bookingData
        });

        if (!response.ok()) {
            throw new Error(`Failed to create booking! Status: ${response.status()}`);
        }

        const responseData = await response.json();
        console.log("Reservation successfully created:", responseData);
        return responseData;



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