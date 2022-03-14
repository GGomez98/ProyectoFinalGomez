//constructor de objetos juego
class Juego{
    constructor(id, nombre, anioDeLanzamiento, genero, precio, tieneDescuento, empresa, imagen){
        this.id = id
        this.nombre = nombre;
        this.anioDeLanzamiento = anioDeLanzamiento;
        this.genero = genero;
        this.precio = precio;
        this.cantidadEnStock = 60;
        this.agotado = false;
        this.tieneDescuento = tieneDescuento;
        this.empresa = empresa;
        this.imagen = imagen;
        this.cantidadEnCarrito = 0;
    }
    //Añade el juego a la lista carrito siempre y cuando este disponible
    agregarAlCarrito(){
        if(!this.agotado){
        this.cantidadEnCarrito +=1;
        this.cantidadEnStock-=1;
        }
        if(this.cantidadEnStock==0){
            this.agotado = true;
        }
        if(!carrito.some(element => element.id==this.id)){
        carrito.push(this);
        }
        else {
            for(const element of carrito) {
                if (element === this) {
                    element.cantidadEnCarrito;
                    break;
                }
            }
        }
    }
    //realiza la compra del producto si el mismo se encuentra dentro del carrito
    comprar(){
        if(carrito.indexOf(this)!=-1){
            let total = this.precio*(this.cantidadEnCarrito);
            if(this.tieneDescuento){
                total = calcularPorcentaje(calcularPorcentaje(total,'Restar',20),'Sumar',21);
            }
            else{
                total = calcularPorcentaje(total,'Sumar',21);
            }
            this.cantidadEnCarrito = 0;
            return total;
        }
    }

    eliminar(){
        this.cantidadEnStock += this.cantidadEnCarrito;
        this.cantidadEnCarrito = 0;
    }
};

let listaDeJuegos = [];
let listaEnPantalla = [];
let carrito=[];

