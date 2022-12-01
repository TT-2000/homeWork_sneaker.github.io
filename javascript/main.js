
let localProduct = localStorage.getItem("products");
let products = JSON.parse(localProduct)
let card = document.querySelector(".card")
let localCart = localStorage.getItem("cart");
let carts = JSON.parse(localCart)
const badge = document.querySelector(".badge")

if (carts === null) {
    badge.innerHTML = 0;
} else {
    badge.innerHTML = carts.length;

}


function renderProduct() {    
    const information = [];
    
    let push = information.concat(products)

        let show = push.map( map => {
            return  `
                <li>
                    <img src="${map.image || undefined}" alt="" srcset="">
                    <h2 class="title">${map.title}</h2>
                    <p class="price" >Giá : ${map.price} / vnđ</p>
                    <div class = "button-list"> 
                    <a href="./chitietsanpham.html#${map.id}">
                        <button class="add-cart">Chi tiết sản phẩm</button>
                    </a>
                    <button class="remove-card">X</button>
                    </div>
                </li>
                `
        })

        card.innerHTML = show.join("") 
}
renderProduct() 

let btnRemove = card.querySelectorAll(".remove-card")
let modal = document.querySelector(".modal") 
let noBtn = modal.querySelector(".no")
let yesBtn = modal.querySelector(".yes")


function getModal(index) {

    let localProducts = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [] ; 
    
    yesBtn.onclick = () => {
        localProducts.splice(index, 1)
        localStorage.setItem("products", JSON.stringify(localProducts))
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
    }
})









