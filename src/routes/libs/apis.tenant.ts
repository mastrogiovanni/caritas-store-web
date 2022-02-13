import { API_ENDPOINT } from "./config";

export async function loadTenants() {
    const response = await fetch(API_ENDPOINT + '/tenant');
    return await response.json();
}

export async function loadTenant(id) {
    const response = await fetch(API_ENDPOINT + '/tenant/' + id);
    return await response.json();
}