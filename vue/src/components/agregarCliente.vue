<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    
data(){
    return {
        nombreCliente: "",
        telefonoCliente:"",
        estado: "",
        estadoP: "",
        nombreProveedor: "",
        telefonoProveedor: "",

    }
},

created(){
    this.getCitas()
},
methods: {

    getCitas(){
    fetch("http://localhost:8000/restaurant")
    .then((response) => response.json())
    .then((json) => {
        //console.log(json.categorias);
        this.persona = json.categorias;
        console.log(this.persona)
    })
    },   
    agregarCliente(nombre,telefono){
      fetch("http://localhost:8000/cliente/" +nombre+"/" +telefono)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        this.estado = json
        const customId = 'custom-id'
        if(this.estado.ok){
                document.getElementById("todoCorrecto").innerHTML = this.estado.descripcion
            }else{
                var comprobanteCorrecto =  document.getElementById("telefonoCorrecto");
                if(comprobanteCorrecto == null){
                document.getElementById("todoCorrecto").innerHTML = ""
                toast.error(this.estado.descripcion, {
                            autoClose: 4000,
                            limit: 2,
                            toastId: customId,
                            pauseOnFocusLoss: false,
                            transition: toast.TRANSITIONS.FLIP,
                        });

                    document.getElementById("telefonoIncorrecto").innerHTML = this.estado.descripcion
                }else{
                    toast.success(this.estado.descripcion, {
                            autoClose: false, // Para que no se cierre automáticamente
                            hideProgressBar: true, // Para ocultar la barra de progreso
                            toastId: customId,
                            pauseOnFocusLoss: false,
                            transition: toast.TRANSITIONS.FLIP,
                        });

                    document.getElementById("telefonoCorrecto").innerHTML = ""
                document.getElementById("todoCorrecto").innerHTML = this.estado.descripcion

                }
            }
    })  
    },
    agregarProveedor(nombre,telefono){
        fetch("http://localhost:8000/proveedor/" +nombre+"/" +telefono)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.estadoP = json
            
            if(this.estadoP.ok){
                
                    document.getElementById("todoCorrectoP").innerHTML = this.estadoP.descripcion
                }else{
                    var comprobanteCorrecto =  document.getElementById("telefonoCorrectoP");
                    if(comprobanteCorrecto == null){
                    document.getElementById("todoCorrectoP").innerHTML = ""
                        const customId = 'custom-id'
                        toast.error(this.estadoP.descripcion, {
                            autoClose: 4000,
                            limit: 2,
                            toastId: customId,
                            pauseOnFocusLoss: false,
                            transition: toast.TRANSITIONS.FLIP,
                        });

                        document.getElementById("telefonoIncorrectoP").innerHTML = this.estadoP.descripcion
                    }else{
                        const customId = 'custom-id'
                        toast.success(this.estadoP.descripcion, {
                            autoClose: false, // Para que no se cierre automáticamente
                            hideProgressBar: true, // Para ocultar la barra de progreso
                            toastId: customId,
                            pauseOnFocusLoss: false,
                            transition: toast.TRANSITIONS.FLIP,
                        });

                        document.getElementById("telefonoCorrectoP").innerHTML = ""
                    document.getElementById("todoCorrectoP").innerHTML = this.estadoP.descripcion

                    }
                }
        })  
    },
    comprobacionAgregarCliente(nombre,telefono){
        const customId = 'custom-id'
       if((nombre == "" || telefono == "")){
        toast.error("los campos o algun campo esta vacio", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
            });
        this.nombreCliente = ""
        this.telefonoCliente =  ""
       }else{
        document.getElementById("telefonoIncorrecto").innerHTML = ""
         if(this.telefonoCliente.length !== 9 || isNaN(this.telefonoCliente)){
            
            toast.error("el telefono debe ser de 9 digitos y numerico", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
            });
    
            //document.getElementById("telefonoIncorrecto").innerHTML = "el telefono debe ser de 9 digitos y numerico"
         }else{
            document.getElementById("telefonoIncorrecto").innerHTML = ""
            document.getElementById("todoCorrectoP").innerHTML = ""
            this.agregarCliente(nombre,telefono);
        
         }
       }
    },
    comprobacionAgregarProveedor(nombre,telefono){
        const customId = 'custom-id'
        if((nombre == "" || telefono == "")){
            toast.error("los campos o algun campo esta vacio", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
            });
        this.nombreProveedor = ""
        this.telefonoProveedor =  ""
       }else{
        document.getElementById("telefonoIncorrectoP").innerHTML = ""
         if(this.telefonoProveedor.length !== 9 || isNaN(this.telefonoProveedor)){
            toast.error("el telefono debe ser de 9 digitos y numerico", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
            });

         }else{
            document.getElementById("telefonoIncorrectoP").innerHTML = ""
            document.getElementById("todoCorrectoP").innerHTML = ""
            this.agregarProveedor(nombre,telefono);
        
         }
       }
    }
}

}

</script>

<template>
  
  <div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-6">
            <div>
                <h1>Agregar Cliente</h1>
                <div id="cajaGeneral" class="rounded border border-primary">
                    <label id="labels" for="">Nombre Cliente</label>
                    <br>
                    <input type="text" id="nombreC" class="form-control" v-model="nombreCliente" required>
                    <br>
                    <label id="labels" for="">Telefono Cliente</label>
                    <br>
                    <input type="text" id="telefonoC" class="form-control" v-model="telefonoCliente" required>
                    
                    <button type="submit" id="botoncito"  class="btn btn-sm btn-primary" @click="comprobacionAgregarCliente(nombreCliente,telefonoCliente)">Enviar</button>
                    <div>
                        <span id="telefonoIncorrecto" style="color:red"></span>
                        <span id="todoCorrecto" style="color:green"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-md-6">
            <div >
                <h1>Agregar Proveedores</h1>
                <div id="cajaGeneral" class="rounded border border-primary">
                    <label id="labels" for="">Nombre Proveedor</label>
                    <br>
                    <input type="text" id="nombreP" class="form-control" v-model="nombreProveedor" required>
                    <br>
                    <label id="labels" for="">Telefono Proveedor</label>
                    <br>
                    <input type="text" id="telefonoP" class="form-control" v-model="telefonoProveedor" required>
                    <button type="submit" id="botoncito" class="btn btn-sm btn-primary" @click="comprobacionAgregarProveedor(nombreProveedor,telefonoProveedor)">Enviar</button>
                    <div>
                        <span id="telefonoIncorrectoP" style="color:red"></span>
                        <span id="todoCorrectoP" style="color:green"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  </template>
  
  <style>
  .read-the-docs {
    color: #888;
  }



  #botoncito{

    margin-top:2rem;
    margin-bottom: 1rem;
    font-size: 2rem;
    width:7rem;
    height: 3.5rem;
  }
  #labels{
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  #telefonoP, #nombreP, #nombreC , #telefonoC{

   width: 500px;
   margin: 0 auto;
   max-width: 500px;
   min-width: 375px
  
  }
  </style>