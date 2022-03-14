//DOM
const seccionJuegos = document.getElementById('juegos');
const seccionCarrito = document.getElementById('juegosEnElCarrito');
const opcionesDeCompra = document.getElementById('opcionesDeCompra');
const form = document.getElementById('filtroForm');

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

//Inserta todos los elementos de listaEnPantalla en el HTML
function crearListaEnPantalla(){
    for (juegoEnPantalla of listaEnPantalla){
        let divJuegoEnPantalla; 
        divJuegoEnPantalla = document.createElement('div');
        divJuegoEnPantalla.innerHTML=
        `<img class='imagenJuego' src=${juegoEnPantalla.imagen} id="${juegoEnPantalla.nombre}_imagen">
        <h2 id="${juegoEnPantalla.nombre}_nombre">${juegoEnPantalla.nombre}</h2>
        <p id="${juegoEnPantalla.nombre}_precio">$${juegoEnPantalla.precio}</p>
        <p id="${juegoEnPantalla.nombre}_anio">Año de lanzamiento: ${juegoEnPantalla.anioDeLanzamiento}</p>
        <p id="${juegoEnPantalla.nombre}_genero">Genero: ${juegoEnPantalla.genero}</p>
        <p id="${juegoEnPantalla.nombre}_empresa">Empresa: ${juegoEnPantalla.empresa}</p>
        <button class='btn_agregarCarrito btn btn-primary' id="${juegoEnPantalla.nombre}_alCarrito">Agregar al carrito</button>`;
        seccionJuegos.appendChild(divJuegoEnPantalla);
        divJuegoEnPantalla.setAttribute('class','juegoEnPantalla card');
        divJuegoEnPantalla.setAttribute('id', `${juegoEnPantalla.id}`);
    }
}

crearListaEnPantalla();

//Agrega elementos al carrito
function agregarALaSeccionCarrito(element){
    let juegoSeleccionado;
    let div;
    juegoSeleccionado = listaEnPantalla[element.id-1];
    juegoSeleccionado.agregarAlCarrito();
    opcionesDeCompra.innerHTML = "<button id='comprarTodo'>Comprar Todo</button>";
    seccionCarrito.innerHTML = '';
    for (const juego of carrito) {
        div = document.createElement('div');
        div.innerHTML = `
        <img class='imagenJuego' src=${juego.imagen}>
        <h2>${juego.nombre}</h2>
        <p id = ${juego.precio}>$${juego.precio}</p>
        <p>Año de lanzamiento: ${juego.anioDeLanzamiento}</p>
        <p>Genero: ${juego.genero}</p>
        <p>Empresa: ${juego.empresa}</p>
        <p>Cantidad: ${juego.cantidadEnCarrito}</p>
        <button class="btn_comprar btn btn-primary">Comprar</button>
        <button class=" btn btn-danger">Eliminar del carrito</button>
        `;
        seccionCarrito.appendChild(div);
        div.setAttribute('class','juegoEnCarrito card');
        div.setAttribute('id',`${carrito.indexOf(juego)+1}`);
    }
    document.querySelectorAll('.juegoEnCarrito').forEach(element => {
        element.children[7].onclick = () => comprarJuego(element)
    });
    document.querySelectorAll('.juegoEnCarrito').forEach(element => {
        element.children[8].onclick = () => eliminarJuego(element)
    });
    document.querySelector('#comprarTodo').onclick = () => comprarTodo();
}

//Compra un elemento del carrito
function comprarJuego(element){
    let juegoAComprar;

    juegoAComprar = carrito[element.id-1];
    swal.fire('Compra realizada',`Usted ha comprado ${juegoAComprar.cantidadEnCarrito} unidades de ${juegoAComprar.nombre} por un total de $${juegoAComprar.comprar()}`,'success')
    juegoAComprar.comprar();
    seccionCarrito.removeChild(element);
    carrito.splice(carrito.indexOf(juegoAComprar),1);
    for(juego of seccionCarrito.childNodes){
       element.id<=juego.id ? juego.setAttribute('id', juego.id-1) : false;
    }
        carrito == ''?opcionesDeCompra.innerHTML = '':false;
}

//elimina un elemento del carrito
function eliminarJuego(element){
    let juegoAEliminar;
    
    juegoAEliminar = carrito[element.id-1];
    juegoAEliminar.eliminar();
    seccionCarrito.removeChild(element);
    carrito.splice(carrito.indexOf(juegoAEliminar),1);
    for(juego of seccionCarrito.childNodes){
        element.id<=juego.id ? juego.setAttribute('id', juego.id-1):false;
    }
        if(carrito == ''){
            opcionesDeCompra.innerHTML = '';
        }
}

function comprarTodo(){
    const divs = document.querySelectorAll('div');
    const juegosConDescuento = carrito.filter(juego => juego.tieneDescuento);
    const juegosSinDescuento = carrito.filter(juego => !juego.tieneDescuento);
    let totalJuegosConD = juegosConDescuento.reduce((acc,elem)=>acc+calcularPorcentaje(calcularPorcentaje((elem.precio)*(elem.cantidadEnCarrito),'Sumar',21),'Restar',20),0);
    let totalJuegosSinD = juegosSinDescuento.reduce((acc,elem)=>acc+calcularPorcentaje((elem.precio)*(elem.cantidadEnCarrito),'Sumar',21),0);
    let total = totalJuegosSinD+totalJuegosConD;
    swal.fire('Compra realizada', 'El costo total es de $'+total, 'success');
        for(juego of carrito){
            seccionCarrito.removeChild(seccionCarrito.firstChild);
            juego.cantidadEnCarrito = 0;
        }
    opcionesDeCompra.innerHTML = '';
    carrito = [];
}

//filtro por rango para valores numericos (año de lanzamiento, precio, etc.)
function filtrarPorRango(prop,min,max){
    let i;
    min = parseInt(min);
    max = parseInt(max);

    i= 1;
    for(juego of listaEnPantalla){
        seccionJuegos.removeChild(seccionJuegos.firstElementChild)
    }
    listaEnPantalla = listaDeJuegos.filter(obj => obj[prop]>=min&&obj[prop]<=max);
    crearListaEnPantalla();
    for(juego of seccionJuegos.childNodes){
        juego.setAttribute('id', i);
        i++;
    }
    document.querySelectorAll('.juegoEnPantalla').forEach(element => {
        element.children[6].onclick = () => agregarALaSeccionCarrito(element);
    });
}

//filtro por nombre (nombre del juego, empresa, genero)
function filtrarPorNombre(prop, valor){
    let i;

    i= 1;
    for(juego of listaEnPantalla){
        seccionJuegos.removeChild(seccionJuegos.firstElementChild);
    }
    listaEnPantalla = listaDeJuegos.filter(obj => obj[prop] == valor);
    crearListaEnPantalla();
    for(juego of seccionJuegos.childNodes){
        juego.setAttribute('id', i);
        i++;
    }
    document.querySelectorAll('.juegoEnPantalla').forEach(element => {
        element.children[6].onclick = () => agregarALaSeccionCarrito(element);
    });
}

//ordenar
function ordenarPor(){
    let valor = prompt('Ingrese el valor por el que desea ordenar la lista(nombre, anioDeLanzamiento, genero, precio, empresa):')
    let orden = prompt('Ingrese el sentido de orden (descendente o ascendente):')
    let i;

    i= 1;
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
    for(juego of seccionJuegos.childNodes){
        juego.setAttribute('id', i);
        i++;
    }
    document.querySelectorAll('.juegoEnPantalla').forEach(element => {
        element.children[6].onclick = () => agregarALaSeccionCarrito(element);
    });
}

//devuelve la lista por default
function volverAListaPorDefault(){
    for(juego of listaEnPantalla){
        seccionJuegos.removeChild(seccionJuegos.firstElementChild);
    }
    listaEnPantalla = [...listaDeJuegos];
    crearListaEnPantalla();
    document.querySelectorAll('.juegoEnPantalla').forEach(element => {
        element.children[6].onclick = () => agregarALaSeccionCarrito(element);
    });
}

fetch('/JSON/juegos.json')
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((producto) => {
            listaDeJuegos.push(new Juego(producto.id, producto.nombre, producto.anioDeLanzamiento, producto.genero, producto.precio, producto.tieneDescuento, producto.empresa, producto.imagen));
        });
        listaEnPantalla = [...listaDeJuegos];
        crearListaEnPantalla();
        document.querySelectorAll('.juegoEnPantalla').forEach(element => {
            element.children[6].onclick = () => agregarALaSeccionCarrito(element);
        });
        
        document.querySelector('#aplicarFiltros').addEventListener('click',function(){
            event.preventDefault();
            if(!isNaN(form.children[4].value)&&form.children[4]!=''&&!isNaN(form.children[5].value)&&form.children[5]!=''){
                filtrarPorRango('precio',form.children[4].value,form.children[5].value);
            }
            if(!isNaN(form.children[1].value)&&form.children[1]!=''&&!isNaN(form.children[2].value)&&form.children[2]!=''){
                filtrarPorRango('anioDeLanzamiento',form.children[1].value,form.children[2].value);
            }
            if(form.children[9].value != ''){
                filtrarPorNombre('genero',form.children[9].value);
            }
            if(form.children[7].value != ''){
                filtrarPorNombre('empresa',form.children[7].value);
            }

            const quitarFiltros = document.createElement('button');
            let forma = document.querySelector('#filtroForm');
            quitarFiltros.innerHTML='Quitar filtros';
            forma.appendChild(quitarFiltros);

            quitarFiltros.addEventListener('click',function(){
                volverAListaPorDefault();
            })

        });
    })
    .catch(()=>{
        console.log('Fallo');
    })