
document.getElementById('checkoutForm')?.addEventListener('submit',function(e){
e.preventDefault();
let name=name.value, phone=phone.value, address=address.value;
let payment=document.getElementById('payment').value;
let cart=JSON.parse(localStorage.getItem('cart')||'[]');
let msg=`Order from Borhan Auto Parts%0AName:${name}%0APhone:${phone}%0AAddress:${address}%0APayment:${payment}%0ATotal Items:${cart.length}`;
window.location.href='https://wa.me/8801983498274?text='+msg;
});
