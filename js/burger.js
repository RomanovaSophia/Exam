let NavLink = document.querySelectorAll('.mobile-menu__link')

for(let element of NavLink){
element.onclick = ()=>{
document.getElementById('checkbox').checked=false
}
}