export const URL = `https://fakestoreapi.com/products`
export const fetching = async (url) => {
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log(data)
}




