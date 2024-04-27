<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    
data(){
    return {
        nombreCliente: "",
        telefonoCliente:"",
        nombreProveedor: "",
        telefonoProveedor: "",
        estadoP: "",
        estado: "",

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
            //document.getElementById("todoCorrecto").innerHTML = this.estado.descripcion
            const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
                toast.update(customId, {type: toast.TYPE.SUCCESS, render: this.estado.descripcion});
            } else {
                // Si no hay un toast activo, mostrar uno nuevo
                toast.success(this.estado.descripcion, {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
                });
            }
            this.nombreCliente=  ""
            this.telefonoCliente= ""
            this.nombreProveedor= ""
            this.telefonoProveedor= ""
        }else{
            var comprobanteCorrecto =  document.getElementById("telefonoCorrecto");
            if(comprobanteCorrecto == null){
            document.getElementById("todoCorrecto").innerHTML = ""
            const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
                toast.update(customId, {type: toast.TYPE.ERROR, render: this.estado.descripcion});
            } else {
                // Si no hay un toast activo, mostrar uno nuevo
                toast.error(this.estado.descripcion, {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
                });
            }
            

                document.getElementById("telefonoIncorrecto").innerHTML = this.estado.descripcion
            }else{
            
            const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
                toast.update(customId, {type: toast.TYPE.SUCCESS, render: this.estado.descripcion});
            } else {
                // Si no hay un toast activo, mostrar uno nuevo
                toast.success(this.estado.descripcion, {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
                });
            }
            this.nombreCliente=  ""
            this.telefonoCliente= ""
            this.nombreProveedor= ""
            this.telefonoProveedor= ""
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
                const customId = 'custom-id'
                    //document.getElementById("todoCorrectoP").innerHTML = this.estadoP.descripcion
                    if (toast.isActive(customId)) {
                    // Si hay un toast activo, cerrarlo
                        toast.update(customId, {type: toast.TYPE.SUCCESS, render: this.estadoP.descripcion});
                    } else {
                        // Si no hay un toast activo, mostrar uno nuevo
                        toast.success(this.estadoP.descripcion, {
                        autoClose: 4000,
                        pauseOnFocusLoss: false,
                        transition: toast.TRANSITIONS.FADE,
                        toastId: "custom-id"
                        });
                    }
                    //document.getElementById("telefonoCorrecto").innerHTML = "proveedor agregado"
                    this.nombreCliente=  ""
                    this.telefonoCliente= ""
                    this.nombreProveedor= ""
                    this.telefonoProveedor= ""
                }else{
                    var comprobanteCorrecto =  document.getElementById("telefonoCorrectoP");
                    if(comprobanteCorrecto == null){
                    document.getElementById("todoCorrectoP").innerHTML = ""
                        
                        const customId = 'custom-id'
                        // Verificar si hay un toast activo con el ID "custom-id"
                        if (toast.isActive(customId)) {
                        // Si hay un toast activo, cerrarlo
                            toast.update(customId, {type: toast.TYPE.ERROR, render: this.estadoP.descripcion});
                        } else {
                            // Si no hay un toast activo, mostrar uno nuevo
                            toast.error(this.estadoP.descripcion, {
                            autoClose: 4000,
                            pauseOnFocusLoss: false,
                            transition: toast.TRANSITIONS.FADE,
                            toastId: "custom-id"
                            });
                        }
                        document.getElementById("telefonoIncorrectoP").innerHTML = this.estadoP.descripcion
                    }else{
                        const customId = 'custom-id'
                    //document.getElementById("todoCorrectoP").innerHTML = this.estadoP.descripcion
                    if (toast.isActive(customId)) {
                    // Si hay un toast activo, cerrarlo
                        toast.update(customId, {type: toast.TYPE.SUCCESS, render: this.estadoP.descripcion});
                    } else {
                        // Si no hay un toast activo, mostrar uno nuevo
                        toast.success(this.estadoP.descripcion, {
                        autoClose: 4000,
                        pauseOnFocusLoss: false,
                        transition: toast.TRANSITIONS.FADE,
                        toastId: "custom-id"
                        });
                    }
                        this.nombreCliente=  ""
                        this.telefonoCliente= ""
                        this.nombreProveedor= ""
                        this.telefonoProveedor= ""
                        document.getElementById("telefonoCorrectoP").innerHTML = ""
                    document.getElementById("todoCorrectoP").innerHTML = this.estadoP.descripcion

                    }
                }
        })  
    },
    comprobacionAgregarCliente(nombre,telefono){
        const customId = 'custom-id'
       if((nombre == "" || telefono == "")){
        const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
                toast.update(customId, {type: toast.TYPE.ERROR, render: "los campos o algun campo esta vacio"});
            } else {
                // Si no hay un toast activo, mostrar uno nuevo
                toast.error("los campos o algun campo esta vacio", {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
                });
            }
            this.nombreCliente=  ""
            this.telefonoCliente= ""
       
       }else{
        document.getElementById("telefonoIncorrecto").innerHTML = ""
         if(this.telefonoCliente.length !== 9 || isNaN(this.telefonoCliente)){
            const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
                toast.update(customId, {type: toast.TYPE.ERROR, render: "el telefono debe ser de 9 digitos y numerico"});
            } else {
                // Si no hay un toast activo, mostrar uno nuevo
                toast.error("el telefono debe ser de 9 digitos y numerico", {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
                });
            }

            document.getElementById("nombreC").value = ""
            document.getElementById("telefonoC").value = ""
            document.getElementById("telefonoIncorrecto").innerHTML = "el telefono debe ser de 9 digitos y numerico"
         }else{
             document.getElementById("telefonoIncorrecto").innerHTML = ""
             document.getElementById("todoCorrecto").innerHTML = ""
             this.agregarCliente(nombre,telefono);
             document.getElementById("todoCorrecto").innerHTML = "se agrego el cliente"
             setTimeout(function() {
                document.getElementById("todoCorrecto").innerHTML = "";
            }, 1500); // 1200 milisegundos = 1,2 segundos
            this.nombreCliente = ""
            this.telefonoCliente = ""
        
         }
       }
    },
    comprobacionAgregarProveedor(nombre,telefono){
        const customId = 'custom-id'
        if((nombre == "" || telefono == "")){
            const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
                toast.update(customId, {type: toast.TYPE.ERROR, render: "los campos o algun campo esta vacio"});
            } else {
                // Si no hay un toast activo, mostrar uno nuevo
                toast.error("los campos o algun campo esta vacio", {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
                });
            }
        this.nombreProveedor = ""
        this.telefonoProveedor =  ""
       }else{
        document.getElementById("telefonoIncorrectoP").innerHTML = ""
         if(this.telefonoProveedor.length !== 9 || isNaN(this.telefonoProveedor)){
            const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
                toast.update(customId, {type: toast.TYPE.ERROR, render: "el telefono debe ser de 9 digitos y numerico"});
            } else {
                // Si no hay un toast activo, mostrar uno nuevo
                toast.error("el telefono debe ser de 9 digitos y numerico", {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
                });
            }

         }else{
            document.getElementById("telefonoIncorrectoP").innerHTML = ""
            document.getElementById("todoCorrectoP").innerHTML = ""
            this.agregarProveedor(nombre,telefono);
            document.getElementById("todoCorrectoP").innerHTML = "se agrego el proveedor"
             setTimeout(function() {
                document.getElementById("todoCorrectoP").innerHTML = "";
            }, 1500); // 1200 milisegundos = 1,2 segundos
            this.nombreProveedor = ""
            this.telefonoProveedor =""
        
         }
       }
    }
}

}

</script>

<template>
  
  <div class="container px-5 my-5">
    <div class="row justify-content-center">
        <div class="col-lg-12">
            <div class="row">
                <!-- Columna para Agregar Cliente -->
                <div class="col-md-6">
                    <div class="card border-0 rounded-3 shadow-lg">
                        <div class="card-body p-5">
                            <div class="text-center">
                                <h1 class="fw-light">Agregar Cliente</h1>
                            </div>
                            <div>
                                <label for="nombreC" class="form-label">Nombre Cliente:</label>
                                <input type="text" id="nombreC" class="form-control" v-model="nombreCliente" required>
                                <label for="telefonoC" class="form-label mt-3">Telefono Cliente:</label>
                                <input type="text" id="telefonoC" class="form-control" v-model="telefonoCliente" required>
                                <button type="submit" class="btn btn-primary mt-3" @click="comprobacionAgregarCliente(nombreCliente,telefonoCliente)">Enviar</button>
                                <div>
                                    <span id="telefonoIncorrecto" style="color:red"></span>
                                    <span id="todoCorrecto" style="color:green"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Columna para Agregar Proveedores -->
                <div class="col-md-6 mt-5 mt-md-0">
                    <div class="card border-0 rounded-3 shadow-lg">
                        <div class="card-body p-5">
                            <div class="text-center">
                                <h1 class="fw-light">Agregar Proveedores</h1>
                            </div>
                            <div>
                                <label for="nombreP" class="form-label">Nombre Proveedor:</label>
                                <input type="text" id="nombreP" class="form-control" v-model="nombreProveedor" required>
                                <label for="telefonoP" class="form-label mt-3">Telefono Proveedor:</label>
                                <input type="text" id="telefonoP" class="form-control" v-model="telefonoProveedor" required>
                                <button type="submit" class="btn btn-primary mt-3" @click="comprobacionAgregarProveedor(nombreProveedor,telefonoProveedor)">Enviar</button>
                                <div>
                                    <span id="telefonoIncorrectoP" style="color:red"></span>
                                    <span id="todoCorrectoP" style="color:green"></span>
                                </div>
                            </div>
                        </div>
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


  </style>