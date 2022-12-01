
let localProduct = localStorage.getItem("cart");
let products = JSON.parse(localProduct)
let listProduct = document.querySelector(".list-product-cart")
const listPrice = document.querySelector(".list-price")
const total = document.querySelector(".total span")
const badge = document.querySelector(".badge")

if (products === null) {
    badge.innerHTML = 0;
} else {
    badge.innerHTML = products.length;
}


const map = products.map(product => {
    return `
    <li>
        <div class="list-product-cart_card">
            <img src="${product.image}" alt="" srcset="">                
            <div class="title">
                <h3>${product.title}</h3>
                <p class="price">Giá: <span>${product.price}</span> / vnđ</p>
                <span class="amount">Số lượng: ${product.cart} </span>
            </div>
        </div>
        <div class="remove-card">X</div>
    </li>
    `
})

listProduct.innerHTML = map.join(" ")

const receipt = products.map(product => {
    return `
    <li>
        <p class="receipt-product_name">- ${product.title} <span>(SL: ${product.cart})</span></p>
        <span class="receipt-product_price">${product.price * product.cart} / vnđ</span>
    </li>
    `
})

listPrice.innerHTML = receipt.join(" ")

let index = 0
products.forEach( each => {
    index += Number(each.price  * each.cart)
})

total.innerHTML = index;

let btnRemove = document.querySelectorAll(".remove-card")
let modal = document.querySelector(".modal") 
let noBtn = modal.querySelector(".no")
let yesBtn = modal.querySelector(".yes")

function getModal(index) {

    let localProducts = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [] ; 

    yesBtn.onclick = () => {
        localProducts.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(localProducts))
        modal.style.display = "none";
        location.reload();
    }  

    noBtn.onclick = () => {
        modal.style.display = "none";
    }
}

btnRemove.forEach( (each, index) => {
    each.onclick = () => {
        modal.style.display = "inline-block"
        getModal(index)
        console.log(each)
    }
})