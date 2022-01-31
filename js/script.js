let carrito=[];
//calcula el porcentaje y dependiendo del caso lo suma o lo resta
function calcularPorcentaje(valor,operacion,porcentaje){
    switch(operacion){
        case "Sumar":
            valor+=valor*porcentaje/100;
            break;
        case "Restar":
            valor-=valor*porcentaje/100;
            break;
    }
    return valor;
}
//constructor de objetos juego
class Juego{
    constructor(nombre, anioDeLanzamiento, genero, precio, tieneDescuento, empresa, imagen){
        this.nombre = nombre;
        this.anioDeLanzamiento = anioDeLanzamiento;
        this.genero = genero;
        this.precio = precio;
        this.cantidadEnStock = 60;
        this.agotado = false;
        this.tieneDescuento = tieneDescuento;
        this.empresa = empresa;
        this.imagen = this.imagen
    }
    //Añade el juego a la lista carrito siempre y cuando este disponible
    agregarAlCarrito(){
        let cantidadAComprar = parseInt(prompt('Ingrese la cantidad que desea comprar'));
        while(cantidadAComprar>this.cantidadEnStock){
            alert('Cantidad no disponible, ingrese otra');
            cantidadAComprar = prompt('Ingrese la cantidad que desea comprar');
        }
        this.cantidadEnStock-=cantidadAComprar;
        cantidadAComprar = 0;
        if(this.cantidadEnStock==0){
            this.agotado = true;
        }
        if(carrito.some(element => element==this)){
            carrito.find(element => element==this).cantidadEnStock-=cantidadAComprar;
        }
        else{
        carrito.push(this);
        }
    }
    //realiza la compra del producto si el mismo se encuentra dentro del carrito
    comprar(){
        if(carrito.indexOf(this)!=-1){
            let total = this.precio*(60-this.cantidadEnStock);
            if(this.tieneDescuento){
                total = calcularPorcentaje(total,'Restar',20);
            }
            alert('Compra realizada. El costo total es de $'+total);
        }
        carrito.splice(carrito.indexOf(this),1);
    }
};

//Compra todos los elementos del carrito
function comprarTodo(){
    if(carrito!=''){
        const juegosConDescuento = carrito.filter(juego => juego.tieneDescuento);
        const juegosSinDescuento = carrito.filter(juego => !juego.tieneDescuento);
        let totalJuegosConD = juegosConDescuento.reduce((acc,elem)=>acc+calcularPorcentaje(calcularPorcentaje((elem.precio)*(60-elem.cantidadEnStock),'Sumar',21),'Restar',20),0);
        let totalJuegosSinD = juegosSinDescuento.reduce((acc,elem)=>acc+calcularPorcentaje((elem.precio)*(60-elem.cantidadEnStock),'Sumar',21),0);
        let total = totalJuegosSinD+totalJuegosConD;
        alert('Compra realizada. El costo total es de $'+total);
        carrito = [];
    }
    else{
        alert('El carrito esta vacio');
    }
}

//filtro por rango para valores numericos (año de lanzamiento, precio, etc.)
function filtrarPorRango(){
    let prop = prompt('Ingrese el atributo por el que quiere buscar(precio,anioDeLanzamiento):');
    let min = prompt('Ingrese un valor minimo:');
    let max = prompt('Ingrese un valor maximo:');
    let nombres = ['Se encontraron los siguientes resultados:'];
    let juegosFiltrados = listaDeJuegos.filter(obj => obj[prop]>=min&&obj[prop]<=max);
    for (juego of juegosFiltrados){
        nombres.push(juego.nombre);
    }
    alert(nombres.join('\n'));
}

//filtro por nombre (nombre del juego, empresa, genero)
function filtrarPorNombre(){
    let prop = prompt('Ingrese el atributo por el que quiere buscar(nombre,genero,empresa):');
    let valor = prompt('Ingrese el valor del atributo por el que desea buscar:');
    let nombres = ['Se encontraron los siguientes resultados:']
    let juegosFiltrados = listaDeJuegos.filter(obj => obj[prop] == valor);
    for (juego of juegosFiltrados){
        nombres.push(juego.nombre);
    }
    alert(nombres.join('\n'));
}

//ordenar
function ordenarPor(){
    let valor = prompt('Ingrese el valor por el que desea ordenar la lista(nombre, anioDeLanzamiento, genero, precio, empresa):')
    let orden = prompt('Ingrese el sentido de orden (descendente o ascendente):')
    let nombres = [`Así queda ordenada la lista por ${valor}:`]
    if(orden=='descendente'){
    listaDeJuegos.sort((a, b) => {
        if (a[valor] > b[valor]) {
            return 1;
        }
        if (a[valor] < b[valor]) {
            return -1;
        }
        return 0;
    })
    }
    else if(orden=='ascendente'){
        listaDeJuegos.sort((a, b) => {
            if (a[valor] > b[valor]) {
                return -1;
            }
            if (a[valor] < b[valor]) {
                return 1;
            }
            return 0;
        })
    }
    for (juego of listaDeJuegos){
        nombres.push(juego.nombre);
    }
    alert(nombres.join('\n'));
    
}
//juegos
const juego1 = new Juego('FIFA 22', 2021, 'Deportes', 3000, false, 'Electronic Arts','../images/FIFA22.jpeg');
const juego2 = new Juego('GTA V', 2013, 'Acción', 1200, true, 'Rockstar Games','../images/GTAV.jpeg');
const juego3 = new Juego('Red Dead Redemption II', 2018, 'Acción', 5000, false, 'Rockstar Games', '../images/RDR2.jpeg');

//lista de juegos
let listaDeJuegos = [juego1,juego2,juego3];

//DOM
const seccionJuegos = document.getElementById('juegos')