import {fetching, URL} from "./fetching.js";

const btnLogin = document.getElementById('btn-login');
const btnSingup = document.getElementById('btn-singup');
const inputUser = document.getElementById('input-user');
const inputPassword = document.getElementById('input-password');
const warning = document.getElementById('warning');
const welcome = document.getElementById('welcome');
const form = document.getElementById('form');
const main = document.querySelector('main');
const categoriesContainer = document.getElementById('categories-container');
const productsContainer = document.getElementById('products-container');
const dropdownMenu = document.getElementById('dropdown-menu');
const logOutBtn = document.getElementById('log-out-btn');



const categories = [
    {
        name: 'Tech',
        products: ['Xbox', 'Mouse', 'Ipad', 'HeadSets']
    },
    {
        name: 'Clothes',
        products: ['T-shirt', 'Pants', 'Skirt', 'Hat']
    },
    {
        name: 'Home',
        products: ['Pillow', 'Towel', 'Cup', 'Blanket']
    }
    
]


const registerUser = () => { 
    const userName = inputUser.value
    const userPass = inputPassword.value
    localStorage.setItem('user', userName)
    localStorage.setItem('pass', userPass)
    inputPassword.value = ''
    inputUser.value = ''
    warning.innerText = 'Usuario creado correctamente, por favor ingresa sesion :)'
} 


const validateUser = () => { 
    const userName = inputUser.value
    const userPass = inputPassword.value
    if(userName == localStorage.getItem('user') && userPass == localStorage.getItem('pass')) {
        welcome.innerHTML = `Bienvenido <span>${userName}</span> :)`
        form.classList.add('hidden')
        main.classList.remove('hidden')
        setCategory()
    }else{
        warning.innerText = 'Datos no validos, verifica que la información sea correcta :)'
    }
}

const setCategory = () =>{
    categoriesContainer.innerHTML = ''
    categories.forEach(obj => {
        categoriesContainer.innerHTML += `
        <button class="categorie" value="${obj.name}"> ${obj.name} </button>`
    } )
}


const setProducts = (category) => {
    const categorySelected = categories.find(obj => obj.name === category)
    categorySelected.products.map(product => {
        productsContainer.innerHTML += `
        <div><span> ${product}</span> <button class="product-btn" value="${product}">+</button></div>`
    })
    document.querySelectorAll('.product-btn').forEach(product => {
        product.addEventListener('click', ()=>()=> addProduct(product.value))
    })
}

const addProduct = (productName) => {
    dropdownMenu.innerHTML += `
        <div class="dropdown-item">${productName} <button class="btn-delete-item"> - </button></div>
    `
    document.querySelectorAll('.btn-delete-item').forEach( btn => {
        btn.addEventListener('click', e=> deleteItem(e.target))
    })
}
const deleteItem = (target) => {
    console.log(target)
    target.parentNode.remove()
}


const handleDropdownClick = () => {
    dropdownMenu.classList.contains('hidden') ? dropdownMenu.classList.remove('hidden') : dropdownMenu.classList.add('hidden')
}

categoriesContainer.addEventListener('click', e => {
    if(e.target.value) {
        productsContainer.innerHTML = ''
        setProducts(e.target.value)
    }
})

btnLogin.addEventListener('click', e => {
    e.preventDefault()
    if(inputPassword.value  === '' || inputUser.value === '') {
        warning.innerText = 'Por favor completa todos los campos :)'
    }else validateUser()
})
btnSingup.addEventListener('click', e =>{
    e.preventDefault()
    if(inputPassword.value === '' && inputUser.value === '') {
        warning.innerText = 'Completa los campos antes de presionar en registrar :)'
    }else registerUser()
    
})

productsContainer.addEventListener('click', e =>{
    if (e.target.value) {
        addProduct(e.target.value)
    }
})
logOutBtn.addEventListener('click', () =>{
    main.classList.add('hidden')
    form.classList.remove('hidden')
    welcome.innerText = ''
})

fetching(`https://fakestoreapi.com/products/categories`);