import {APIRequestContext} from "@playwright/test";

let request: APIRequestContext;

export const setRequest = async (requestInstance: APIRequestContext) => {
    request = requestInstance;
}

export const getRequest = (): APIRequestContext => {
    if (!request) {
        throw new Error('Request context is not initialized');
    }
    return request;
};
