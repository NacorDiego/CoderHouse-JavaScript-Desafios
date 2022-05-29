console.log("main.js")

class Producto {
    constructor(id, marca, modelo, precio, stock, sexo) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.stock = stock;
        this.sexo = sexo;
    }
}

const producto1 = new Producto('0', 'Nike', 'Court Borough ', 8500, 10, 'masculino');
const producto2 = new Producto('1', 'Nike', 'Air Max', 17000, 5, 'masculino');
const producto3 = new Producto('2', 'Nike', 'Revolution 6', 15000, 7, 'femenino');
const producto4 = new Producto('3', 'Adidas', 'Grand Court', 10000, 9, 'masculino');
const producto5 = new Producto('4', 'Adidas', 'Galaxy 5', 12000, 7, 'femenino');
const producto6 = new Producto('5', 'Adidas', 'Coreracer', 10500, 10, 'masculino');
const producto7 = new Producto('6', 'Puma', 'X-Ray 2', 16000, 5, 'masculino');
const producto8 = new Producto('7', 'Puma', 'Caven', 12000, 10, 'masculino');
const producto9 = new Producto('8', 'Puma', 'Disperse XT', 13000, 8, 'femenino');

let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9];

let contModelos = document.querySelector('#contModelos');
let cantCarrito = document.querySelector('#cantCarrito');
let contenedorTabla = document.querySelector('#tablaCarrito');
let filtroMarca = document.querySelector('#filtrar');
let buscador = document.querySelector("#buscador");

function mostrarProductos(array) {
    contModelos.innerHTML = "";
    array.forEach(producto => {
        let { id, marca, modelo, precio, stock } = producto;
        contModelos.innerHTML += `
            <div id="producto${id}" class="card modelos__producto col-12 col-md-3 my-5">
                <img src="./img/zapatilla${id}.webp" class="modelos__producto__img mt-5 card-img-top" alt="Imagen de zapatilla ${id}">
                <div class="card-body">
                    <p class="modelos__producto__precio mt-5 card-text">$${precio}</p>
                    <h5 class="card-title">${marca} ${modelo}</h5>
                    <p class="card-text">${stock} unidades</p>
                    <button id="botonProducto${id}" class="btn btn-danger modelos__producto__boton">Agregar al carrito</button>
                </div>
            </div>
        `
    });
}

function mostrarCarrito() {
    let carrito = capturarStorage();
    contenedorTabla.innerHTML = "";
    carrito.forEach(producto => {
        let { cantidad, marca, modelo, precio } = producto;
        contenedorTabla.innerHTML += `.
        <tr>
            <th scope="row">${cantidad}</th>
            <td>${marca}</td>
            <td>${modelo}</td>
            <td>$${precio}</td>
            <td><button class="btn btn-danger">x</button></td>
        </tr>       
        `
    });
}

function cantidadCarrito() {
    //Coloca la cantidad inicial de items en el carrito del localStorage al momento de iniciar la página.
    let carrito = capturarStorage();
    cantCarrito.innerHTML = `
        <i class="fa-solid fa-cart-shopping"></i>
        <span>${carrito.length}</span>
    `
}

//Retorna el localStorage en formato objetos o retorna array vacio.
function capturarStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//Setea los elementos del array en el localStorage.
function guardarStorage(array) {
    localStorage.setItem("carrito", JSON.stringify(array));
}

function agregar(idParam) {
    let carrito = capturarStorage();
    if (isInCart(idParam)) {
        incrementarCantidad(idParam);
    } else {
        //Devuelve el objeto que cumple con la condición, en este caso que el id coincida.
        let productoEncontrado = productos.find(e => e.id == idParam);
        //Separa todas los atributos del objeto, y crea el atributo cantidad y lo inicializa en 1. Luego pushea el objeto.
        carrito.push({ ...productoEncontrado, cantidad: 1 });
        guardarStorage(carrito);
        mostrarCarrito(carrito);
    }
}

function incrementarCantidad(id) {
    let carrito = capturarStorage();
    //Devuelve el indice de la posición donde se encuentra el producto con el id dentro del array carrito.
    const indice = carrito.findIndex(e => e.id == id);
    carrito[indice].cantidad++;
    guardarStorage(carrito);
    mostrarCarrito(carrito);
}

function isInCart(id) {
    let carrito = capturarStorage();
    //Devuelve true o false si se cumple la condición. En este caso si hay un objeto con el id igual al id que le paso como param.
    return carrito.some(e => e.id == id);
}

function filtrar(array, dato) {
    return array.filter(e => e.marca == dato);
}

function buscar(array, dato) {
    let resultado = array.filter(e => e.modelo.toLowerCase().match(dato.toLowerCase()))
    return resultado
}

mostrarProductos(productos);
cantidadCarrito();
// mostrarCarrito();
filtroMarca.addEventListener("change", (e) => {
    e.target.value != " " ? mostrarProductos(filtrar(productos, e.target.value)) : mostrarProductos(productos);
});
buscador.addEventListener("input", (e) => {
    mostrarProductos(buscar(productos, e.target.value))
});

// cardContainer.addEventListener("click", e => {
//     if (e.target.classList.contains("agregar")) {
//         agregar(e.target.id)
//     }
// })