import { API_ENDPOINT } from "./config";

export async function loadRequest(id) {
    const response = await fetch(API_ENDPOINT + '/orderrequest/' + id);
    return await response.json();
}

export async function currentRequest() {
    const response = await fetch(API_ENDPOINT + '/orderrequest');
    return await response.json();
}

export async function allRequests() {
    const response = await fetch(API_ENDPOINT + '/orderrequests');
    return await response.json();
}

