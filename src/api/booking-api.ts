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


    }

    getToken(): string {
        if (!this.token) {
            throw new Error("Token not received. Please execute authenticate() before calling other methods.");
        }
        return this.token;
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

    async getBookingsByRoomId(roomId: number, token: string): Promise<any> {
        await this.init()
        if (!this.request) {
            throw new Error("Request context is not initialized. Call init() first.");
        }

        const response = await this.request.get(`${this.baseUrl}/api/booking`, {
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

        const responseData = await response.json();
        console.log("Bookings found:", responseData);
        return responseData;
    }


    async updateBooking(bookingId: number, updatedData: Partial<BookingRequest>, roomId: number, token: string): Promise<BookingResponse> {
        await this.init();
        if (!this.request) {
            throw new Error("Request context is not initialized. Call init() first.");
        }

        const currentBooking = await this.getBookingsByRoomId(roomId, token);

        console.log("Current booking details:", currentBooking); // Логируем текущие данные бронирования

        if (!currentBooking || currentBooking.length === 0) {
            throw new Error("Booking not found for update.");
        }

        const bookingToUpdate = currentBooking.bookings[0]; // Используем первое найденное бронирование

        const updatedDatas = {
            ...bookingToUpdate,
            ...updatedData,
        };
        console.log("bookingToUpdate", bookingToUpdate,);

        console.log("Updated booking:", updatedDatas);

        const response = await this.request.put(`${this.baseUrl}/api/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
                'Content-Type': 'application/json',
            },
            data: updatedDatas,
        });

        if (!response.ok()) {
            throw new Error(`Failed to update booking! Status: ${response.status()}`);
        }

        const updatedBooking = await response.json();
        console.log("Updated booking details:", updatedBooking); // Логируем обновленные данные

        return updatedBooking;

    }

    async deleteBooking(bookingId: number, token: string): Promise<void> {
        await this.init()
        const response = await this.request.delete(`${this.baseUrl}/api/booking/${bookingId}`, {
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