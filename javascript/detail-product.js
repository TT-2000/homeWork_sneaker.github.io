const productDetail = document.querySelector(".product-detail") 
const badge = document.querySelector(".badge")

let localProduct = localStorage.getItem("products");
let products = JSON.parse(localProduct)

let localCart = localStorage.getItem("cart");
let carts = JSON.parse(localCart)

let change = (location.hash).split("").splice(1).join("");
let arr = []
let quantity = 1;


if (carts === null) {
    badge.innerHTML = 0;
    
} else {
    badge.innerHTML = carts.length;
}

let show = products.filter( fil => {
    return fil.id === change
})

let map = show.map( m => {
    return `
    <div class="product-detail-left">
        <img class="product-detail_img" src="${m.image}" alt="" srcset="">
    </div>
    <div class="product-detail-right">
        <div class="name-product">
            <h2>${m.title}</h2>
            <p>Mã sản phẩm : <span>${m.id}</span></p>
        </div>
        <div class="title-product">
            <div class="product-detail_price">Giá : <span>${m.price}</span> / vnđ</div>
            <div class="product-detail_describe">
                <h3>Đắc điểm nổi bật :</h3>
                <p> ${m.describe}
            </div>

            <div class="option">
                <div class="amount-product">
                    <h3>Số lượng :</h3>

                    <div class="btn_amount">
                        <button class="prev">-</button>
                        <span>${quantity}</span>
                        <button class="next">+</button>
                    </div>

                </div>
                <div class="size">
                    <h3>Size :</h3>
                    <ul>
                        <li class="active">39</li>
                        <li>40</li>
                        <li>42</li>
                        <li>43</li>
                        <li>44</li>
                        <li>45</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="product-detail_btn">
            <button class="btn-buy_now">Mua ngay</button>
            <button class="btn-add_cart">Thêm vào giỏ hàng</button>
        </div>
    </div>
`
})

productDetail.innerHTML = map.join("")


const next = document.querySelector(".next")
const prev = document.querySelector(".prev")
const number = document.querySelector(".amount-product span")
const btnAddCart = document.querySelector(".btn-add_cart")

next.onclick = function() {
    quantity++
    number.innerHTML = quantity
    return quantity
}

prev.onclick = function() {
    if (quantity <= 1) {
        return
    }
    quantity--
    number.innerHTML = quantity
}


let total;
show.forEach( each => {
    btnAddCart.onclick = () => {
        each.cart = quantity
        
        const oldListJson = localStorage.getItem("cart");
        let existingList = JSON.parse(oldListJson) || [];        
        const some = existingList.some( so => {
            return each.id === so.id
        })

        if (some === true) {
            existingList.forEach( (e, index) => {
                if (e.id === each.id) {
                    total = e.cart + each.cart
                    existingList[index].cart = total
                    existingList.push(existingList[index])
                    existingList.splice(index, 1)
                }
            })
        } else {
            existingList.push(each)
        }
        localStorage.setItem("cart", JSON.stringify(existingList))
        location.reload();
    }
})


let sizes = document.querySelectorAll(".size li")

sizes.forEach( size => {
    size.onclick = (e) => {
        document.querySelector(".size li.active").classList.remove("active")
        size.classList.add("active")
    }
})





