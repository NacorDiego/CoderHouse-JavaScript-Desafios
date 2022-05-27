class Producto {
    constructor(marca,modelo,precio,stock,sexo){
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.stock = stock;
        this.sexo = sexo;
    }
}

const producto1 = new Producto('Nike','Court Borough ',8500,10,'masculino');
const producto2 = new Producto('Nike','Air Max',17000,5,'masculino');
const producto3 = new Producto('Nike','Revolution 6',15000,7,'femenino');
const producto4 = new Producto('Adidas','Grand Court',10000,9,'masculino');
const producto5 = new Producto('Adidas','Galaxy 5',12000,7,'femenino');
const producto6 = new Producto('Adidas','Coreracer',10500,10,'masculino');
const producto7 = new Producto('Puma','X-Ray 2',16000,5,'masculino');
const producto8 = new Producto('Puma','Caven',12000,10,'masculino');
const producto9 = new Producto('Puma','Disperse XT',13000,8,'femenino');

let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9];

let carrito = [];

let contModelos = document.querySelector('#contModelos');
let cantCarrito = document.querySelector('#cantCarrito');

//Devuelve los elementos del localStorage.
function capturarStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || []
}

//Carga los elementos del array en el localStorage.
function guardarStorage(array) {
    localStorage.setItem("carrito", JSON.stringify(array))
}

//Muestra todos los productos del arreglo en formato CARDS.
function mostrarProductos (array){
    //Creo las cards de cada producto.
    array.forEach((producto, i) => {
        let {marca, modelo, precio, stock} = producto;
        contModelos.innerHTML += `
            <div id="producto${i}" class="card modelos__producto col-12 col-md-3 mx-3">
                <img src="./img/zapatilla${i}.webp" class="card-img-top" alt="Imagen de zapatilla ${i}">
                <div class="card-body">
                    <h5 class="card-title">${marca} ${modelo}</h5>
                    <p class="card-text">$${precio}</p>
                    <p class="card-text">${stock} unidades</p>
                    <button id="botonProducto${i}" class="btn btn-danger modelos__producto__boton">Agregar al carrito</button>
                </div>
            </div>
        `
    })
}

//Agrega un producto en el carrito y testea si ese mismo producto ya habia sido agregado antes.
function agregar(idParam) {
    let carrito = capturarStorage()
    if (isInCart(idParam)) {        
        incrementarCantidad(idParam)
    } else {
        let productoEncontrado = productos.find(e => e.id == idParam)
        carrito.push({ ...productoEncontrado, cantidad: 1 })
        guardarStorage(carrito)
        mostrarCarrito(carrito)
    }
}

//Es llamado por la funcion 'agregar': Si el producto ya había sido agregado, esta función suma 1 a la cantidad.
function incrementarCantidad(id) {
    let carrito = capturarStorage()
    const indice = carrito.findIndex(e => e.id == id)
    carrito[indice].cantidad++
    guardarStorage(carrito)
    mostrarCarrito(carrito)
}

//Controla si el producto ya fué agregado al carrito antes mediante el 'id'.
function isInCart(id) {
    let carrito = capturarStorage()
    return carrito.some(e => e.id == id)
}

//Filtra productos.
function filtrar(array, dato){
    return array.filter(e=> e.categoria == dato);    
}

//Busca productos.
function buscar(array, dato){
    let resultado=array.filter(e=> e.detalle.toLowerCase().match(dato.toLowerCase()))
    return resultado
}




//Coloca la cantidad inicial de items en el carrito del localStorage al momento de iniciar la página.
cantCarrito.innerHTML = `
    <i class="fa-solid fa-cart-shopping"></i>
    <span>${carrito.length}</span>
`