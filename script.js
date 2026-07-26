let slideIndex = 0;

showSlides();

function showSlides(){

    let slides = document.getElementsByClassName("slides");

    for(let i=0;i<slides.length;i++){

        slides[i].style.display="none";

    }

    slideIndex++;

    if(slideIndex>slides.length){

        slideIndex=1;

    }

    slides[slideIndex-1].style.display="block";

    setTimeout(showSlides,3000);

}

function changeSlide(n){

    let slides=document.getElementsByClassName("slides");

    slideIndex+=n;

    if(slideIndex>slides.length){

        slideIndex=1;

    }

    if(slideIndex<1){

        slideIndex=slides.length;

    }

    for(let i=0;i<slides.length;i++){

        slides[i].style.display="none";

    }

    slides[slideIndex-1].style.display="block";

}
// ================= FLASH SALE COUNTDOWN =================

let totalSeconds = 6 * 60 * 60; // 6 hours

function updateCountdown(){

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

    if(totalSeconds > 0){
        totalSeconds--;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
function increase(btn){

let input=btn.previousElementSibling;

input.value=parseInt(input.value)+1;

}

function decrease(btn){

let input=btn.nextElementSibling;

if(input.value>1){

input.value=parseInt(input.value)-1;

}

}
// Login Form

document.addEventListener("DOMContentLoaded", () => {

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Login Successful!");

window.location="index.html";

});

}

});
function changeImage(img){
    document.getElementById("mainImage").src = img.src;
}
// Checkout Form

const checkoutForm = document.getElementById("checkoutForm");

if(checkoutForm){

checkoutForm.addEventListener("submit", function(e){

e.preventDefault();

alert("🎉 Your order has been placed successfully!");

window.location.href = "order-success.html";

});

}
// =========================
// LOCAL STORAGE CART
// =========================

function addToCart(name, price, image){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {
        name: name,
        price: price,
        image: image,
        quantity: 1
    };

    let existing = cart.find(item => item.name === name);

    if(existing){
        existing.quantity++;
    }else{
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}
function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cartItems");

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="details">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <p>Quantity : ${item.quantity}</p>

            </div>

            <button class="remove"
            onclick="removeCart(${index})">
            Remove
            </button>

        </div>

        `;

    });

    document.getElementById("subtotal").innerHTML="₹"+total;

}

loadCart();
function removeCart(index){

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    loadCart();

}
// ================= WISHLIST =================

function addToWishlist(name, price, image){

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    let exist =
    wishlist.find(item => item.name === name);

    if(exist){

        alert("Already in Wishlist");

        return;

    }

    wishlist.push({

        name:name,
        price:price,
        image:image

    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert("Added to Wishlist ❤️");

}
function loadWishlist(){

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    let container =
    document.getElementById("wishlistItems");

    if(!container) return;

    container.innerHTML =
    '<div class="wishlist-grid"></div>';

    let grid =
    container.querySelector(".wishlist-grid");

    wishlist.forEach((item,index)=>{

        grid.innerHTML += `

        <div class="wishlist-card">

        <img src="${item.image}">

        <h3>${item.name}</h3>

        <p>₹${item.price}</p>

        <button
        onclick="addToCart('${item.name}',${item.price},'${item.image}')">
        Add To Cart
        </button>

        <button
        class="removeWish"
        onclick="removeWishlist(${index})">
        Remove
        </button>

        </div>

        `;

    });

}

loadWishlist();
function removeWishlist(index){

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist"));

    wishlist.splice(index,1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    loadWishlist();

}
function searchProducts(){

let input=document
.getElementById("searchInput")
.value.toLowerCase();

let cards=document
.querySelectorAll(".searchable");

cards.forEach(card=>{

let product=card
.getAttribute("data-name");

if(product.includes(input)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}
function searchProducts(){

let input=document
.getElementById("searchInput")
.value.toLowerCase();

let cards=document
.querySelectorAll(".searchable");

let found=false;

cards.forEach(card=>{

let product=card
.getAttribute("data-name");

if(product.includes(input)){

card.style.display="block";

found=true;

}else{

card.style.display="none";

}

});

document.getElementById("notFound").style.display =
found ? "none":"block";

}
function toggleMenu(){

    const menu = document.getElementById("navMenu");

    menu.classList.toggle("showMenu");

}
// Demo Product Data

let products = [

{
image:"images/product1.jpg",
name:"Premium T-Shirt",
price:599,
stock:20
},

{
image:"images/product2.jpg",
name:"Hoodie",
price:999,
stock:15
},

{
image:"images/product3.jpg",
name:"Sneakers",
price:1499,
stock:8
}

];

function loadProducts(){

let table=document.getElementById("productTable");

if(!table) return;

table.innerHTML="";

products.forEach((p,index)=>{

table.innerHTML+=`

<tr>

<td><img src="${p.image}"></td>

<td>${p.name}</td>

<td>₹${p.price}</td>

<td>${p.stock}</td>

<td>

<button onclick="deleteProduct(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

loadProducts();

function deleteProduct(index){

products.splice(index,1);

loadProducts();

}

function showForm(){

alert("Next step: Add Product Form");

}