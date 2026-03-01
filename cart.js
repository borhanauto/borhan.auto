
function getCart(){return JSON.parse(localStorage.getItem('cart')||'[]');}
function saveCart(c){localStorage.setItem('cart',JSON.stringify(c));updateCartCount();}
function addToCart(id){let c=getCart();c.push(id);saveCart(c);alert('Added to cart');}
function updateCartCount(){if(document.getElementById('cartCount')){
document.getElementById('cartCount').innerText=getCart().length;}}
updateCartCount();
if(document.getElementById('cartItems')){
let cart=getCart();document.getElementById('cartItems').innerHTML=cart.map(i=>"<p>Product ID: "+i+"</p>").join('');
document.getElementById('cartTotal').innerText="Total Items: "+cart.length;}
