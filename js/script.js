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
        this.imagen = imagen;
    }
    //Añade el juego a la lista carrito siempre y cuando este disponible
    agregarAlCarrito(){
        /*let cantidadAComprar = parseInt(prompt('Ingrese la cantidad que desea comprar'));
        while(cantidadAComprar>this.cantidadEnStock){
            alert('Cantidad no disponible, ingrese otra');
            cantidadAComprar = prompt('Ingrese la cantidad que desea comprar');
        }
        this.cantidadEnStock-=cantidadAComprar;
        this.cantidadEnCarrito = (60-this.cantidadEnStock);
        cantidadAComprar = 0;*/
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
            let total = this.precio*(this.cantidadEnCarrito);
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
        let totalJuegosConD = juegosConDescuento.reduce((acc,elem)=>acc+calcularPorcentaje(calcularPorcentaje((elem.precio)*(elem.cantidadEnCarrito),'Sumar',21),'Restar',20),0);
        let totalJuegosSinD = juegosSinDescuento.reduce((acc,elem)=>acc+calcularPorcentaje((elem.precio)*(60-elem.cantidadEnCarrito),'Sumar',21),0);
        let total = totalJuegosSinD+totalJuegosConD;
        alert('Compra realizada. El costo total es de $'+total);
        carrito = [];
    }
    else{
        alert('El carrito esta vacio');
    }
}

//juegos
const juego1 = new Juego('FIFA 22', 2021, 'Deportes', 3000, false, 'Electronic Arts','Images/FIFA22.jpg');
const juego2 = new Juego('GTA V', 2013, 'Acción', 1200, true, 'Rockstar Games','Images/GTAV.jpg');
const juego3 = new Juego('Red Dead Redemption II', 2018, 'Acción', 5000, false, 'Rockstar Games', 'Images/RDR2.jpg');
const juego4 = new Juego('Watch Dogs', 2014, 'Acción', 4500, false, 'Ubisoft', 'https://d3ugyf2ht6aenh.cloudfront.net/stores/082/436/products/watchdogs1-522d160934f06e06f416283801676508-640-0.jpg');

//lista de juegos
let listaDeJuegos = [juego1,juego2,juego3,juego4];
let listaEnPantalla = listaDeJuegos;
let juego;

//DOM
const seccionJuegos = document.getElementById('juegos');
const seccionCarrito = document.getElementById('carrito')

//coloca todos los objetos en el html
function crearListaEnPantalla(){
    for (juegoEnLista of listaEnPantalla){
        juego = document.createElement('div');
        juego.innerHTML=
        `<img class='imagenJuego' src=${juegoEnLista.imagen}>
        <h2>${juegoEnLista.nombre}</h2>
        <p>$${juegoEnLista.precio}</p>
        <p>Año de lanzamiento: ${juegoEnLista.anioDeLanzamiento}</p>
        <p>Genero: ${juegoEnLista.genero}</p>
        <p>Empresa: ${juegoEnLista.empresa}</p>
        <button class='btn_agregarCarrito' id='${listaEnPantalla.indexOf(juegoEnLista)+1}'>Agregar al carrito</button>`;
        seccionJuegos.appendChild(juego);
        juego.setAttribute('class','juegoEnLista');
        juego.setAttribute('id',`${listaEnPantalla.indexOf(juegoEnLista)+1}`)
    }
}
crearListaEnPantalla();

//carrito
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
//filtro por rango para valores numericos (año de lanzamiento, precio, etc.)
function filtrarPorRango(){
    let prop = prompt('Ingrese el atributo por el que quiere buscar(precio,anioDeLanzamiento):');
    let min = prompt('Ingrese un valor minimo:');
    let max = prompt('Ingrese un valor maximo:');
    let juegosFiltrados = listaDeJuegos.filter(obj => obj[prop]>=min&&obj[prop]<=max);
    for(juego of listaEnPantalla){
        seccionJuegos.removeChild(seccionJuegos.firstElementChild)
    }
    listaEnPantalla = juegosFiltrados;
    crearListaEnPantalla();
    agregarAlCarrito();
}

//filtro por nombre (nombre del juego, empresa, genero)
function filtrarPorNombre(){
    let prop = prompt('Ingrese el atributo por el que quiere buscar(nombre,genero,empresa):');
    let valor = prompt('Ingrese el valor del atributo por el que desea buscar:');
    let juegosFiltrados = listaDeJuegos.filter(obj => obj[prop] == valor);
    for(juego of listaEnPantalla){
        seccionJuegos.removeChild(seccionJuegos.firstElementChild)
    }
    listaEnPantalla = juegosFiltrados;
    crearListaEnPantalla();
    agregarAlCarrito();
}

//ordenar
function ordenarPor(){
    let valor = prompt('Ingrese el valor por el que desea ordenar la lista(nombre, anioDeLanzamiento, genero, precio, empresa):')
    let orden = prompt('Ingrese el sentido de orden (descendente o ascendente):')
    if(orden=='descendente'){
    listaEnPantalla.sort((a, b) => {
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
        listaEnPantalla.sort((a, b) => {
            if (a[valor] > b[valor]) {
                return -1;
            }
            if (a[valor] < b[valor]) {
                return 1;
            }
            return 0;
        })
    }
    for(juego of listaEnPantalla){
        seccionJuegos.removeChild(seccionJuegos.firstElementChild);
    }
    crearListaEnPantalla();
    agregarAlCarrito();
    
}

//devuelve la lista por default
function volverAListaPorDefault(){
    for(juego of listaEnPantalla){
        seccionJuegos.removeChild(seccionJuegos.firstElementChild);
    }
    listaEnPantalla = listaDeJuegos;
    crearListaEnPantalla();
    agregarAlCarrito();
}

//Eventos
function agregarAlCarrito(){
    let botonesAgregarCarrito = document.querySelectorAll('.btn_agregarCarrito');

    botonesAgregarCarrito.forEach(function(boton){
    boton.addEventListener('click',function(){
        if(carrito.length==0){
            seccionCarrito.innerHTML='<button>Comprar Todo</button>';
        }
        listaEnPantalla[boton.id-1].agregarAlCarrito();
        if(!document.getElementById(`juegoEnCarrito${boton.id}`)){
        juegoEnCarrito = document.createElement('div');
        juegoEnCarrito.innerHTML=
        `<img class='imagenJuego' src=${listaEnPantalla[boton.id-1].imagen}>
        <h2>${listaEnPantalla[boton.id-1].nombre}</h2>
        <p>$${listaEnPantalla[boton.id-1].precio}</p>
        <p>Año de lanzamiento: ${listaEnPantalla[boton.id-1].anioDeLanzamiento}</p>
        <p>Genero: ${listaEnPantalla[boton.id-1].genero}</p>
        <p>Empresa: ${listaEnPantalla[boton.id-1].empresa}</p>
        <p id='cantidadEnCarrito'>Cantidad en carrito:${60 - listaEnPantalla[boton.id-1].cantidadEnStock}</p>
        <div>
            <button class='restarCantidad' id=juegoEnCarritoRestar${boton.id}>-</button>
            <input value='0' class='inputCantidad' id =juegoEnCarritoCantiad${boton.id}>
            <button class='sumarCantidad' id=juegoEnCarritoSumar${boton.id}>+</button>
        </div>
        <button class='btn_agregarCarrito'>Comprar</button>`;
        juegoEnCarrito.setAttribute('id',`juegoEnCarrito${boton.id}`)
        seccionCarrito.appendChild(juegoEnCarrito);
        }
        document.getElementById(`juegoEnCarrito${boton.id}`).children[6].innerText = `Cantidad en carrito: ${listaEnPantalla[boton.id-1].cantidadEnCarrito}`;
    });
})
};

function agregarOSumarAlCarrito(){
    let inputs = document.querySelectorAll('inputsCantidad')
    let botonesRestar = document.querySelectorAll('.restarCantidad');
    let botonesSumar = document.querySelectorAll('.sumarCantidad');
}

agregarAlCarrito();

