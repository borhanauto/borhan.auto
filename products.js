
let products=[];
fetch('products.json').then(res=>res.json()).then(data=>{
products=data;
if(document.getElementById('productGrid')){
document.getElementById('productGrid').innerHTML=products.map(p=>`
<div class="card">
<h4>${p.name}</h4>
<p>৳${p.price}</p>
<button onclick="addToCart(${p.id})">Add to Cart</button>
</div>`).join('');
}
});
