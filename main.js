import {fetching, URL, randomUser, URL2} from "./fetching.js"



//*Elementos del DOM
const formElement = document.getElementById('form-container')
const categoriesElement = document.getElementById('categories')
const productsElement = document.getElementById('products')
const addedProductsElement = document.getElementById('added-products')

const btnLogin = document.getElementById('btn-login')
const btnSingup = document.getElementById('btn-singup')
const btnFormLogin = document.getElementById('btn-form-login')
const btnFormSingup = document.getElementById('btn-form-singup')
const btnCloseForm = document.getElementById('btn-close-form')
const btnCart = document.getElementById('btn-cart')
const btnLogout = document.getElementById('btn-logout')
const btnFilter = document.getElementById('filter-btn')
const btnHeaderProduct = document.getElementById('btn-header-product')
const userImageElement = document.getElementById('user-image')

const inputPassword = document.getElementById('pass')
const inputUser = document.getElementById('user')
const inputFilter = document.getElementById('filter-input')

const alertSuccess = document.getElementById('alert-success')
const alert = document.getElementById('alert')
const warning = document.getElementById('warning')
const welcome = document.getElementById('welcome')
const randomTitle = document.getElementById('random-product-title')
const randomImage = document.getElementById('random-product-image')
const randomDescription = document.getElementById('random-product-description')
const randomPricesElement = document.getElementById('random-product-prices')

//*Validacion de Sesion
const checkSesion = () => {
    if(localStorage.getItem('user')){
        btnLogin.classList.add('d-none')
        btnSingup.classList.add('d-none')
        btnCart.classList.remove('d-none')
        btnLogout.classList.remove('d-none')
        welcome.innerText = localStorage.getItem('user')
        setUserImage(URL2)
    }else{
        btnLogin.classList.remove('d-none')
        btnSingup.classList.remove('d-none')
        btnCart.classList.add('d-none')
        btnLogout.classList.add('d-none')
        welcome.innerText = localStorage.getItem('user')
    }
}
const logout = () =>{
    localStorage.removeItem('user')
    localStorage.removeItem('pass')
    checkSesion()
}
const registerUser = () => { 
    const userName = inputUser.value
    const userPass = inputPassword.value
    localStorage.setItem('user', userName)
    localStorage.setItem('pass', userPass)
    inputPassword.value = ''
    inputUser.value = ''
    warning.innerText = 'Usuario creado correctamente, por favor ingresa sesion.'
} 
const validateUser = () => { 
    const userName = inputUser.value
    const userPass = inputPassword.value
    if(userName == localStorage.getItem('user') && userPass == localStorage.getItem('pass')) {
        welcome.innerHTML = userName
        formElement.classList.add('d-none')
        btnLogin.classList.add('d-none')
        btnSingup.classList.add('d-none')
        btnCart.classList.remove('d-none')
        btnLogout.classList.remove('d-none')
    }else{
        warning.innerText = 'Datos no validos, verifica que la información sea correcta.'
    }
}
const setUserImage = async(url) => {
    const res = await randomUser(url)
    userImageElement.src = res.avatar
}
const randomRendering = async() => {
        const res = await fetching(`${URL}/${Math.round(Math.random() * 29)}`)
        randomImage.src = res.thumbnail
        randomTitle.innerText = res.title
        randomDescription.innerText = res.description
        randomPricesElement.innerHTML = `<span id="random-price" class="text-success fw-bold fs-4">$${res.price}   </span><s class="text-secondary fw-bold fs-4">${res.discountPercentage}%</s>`
}
//*Renderizado de la pagina principal
const setCategory = async () =>{
    const res = await fetching(`${URL}/categories`)
    categoriesElement.innerHTML = ''
    res.forEach(categorie => {
        categoriesElement.innerHTML += `
        <button class="badge  text-bg-secondary m-2 p-2 text-capitalize fw-light" value="${categorie}">${categorie}</button>`
    } )
}
const setProducts = async() => {
    const res = await fetching(`${URL}`)
    const data = res.products
    productsElement.innerHTML = ''
    data.forEach(product => {
        productsElement.innerHTML += `
        <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
            <img src="${product.images[0]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text text-secondary">${product.description}</p>
                <span class="text-success fw-bold fs-4">$${product.price}</span>
                <button id="add-btn" type="button" class="btn btn-primary" value="${product.id}" > <i class="bi bi-cart-plus"></i></button>
            </div>
        </div>
        `
    } )
    
}
const addProduct =  async (target) => {
    const res = await fetching(`${URL}/${target.value}`)
    
    addedProductsElement.innerHTML += `
    <div class="card m-3">
        <div class="row g-0">
            <div class="col-md-4 d-flex">
                <img src="${res.images[0]}" class="img-fluid rounded-start" alt="image-product-added">
            </div>
            <div class="col-md-8">
                <div class="card-body grid">
                    <h5 class="card-title">${res.title}</h5>
                    <span class="text-success fw-bold fs-5">$550</span>
                    <div>
                        <button type="button" class="btn text-danger fs-5"><i id="delete-btn" class="bi bi-trash-fill"></i></button>         
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}
const filterProducts = async (filter) => {
    const res = await fetching(`${URL}/category/${filter}`)
    const data = res.products
    productsElement.innerHTML = ''
    data.forEach(product => {
        productsElement.innerHTML += `
        <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
            <img src="${product.images[0]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text text-secondary">${product.description}</p>
                <span class="text-success text-bolder fw-bold fs-4">$${product.price}</span>
                <button id="add-btn" type="button" class="btn btn-primary" value="${product.id}"> <i class="bi bi-cart-plus"></i></button>
            </div>
        </div>
        `
    } )
}
const searchProduct = async() =>{
    const filter = inputFilter.value
    const res = await fetching(`${URL}/search?q=${filter}`)
    const data = res.products[0]
    console.log(data)
    productsElement.innerHTML = `
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
        <img src="${data.images[0]}" class="card-img-top" alt="product-image">
        <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text text-secondary">${data.description}</p>
            <span class="text-success text-bolder fw-bold fs-4">$${data.price}</span>
            <button id="add-btn" type="button" class="btn btn-primary" value="${data.id}"> <i class="bi bi-cart-plus"></i></button>
        </div>
    </div>
    `
}
//*Eventos del DOM
categoriesElement.addEventListener('click',(e) => {
    if (e.target.value) {
       filterProducts(e.target.value)
    }
})

productsElement.addEventListener('click',(e) => {
    if(e.target.id == 'add-btn' && !localStorage.getItem('user')){
        alert.style.transform = 'translateX(-100%)'
        setTimeout(()=>{
            alert.style.transform = 'translateX(100%)'
        },2000)
    }else if (e.target.id == 'add-btn'){
        addProduct(e.target)
        alertSuccess.style.transform = 'translateX(-100%)'
        setTimeout(()=>{
            alertSuccess.style.transform = 'translateX(100%)'
        },2000)
    }
})
btnLogin.addEventListener('click', e => {
    formElement.classList.remove('d-none')
})
btnSingup.addEventListener('click', e =>{
    formElement.classList.remove('d-none')
})
btnCloseForm.addEventListener('click', () => {
    formElement.classList.add('d-none')
})

addedProductsElement.addEventListener('click', (e) => {
    if (e.target.id == 'btn-close-cart') {
        addedProductsElement.style.transform = 'translateX(100%)';
    }else if(e.target.id == 'delete-btn'){
        e.target.offsetParent.remove()
    }
})
btnFormSingup.addEventListener('click', () => {
    if(inputUser.value === '' || inputPassword.value === '') {
        warning.innerText = 'Completa los campos antes de presionar en registrar :)'
    }else{
        registerUser()
    }
})
btnFormLogin.addEventListener('click', () => {
  if (inputPassword.value == '' || inputPassword.value == '') {
    warning.innerText = 'Por favor completa todos los campos :)'
  }else{
    validateUser()
  }
})
btnCart.addEventListener('click', () => {
    addedProductsElement.style.transform = 'translateX(0)';
})
btnHeaderProduct.addEventListener('click', () => {
    addedProductsElement.innerHTML += `
    <div class="card m-3">
        <div class="row g-0">
            <div class="col-md-4 d-flex">
                <img src="${randomImage.src}" class="img-fluid rounded-start" alt="image-product-added">
            </div>
            <div class="col-md-8">
                <div class="card-body grid">
                    <h5 class="card-title">${randomTitle.innerText}</h5>
                    <span class="text-success text-bolder fw-bold fs-4">${document.getElementById('random-price').innerText}</span>
                    <div>
                        <button type="button" class="btn text-danger fs-5"><i id="delete-btn" class="bi bi-trash-fill"></i></button>         
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
btnFilter.addEventListener('click', searchProduct)
btnLogout.addEventListener('click', logout)

randomRendering()
setCategory()
setProducts()
checkSesion()