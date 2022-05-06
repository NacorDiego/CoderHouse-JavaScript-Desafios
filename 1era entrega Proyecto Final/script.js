//Empresa de venta de pasajes de Aerolinea

//OBJETOS

class Pasaje {
    constructor () {
        this.destino = '';
        this.clase = '';
        this.escala = '';
        this.precioDestino = 0;
        this.precioClase = 0;
        this.precioEscala = 0;
        this.precioTotal = 0;
    }

    getDestino(){
        return (this.destino);
    }
    getClase(){
        return (this.clase);
    }
    getEscala(){
        return (this.escala);
    }
    getPrecioDestino(){
        return (this.precioDestino);
    }
    getPrecioClase(){
        return (this.precioClase);
    }
    getPrecioEscala(){
        return (this.precioEscala);
    }
    getPrecioTotal(){
        return (this.precioTotal);
    }

    setDestino(){
        let destino = (prompt('Elija el lugar donde desea viajar: Venecia, Madrid, Londres, Miami')).toLowerCase();
        switch (destino) {
            case 'venecia':
                this.destino = 'Venecia';
                this.precioDestino = 90000;
                break;
            case 'madrid':
                this.destino = 'Madrid';
                this.precioDestino = 110000;
                break;
            case 'londres':
                this.destino = 'Londres';
                this.precioDestino = 95000;
                break;
            default:
                this.destino = 'Miami';
                this.precioDestino = 70000;
                break;
        }
    }
    setClase(){
        let clase = (prompt('Elija el tipo de asiento en el que desea viajar: turista, premium, ejecutiva, primera clase')).toLowerCase();
        switch (clase) {
            case 'turista':
                this.clase = 'Turista';
                this.precioClase = 0;
                break;
            case 'premium':
                this.clase = 'Premium';
                this.precioClase = 5000;
                break;
            case 'ejecutiva':
                this.clase = 'Ejecutiva';
                this.precioClase = 9000;
                break;
            default:
                this.clase = 'Primera Clase';
                this.precioClase = 15000;
                break;
        }
    }
    setEscala(escala){
        let aux = (prompt('Seleccione si desea que su viaje tenga escalas o sea directo. Elija SI para que tenga escala o NO para que sea directo.')).toLowerCase();
        if (aux == 'si') {
            this.escala = 'Si';
            this.precioEscala = 0;
        } else {
            this.escala = 'No';
            this.precioEscala = 12000;
        }
    }

    calcularCostoTotal (){
        this.precioTotal = this.precioDestino + this.precioClase + this.precioEscala;
    }
}

//ARREGLOS

const arregloPasajes = [];

//VARIABLES

let cantPasajes = 0;

//FUNCIONES


//Genera un pasasje
function generarPasaje(){
    alert('Gracias por utilizar AirWolrd. Nos alegra atenderlo.');

    const pasaje = new Pasaje();
    
    pasaje.setDestino();

    pasaje.setClase();

    pasaje.setEscala();

    pasaje.calcularCostoTotal();

    cantidadPasajes(cantPasajes,pasaje);
}

//Solicita que el usuario ingrese la cantidad de pasajes de que desea comprar
function cantidadPasajes(cantPasajes, pasaje){
    cantPasajes = parseInt(prompt('Ingrese con un número la cantidad de pasajes que desea comprar.'));

    for (i = cantPasajes; i > 0; i--){
        arregloPasajes.push(pasaje);
    }

    console.log(arregloPasajes);
    console.log(arregloPasajes[1]);
}

//PROGRAMA PRINCIPAL

generarPasaje();
 