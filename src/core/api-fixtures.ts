import {test as base} from "@playwright/test";
import {setRequest} from "./utils/api-utils";

export type BookingAPI = {
    testHooks: string
}

export const test = base.extend<BookingAPI>({
    testHooks: [async ({ request }, use) => {
        await setRequest(request);
        await use('');
    }, { auto: true }
    ]
});