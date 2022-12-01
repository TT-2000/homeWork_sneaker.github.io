const input = document.querySelector("input")
const form = document.querySelector("form")
const text = document.querySelector(".text")
let localCart = localStorage.getItem("cart");

let carts = JSON.parse(localCart)

const type = document.querySelectorAll("[type=text]")
console.log(type)

const badge = document.querySelector(".badge")

if (carts === null) {
    badge.innerHTML = 0;
    
} else {
    badge.innerHTML = carts.length;

}


form.onsubmit = (e) => {
    e.preventDefault()
    
    const formData = [...new FormData(form)]
    const {title, image, price, describe} = Object.fromEntries(formData)
    console.log((title, image, price, describe))
    console.log(title)
    let formIsValid = true
    
        if (title.trim() === "") {
            showMessage("#name", "Vui lòng nhập tên sản phẩm")
            formIsValid = false
        } else {
            showMessage("#name", "")
        }
    
        if (image === "") {
            showMessage("#image", "Vui lòng thêm ảnh sản phẩm")
            formIsValid = false
        } else {
            showMessage("#image", "")
        }
    
        if (price === "" ) {
            showMessage("#price", "Vui lòng thêm giá sản phẩm")
            formIsValid = false
        } else if (!Number(price))  {
            showMessage("#price", "Giá sản phẩm phải là kiểu số")
            formIsValid = false
        } else {
            showMessage("#price", "")
        }
    
        if (describe === "") {
            showMessage("#describe", "Vui lòng thêm mô tả")
            formIsValid = false
        } else {
            showMessage("#describe", "")
        }


    if (formIsValid) {        
   
        type.forEach( e => {
            console.log(e.value)
            e.value = ""
        })
        
        toast("Thêm sản phẩm thành công")   
        
        const newId = "id-" + Date.now().toString().slice(-5)
        const newProduct = {id: newId, title, image, price, describe};

        if (!localStorage.getItem("products")) {
            const productList = [newProduct];
            localStorage.setItem("products", JSON.stringify(productList))
        } else {
            const oldListJson = localStorage.getItem("products");
            const existingList = JSON.parse(oldListJson);
            existingList.push(newProduct)
            localStorage.setItem("products", JSON.stringify(existingList))
        }
    } else {
        toast("Thêm sản phẩm thất bại")
    }

}


function showMessage(id , text) {
    const errorMessage = document.querySelector(id)
    const message = errorMessage.parentElement.querySelector(".message")

    message.innerHTML = text
}

function toast(text) {
    const toast = document.querySelector(".toast-message")
    const textMessage = toast.querySelector(".message")
    
    let li = document.createElement("li")

    console.log(li)

    textMessage.appendChild(li)

    li.innerHTML = text
    
    setTimeout(() => {
        li.classList.add("fade-away");

        setTimeout(() => {
          li.remove();
        }, 1000);
      }, 4000);
}
