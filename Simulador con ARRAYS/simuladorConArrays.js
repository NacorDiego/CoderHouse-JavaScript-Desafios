// EMPRESA DE VIAJES

//FUNCIONES

function asignarLugar (){
    let aux = (prompt('Elija el lugar donde desea viajar: Venecia, Madrid, Londres, Miami')).toLowerCase();
    return (aux);
}

function asignarClase (){
    let aux = (prompt('Elija el tipo de asiento en el que desea viajar: turista, premium, ejecutiva, primera clase')).toLowerCase();
    return (aux);
}

function conEscala (precioEscala){
    let escala = (prompt('Seleccione si desea que sea con escala o sin escala. Elija: Si o No')).toLowerCase();
    if (escala == 'si') {
        aux = 0;
        return (aux);
    } else {
        aux = 12000;
        return (aux);
    }
}

function valorFinal (lugar, precioLugar, clase, precioClase, precioEscala) {
    let precioTotal = precioLugar + precioClase + precioEscala;
    return ('Su viaje a ' + lugar + 'tiene un valor de: $' + precioTotal + ". El valor total se compone de: Valor básico a " + lugar + ": $" + precioLugar + " - La clase " + clase + " tiene un valor agregado de: $" + precioClase + " - Por la escala elegida tiene un valor agregado de: $" + precioEscala + ". Gracias por viajar con nosotros.")
}


//VARIABLES

let lugar, precioLugar, clase, precioClase, escala, precioEscala;

//PROGRAMA PRINCIPAL

lugar = asignarLugar();

while (lugar != 'venecia' && lugar != 'madrid' && lugar != 'londres' && lugar != 'miami'){
    alert('Usted no ha ingresado un destino válido.');
    lugar = asignarLugar();
}

// alert('El lugar elegido es: ' + lugar);

switch (lugar) {
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
}

clase = asignarClase();

while (clase != 'turista' && clase != 'premium' && clase != 'ejecutiva' && clase != 'primera clase'){
    alert('Usted no ha ingresado una clase válida.');
    clase = asignarClase();
}

switch (clase) {
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
}

precioEscala = conEscala();

alert(valorFinal(lugar, precioLugar, clase, precioClase, precioEscala));








