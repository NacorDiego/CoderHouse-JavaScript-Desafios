console.log("declaracionFunciones.js")

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
                    <button id="botonProducto${id}" class="agregar btn btn-danger modelos__producto__boton">Agregar al carrito</button>
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

function agregar(array,idParam) {
    //entro a agregar
    let carrito = capturarStorage();
    if (isInCart(idParam)) {
        incrementarCantidad(idParam);
    } else {
        //Devuelve el objeto del array que cumple con la condición, en este caso que el id coincida, y luego lo guarda en la var.
        let productoEncontrado = array.find(e => e.id == idParam);
        carrito.push(productoEncontrado);
        guardarStorage(carrito);
        console.log(carrito);
    }
}

function incrementarCantidad(id) {
    let carrito = capturarStorage();
    //Devuelve el indice de la posición donde se encuentra el producto con el id dentro del array carrito.
    const indice = carrito.findIndex(e => e.id == id);
    carrito[indice].cantidad++;
    guardarStorage(carrito);
    // mostrarCarrito(carrito);
}

function isInCart(id) {
    let carrito = capturarStorage();
    //Devuelve true o false si se cumple la condición. En este caso si hay un objeto con el id igual al id que le paso como param.
    return carrito.some(e => e.id == id);
}

//Filtra elementos del array que coincidan con la condición dato.
function filtrar(array, dato) {
    //Retorna un nuevo array con los elementos que cumplan en su atributo "marca" con el dato enviado como param.
    return array.filter(e => e.marca == dato);
}

//Busca un dato en los elementos del array que se pasa como param.
function buscar(array, dato) {
    //En el array se aplica filter(como elemento devolveme el elem en el que coincida el dato enviado en el atributo "modelo" del elem del array).
    let resultado = array.filter(e => e.modelo.toLowerCase().match(dato.toLowerCase()));
    return resultado;
}