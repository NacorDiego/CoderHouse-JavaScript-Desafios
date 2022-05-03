// EMPRESA DE VIAJES

//FUNCIONES

function asignarLugar (){
    let aux = parseInt(prompt('Ingrese el numero correspondiente al lugar donde desea viajar: 0- ' + destinos[0] + ', 1- ' + destinos[1] + ', 2- ' + destinos[2] + ', 3- ' + destinos[3]));
    return (aux);
}

function asignarClase (){
    let aux = parseInt(prompt('Ingrese el numero correspondiente a la clase en la que desea viajar: 0- ' + clases[0] + ', 1- ' + clases[1] + ', 2- ' + clases[2] + ', 3- ' + clases[3]));
    return (aux);
}

function conEscala (precioEscala){
    let escala = (prompt('Seleccione si desea que el viaje sea con escala o sin escala. Elija: Si o No')).toLowerCase();
    if (escala == 'si') {
        aux = 0;
        return (aux);
    } else {
        aux = 12000;
        return (aux);
    }
}

function valorFinal (destino, precioDestino, clase, precioClase, precioEscala) {
    let precioTotal = precioDestino + precioClase + precioEscala;
    return ('Su viaje a ' + destino + ' tiene un valor de: $' + precioTotal + ". El valor total se compone de: Valor básico a " + destino + ": $" + precioDestino + " - La clase " + clase + " tiene un valor agregado de: $" + precioClase + " - Por la escala elegida tiene un valor agregado de: $" + precioEscala + ". Gracias por viajar con nosotros.");
}

// ARREGLOS

const destinos = ['Venecia','Madrid','Londres','Miami'];

const precioDestinos = [90000,110000,95000,70000];

//Como aclaración, la posición 1 del array "destinos" se corresponde con la posición 1 del array "precioDestinos" y así sucesivamente.

const clases = ['Turista','Premium','Ejecutiva','Primera clase'];

const precioClases = [0,5000,9000,15000];

//Como aclaración, la posición 1 del array "clase" se corresponde con la posición 1 del array "precioClases" y así sucesivamente.

//VARIABLES

let lugar;
let clase;
let escala;
let precioEscala;

//PROGRAMA PRINCIPAL

lugar = asignarLugar();

//while (lugar != 0 && lugar != 1 && lugar != 2 && lugar != 3){
while (lugar < 0 || lugar > 3){
    alert('Usted no ha ingresado un numero válido.');
    lugar = asignarLugar();
}

// alert('El lugar elegido es: ' + lugar);

/*switch (lugar) {
    case 'venecia':
        precioLugar = 90000;
        break;
    case 'madrid':
        precioLugar = 110000;
        break;
    case 'londres':
        precioLugar = 95000;
        break;
    default:
        precioLugar = 70000;
        break;
}*/

clase = asignarClase();

while (clase < 0 || clase > 3){
    alert('Usted no ha ingresado un número válido.');
    clase = asignarClase();
}

/*switch (clase) {
    case 'turista':
        precioClase = 0;
        break;
    case 'premium':
        precioClase = 5000;
        break;
    case 'ejecutiva':
        precioClase = 9000;
        break;
    default:
        precioClase = 15000;
        break;
}*/

precioEscala = conEscala();

alert(valorFinal(destinos[lugar], precioDestinos[lugar], clases[clase], precioClases[clase], precioEscala));








