import { API_ENDPOINT } from "./config";

export async function loadRequest(id) {
    const response = await fetch(API_ENDPOINT + '/orderrequest/' + id);
    return await response.json();
}