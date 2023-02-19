
export const URL = `https://dummyjson.com/products`
const URL2 = `https://random-data-api.com/api/v2/users`


export const fetching = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export const randomUser = async () => {
    const response = await fetch(URL2)
    const data = await response.json()
    return data
}





