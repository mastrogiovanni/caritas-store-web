import { API_ENDPOINT } from "./config";

export async function orderForTenantAndRequest(idTenant, idRequest) {
    const response = await fetch(API_ENDPOINT + `/order/tenant/${idTenant}/request/${idRequest}`);
    return await response.json();
}

export async function upsertOrder(idTenant, idRequest, idProduct, quantity) {
    const response = await fetch(API_ENDPOINT + "/order", {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            idTenant, 
            idOrderRequest: idRequest, 
            idProduct, 
            quantity
        })
    });
    return response.json();
}