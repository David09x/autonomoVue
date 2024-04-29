export default class pantallaCarga{

    constructor(){
        this.contador = 0;
        this.id =  "contenedorCargando"
        
    }
    //para la 1 vez que se crea
    contadorAumentando(texto,estado){
        
        this.contador++
        if(this.contador == 1){
          const body =  document.body;
          var divPrincipal = document.getElementById(this.id);
          if(!divPrincipal){
            divPrincipal = document.createElement("div")
            divPrincipal.setAttribute("id", this.id)
          }
          const divCargando = document.createElement("div")
          divCargando.className= "container2" 
          const contenedor1 =  document.createElement("div")
          contenedor1.className = "cargando";
          const contenedorPelota1 = document.createElement("div")
          contenedorPelota1.className = "pelotas"
          const contenedorPelota2 = document.createElement("div")
          contenedorPelota2.className = "pelotas"
          const contenedorPelota3 = document.createElement("div")
          contenedorPelota3.className = "pelotas"
          const spanTexto = document.createElement("span")
          spanTexto.className  = "texto-cargando"
          spanTexto.textContent = texto;
          contenedor1.appendChild(contenedorPelota1);
          contenedor1.appendChild(contenedorPelota2);
          contenedor1.appendChild(contenedorPelota3);
          contenedor1.appendChild(spanTexto);
          divCargando.appendChild(contenedor1)
          divPrincipal.appendChild(divCargando);
          body.appendChild(divPrincipal);
          //carga principal que es cuando inicias por primera vez
          divPrincipal.style.width = '100vw';
          divPrincipal.style.height = '100vh'
          //app.style.maxWidth ='100vw'
          divPrincipal.style.zIndex = '10000'
          divPrincipal.style.top = '0'
          divPrincipal.style.left = '0'
          divPrincipal.style.position = 'fixed'
          if(estado == 1){
            divPrincipal.style.background ='#80808030'
          }else{
            divPrincipal.style.background ='#80808000'
          } 
        }
    }

    borrarCargando(){
        this.contador--;
        if(this.contador <= 0){
          this.contador = 0;
          const elemento = document.getElementById(this.id);
          elemento.innerHTML = '';
          elemento.style = '';
        }
    }
 
}




