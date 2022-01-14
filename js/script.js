let valorFinal = 0;
let valorDeCuotas = 0;

class Juego{
    constructor(nombre, anioDeLanzamiento, genero, precio){
        this.nombre = nombre;
        this.anioDeLanzamiento = anioDeLanzamiento;
        this.genero = genero;
        this.precio = precio;
    }
}

const juego1 = new Juego('FIFA 22', 2021, 'Deportes', 3000);

function ingresarSubtotal(){
    let subtotal= parseInt(prompt('Ingrese el monto a pagar'));
    while(subtotal<1000){
        alert('Ingrese un monto mayor o igual a 1000');
        subtotal= parseInt(prompt('Ingrese el monto a pagar'));
    }
    valorFinal+=subtotal;
}

function ingresarCuotas(){
    let cuotas = parseInt(prompt('Ingrese la cantidad de cuotas en las que desea pagar (1,3,6 o 12)'));
    while(cuotas!=3&&cuotas!=1&&cuotas!=6&&cuotas!=12){
        alert('Número de cuotas invalido. Seleccione entre 1,3,6 o 12');
        cuotas = parseInt(prompt('Ingrese la cantidad de cuotas en las que desea pagar (1,3,6 o 12)'));
    }
    valorFinal+= valorFinal*0.21
    switch(cuotas){
        case 3:
            valorDeCuotas = (valorFinal/3)+valorFinal*0.01;
            valorFinal = valorDeCuotas*3;
        break;
        case 6:
            valorDeCuotas = (valorFinal/6)+valorFinal*0.02;
            valorFinal = valorDeCuotas*6;
        break;
        case 12:
            valorDeCuotas = (valorFinal/12)+valorFinal*0.03;
            valorFinal = valorDeCuotas*12;
        break;
    }
}

function calcularValorFinal(){
    ingresarSubtotal();
    ingresarCuotas();
    if(valorDeCuotas==0){
        alert('El valor final es de $'+valorFinal)
    }
    else{
        alert('Cada cuota vale $'+valorDeCuotas+' y el valor final es de $'+valorFinal)
    }
}

calcularValorFinal();