//DE ESTA MANERA SE PODRÍA CREAR UN BOTÓN PARA ELIMINAR UN ITEM DEL CARRITO (AGREGAR FUNCIONALIDAD EN PRÓXIMA ENTREGA). Minuto 1:36:00 del video Workshop I.
// document.querySelector(`#producto${i}`).remove();
//carrito.splice(i,1)

console.log(carrito);

let divCarrito = document.querySelector('#divCarrito');

if (carrito.length == 0) {
    divCarrito.innerHTML = `
        <span class="carrito__contCarrito__span">No hay productos en el carrito.</span>
    `
} else {
    divCarrito.innerHTML = `
        <span class="carrito__contCarrito__span">Hay productos en el carrito.</span>
    `
}