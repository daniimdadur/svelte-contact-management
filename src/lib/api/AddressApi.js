import {PUBLIC_URL_API} from "$env/static/public";

export const addressCreate = async (token, contactId, {street, city, province, country, postal_code}) => {
    return await fetch(`${PUBLIC_URL_API}/contacts/${contactId}/addresses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token,
        },
        body: JSON.stringify({
            street,
            city,
            province,
            country,
            postal_code,
        })
    })
}

export const addressList = async (token, contactId) => {
    return await fetch(`${PUBLIC_URL_API}/contacts/${contactId}/addresses`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": token,
        }
    })
}

export const addressDetail = async (token, contactId, addressId) => {
    return await fetch(`${PUBLIC_URL_API}/contacts/${contactId}/addresses/${addressId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": token,
        }
    })
}

export const addressUpdate = async (token, contactId, addressId, {street, city, province, country, postal_code}) => {
    return await fetch(`${PUBLIC_URL_API}/contacts/${contactId}/addresses/${addressId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token,
        },
        body: JSON.stringify({
            street,
            city,
            province,
            country,
            postal_code,
        })
    })
}

export const addressDelete = async (token, contactId, addressId) => {
    return await fetch(`${PUBLIC_URL_API}/contacts/${contactId}/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Authorization": token,
        }
    })
}