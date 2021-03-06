console.log("declaracionFunciones.js")

//Capturo los elementos del DOM que se usaran de manera global.
let contModelos = document.querySelector('#contModelos');
let cantCarrito = document.querySelector('#cantCarrito');
let contArticulos = document.querySelector('#contArticulos');
let filtroMarca = document.querySelector('#filtroMarca');
let filtroGenero = document.querySelector('#filtroGenero');
let buscador = document.querySelector("#buscador");
let formularioC = document.querySelector('#formularioContacto');
let divCarrito = document.querySelector('#divProductosCarrito');
let divTotal = document.querySelector('#divTotalCarrito');

//Crea y muestra las cards en el contModelos
function mostrarProductos(array) {
    contModelos.innerHTML = ``
    array.forEach(producto => {
        let { id, marca, modelo, precio, stock } = producto;
        contModelos.innerHTML += `
        <div id="producto${id}" class="modelos__producto card col-12 col-md-3 my-5">
            <img src="./img/zapatilla${id}.webp" class="modelos__producto__img mt-5 card-img-top" alt="Imagen de zapatilla ${id}">
            <div class="card-body">
                <p class="modelos__producto__precio mt-5 card-text">$${precio}</p>
                <h5 class="card-title">${marca} ${modelo}</h5>
                <p class="card-text">${stock} unidades</p>
                <button id="botonProducto${id}" class="agregar btn btn-danger modelos__producto__boton">Agregar al carrito</button>
            </div>
        </div>
    `
    })
}

//Muestra los elementos del carrito en una tabla en la sección elegida.
function mostrarProductosCarrito() {
    console.log('Entro al mostrarProductos');
    let carrito = capturarStorage();
    if (carrito.length == 0) {
        divTotal.innerHTML = ' ';
        divCarrito.innerHTML = ' ';
        divCarrito.innerHTML = `
            <div class="carrito__secProductos__noHayProductos shadow d-flex flex-column align-items-center justify-content-center">
                <span class="carrito__secProductos__noHayProductos__titulo">¡No has agregado productos en tu carrito!</span>
                <div class="carrito__secProductos__noHayProductos__pregunta d-flex flex-row justify-content-center gap-4">
                    <span class="carrito__secProductos__noHayProductos__pregunta__texto">¿Aún no te decides?</span>
                    <a href="../index.html#catalogo">
                        <button class="carrito__secProductos__noHayProductos__pregunta__boton btn btn-outline-danger px-4">CONTINUAR VIENDO</button>
                    </a>
                </div>
            </div>
        `
    } else {
        //Vacio la sección.
        divCarrito.innerHTML = "";
        carrito.forEach((producto, indice) => {
            let { id, marca, modelo, precio, cantEnCarrito } = producto;
            divCarrito.innerHTML += `
                <div id="prodCarrito${indice}" class="carrito__secProductos__producto col-12 d-flex flex-row justify-content-between align-items-center p-4 shadow">
                    <div class="col-2">
                        <img src="../img/zapatilla${id}.webp" class="img-fluid rounded-start" alt="Imagen de zapatilla ${id}" style="width:12vw">
                    </div>
                    <div class="col-5 d-flex flex-row justify-content-center">
                        <h5 class="carrito__secProductos__producto__marcaModelo card-title">${marca} ${modelo}</h5>
                    </div>
                    <div class="col-2 text-dark">
                        <!-- Muestra el resultado de la multiplicación de ambas variables -->
                        <span class="carrito__secProductos__producto__precio card-text">$${new Intl.NumberFormat("de-DE").format(precio * cantEnCarrito)}</span>
                    </div>
                    <div class="d-flex flex-row justify-content-center align-content-center col-2">
                        <button id="aumentar${indice}" class="aumentar btn btn-outline-danger mx-3">+</button>
                        <span class="border border-1 rounded border-danger text-center py-1 px-5 d-flex flex-column justify-content-center"><strong class="text-danger">${cantEnCarrito}</strong></span>
                        <button id="disminuir${indice}" class="disminuir btn btn-outline-danger mx-3">-</button>
                    </div>
                    <div class="col-1 d-flex flex-row justify-content-center">
                        <button id="eliminar${indice}" class="eliminar btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `
        });
    }
    capturarEventosCarrito();
}

function mostrarTotalCarrito() {
    console.log('Entro al mostrarTotal');
    let carrito = capturarStorage();
    if (carrito.length != 0) {
        let acum = 0;
        divTotal.innerHTML = ' ';
        carrito.forEach(producto => {
            acum += (producto.precio * producto.cantEnCarrito);
        });
        divTotal.innerHTML += `
            <div class="col-8 row justify-content-around">
                <img class="col-3" src="../img/medios-de-pago/logo-visa.svg" alt="Logo de visa">
                <img class="col-3" src="../img/medios-de-pago/logo-banco-provincia.svg" alt="Logo del banco provincia">
                <img class="col-3" src="../img/medios-de-pago/logo-MP.svg" alt="Logo de mercado pago">
            </div>
            <div id="totalCarrito" class="carrito__secTotal__contTotales col-4 d-flex flex-column justify-content-center align-items-center gap-4 p-4 shadow">
                <div class="d-flex flex-row">
                    <div class="row justify-content-center align-items-center ps-4">
                        <span class="carrito__secTotal__contTotales__subtotal text-start mb-0">Subtotal</span>
                        <span class="carrito__secTotal__contTotales__total text-start mb-0">Total</span>
                    </div>
                    <div class="row justify-content-center align-items-end pe-4">
                        <span class="carrito__secTotal__contTotales__subtotal text-end mb-0">$${acum}</span>
                        <span class="carrito__secTotal__contTotales__total text-end mb-0">$${acum}</span>
                    </div>
                </div>
                <div class="carrito__secTotal__contTotales__botones d-flex flex-column gap-3">
                <a href="../index.html#catalogo">
                    <button class="carrito__secTotal__contTotales__botones__seguirComprando btn btn-outline-danger">SEGUIR COMPRANDO</button>
                </a>
                    <button id="botonFinalizarCompra" class="btn btn-danger">CONFIRMAR COMPRA</button>
                </div>
            </div>
        `
        alertaConfirmarCompra();
    }
}


//Coloca el numero de elementos dentro del carrito, en el nav.
function cantidadCarrito() {
    console.log('Entro al cantidadCarrito');
    //Coloca la cantidad inicial de items en el carrito del localStorage al momento de iniciar la página.
    let carrito = capturarStorage();
    let cantProdEnCarrito = 0;
    carrito.forEach(producto => {
        cantProdEnCarrito = cantProdEnCarrito + producto.cantEnCarrito;
    })
    cantCarrito.innerHTML = `
        <i class="fa-solid fa-cart-shopping"></i>
        <span>${cantProdEnCarrito}</span>
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

//Agrega elementos en el carrito, sea que agrega el objeto o solo le aumenta la cantidad de veces que ese objeto está en el carrito.
function agregar(idParam) {
    //entro a agregar
    let carrito = capturarStorage();

    fetch('../json/bd.json')
        .then(respuesta => respuesta.json())
        .then(productos => {
            //Busca en el array el producto que coincide con el idParam.
            let productoEncontrado = productos.find(e => e.id == idParam);
            //Creo alerta con TOASTIFY cuando se agrega un producto al carrito.
            Toastify({
                text: `¡${productoEncontrado.marca} ${productoEncontrado.modelo} agregadas al carrito!`,
                duration: 3000,
                destination: "./pages/carrito.html",
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#28B463",
                },
                onClick: function () { } // Callback after click
            }).showToast();

            //Controla si el artículo está ya en el carrito o no mediante condicional.
            if (isInCart(idParam)) {
                incrementarCantidad(idParam);
            } else {
                //Devuelve el objeto del array que cumple con la condición, en este caso que el id coincida, y luego lo guarda en la var.
                productoEncontrado.cantEnCarrito = 1;
                carrito.push(productoEncontrado);
                guardarStorage(carrito);
            }

            //Llamo acá a esta función debido a que la promesa Fetch es asincrónica, y necesito que se ejecute luego de que resuelva la promesa.
            cantidadCarrito();
        })
}

//Incrementa la cantidad en la variable cantEnCarrito del objeto correspondiente al id.
function incrementarCantidad(id) {
    let carrito = capturarStorage();
    //Devuelve el indice de la posición donde se encuentra el producto con el id dentro del array carrito.
    const indice = carrito.findIndex(e => e.id == id);
    carrito[indice].cantEnCarrito++;
    guardarStorage(carrito);
}

//Disminuye la cantidad en la variable cantEnCarrito del objeto correspondiente al id.
function disminuirCantidad(id) {
    let carrito = capturarStorage();
    const indice = carrito.findIndex(e => e.id == id);
    if (carrito[indice].cantEnCarrito > 1) {
        carrito[indice].cantEnCarrito--;
        guardarStorage(carrito);
    }
}

function isInCart(id) {
    let carrito = capturarStorage();
    //Devuelve true o false si se cumple la condición. En este caso si hay un objeto con el id igual al id que le paso como param.
    return carrito.some(e => e.id == id);
}
function capturarEventosCarrito() {
    let carrito = capturarStorage();
    carrito.forEach((producto, indice) => {
        //Eliminar del carrito.
        document.querySelector(`#eliminar${indice}`).addEventListener('click', () => {
            document.querySelector(`#prodCarrito${indice}`).remove();
            carrito.splice(indice, 1);
            localStorage.clear();
            guardarStorage(carrito);
            mostrarProductosCarrito();
            cantidadCarrito();
            document.querySelector('#totalCarrito').remove();
            mostrarTotalCarrito();
        })

        //Sumar cantidad en carrito
        document.querySelector(`#aumentar${indice}`).addEventListener('click', () => {
            incrementarCantidad(producto.id);
            mostrarProductosCarrito();
            cantidadCarrito();
            document.querySelector('#totalCarrito').remove();
            mostrarTotalCarrito();
        })

        //Restar cantidad en carrito
        document.querySelector(`#disminuir${indice}`).addEventListener('click', () => {
            disminuirCantidad(producto.id);
            mostrarProductosCarrito();
            cantidadCarrito();
            document.querySelector('#totalCarrito').remove();
            mostrarTotalCarrito();
        })
    })
}

function alertaConfirmarCompra () {
    document.querySelector('#botonFinalizarCompra').addEventListener('click', () => {
        Swal.fire(
            `¡Acabas de confirmar tu compra!`,
            `¡Completa los datos de tu pago para finalizarla!`,
            'success'
        )
    })
}

//Filtra elementos del array que coincidan con la condición dato.
function filtrarMarca(array, dato) {
    //Retorna un nuevo array con los elementos que cumplan en su atributo "marca" con el dato enviado como param.
    return array.filter(e => e.marca == dato);
}

//Filtra elementos del array que coincidan con la condición dato.
function filtrarGenero(array, dato) {
    //Retorna un nuevo array con los elementos que cumplan en su atributo "marca" con el dato enviado como param.
    return array.filter(e => e.sexo == dato);
}

//Busca un dato en los elementos del array que se pasa como param.
function buscar(array, dato) {
    let array2 = array;
    //En el array se aplica filter(como elemento devolveme el elem en el que coincida el dato enviado en el atributo "modelo" del elem del array).
    let resultado = array2.filter(e => e.modelo.toLowerCase().match(dato.toLowerCase()));
    return resultado;
}

//Captura los datos ingresados en el form y los envía como un SweetAlert.
function capturarForm(event) {
    //Previene que al dar click en el botón del form se refresque la página.
    event.preventDefault();
    //Guarda los valores de los inputs nombre y mail.
    let nombre = document.querySelector('#nombre').value;
    let mail = document.querySelector('#mail').value;

    //Muestra los valores de los input nombre y mail en una alerta con la librería SweetAlert.
    Swal.fire(
        `¡Buen trabajo ${nombre}!`,
        `¡Te llegará la confirmación a tu correo ${mail}!`,
        'success'
    )

    //Resetea el formulario.
    formularioC.reset();
}