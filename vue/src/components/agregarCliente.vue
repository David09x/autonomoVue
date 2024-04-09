<script>

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
        if(this.estado.ok){
                document.getElementById("todoCorrecto").innerHTML = this.estado.descripcion
            }else{
                var comprobanteCorrecto =  document.getElementById("telefonoCorrecto");
                if(comprobanteCorrecto == null){
                document.getElementById("todoCorrecto").innerHTML = ""

                    document.getElementById("telefonoIncorrecto").innerHTML = this.estado.descripcion
                }else{
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

                        document.getElementById("telefonoIncorrectoP").innerHTML = this.estadoP.descripcion
                    }else{
                        document.getElementById("telefonoCorrectoP").innerHTML = ""
                    document.getElementById("todoCorrectoP").innerHTML = this.estadoP.descripcion

                    }
                }
        })  
    },
    comprobacionAgregarCliente(nombre,telefono){
       if((nombre == "" || telefono == "")){
        alert("los campos estan vacios o algun campo esta vacio")
        this.nombreCliente = ""
        this.telefonoCliente =  ""
       }else{
        document.getElementById("telefonoIncorrecto").innerHTML = ""
         if(this.telefonoCliente.length !== 9 || isNaN(this.telefonoCliente)){
    
            document.getElementById("telefonoIncorrecto").innerHTML = "el telefono debe ser de 9 digitos y numerico"
         }else{
            document.getElementById("telefonoIncorrecto").innerHTML = ""
            document.getElementById("todoCorrectoP").innerHTML = ""
            this.agregarCliente(nombre,telefono);
        
         }
       }
    },
    comprobacionAgregarProveedor(nombre,telefono){
        if((nombre == "" || telefono == "")){
        alert("los campos estan vacios o algun campo esta vacio")
        this.nombreProveedor = ""
        this.telefonoProveedor =  ""
       }else{
        document.getElementById("telefonoIncorrectoP").innerHTML = ""
         if(this.telefonoProveedor.length !== 9 || isNaN(this.telefonoProveedor)){
           

            document.getElementById("telefonoIncorrectoP").innerHTML = "el telefono debe ser de 9 digitos y numerico"
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
  
    <div>
        <h1>Agregar Cliente</h1>
        <div>
            <label for="">Nombre Cliente</label>
            <br>
            <input type="text" id="nombreC" v-model="nombreCliente" required>
            <br>
            <label for="">Telefono Cliente</label>
            <br>
            <input type="text" id="telefonoC" v-model="telefonoCliente" required>
            
        </div>
        <div>
            <span id="telefonoIncorrecto" style="color:red"></span>
            <span id="todoCorrecto" style="color:green"></span>
        </div>
        <button type="submit" class="btn btn-sm btn-warning" @click="comprobacionAgregarCliente(nombreCliente,telefonoCliente)">Enviar</button>
    </div>
    <div>
        <h1>Agregar Proveedores</h1>
        <div>
            <label for="">Nombre Proveedor</label>
            <br>
            <input type="text" id="nombreP" v-model="nombreProveedor" required>
            <br>
            <label for="">Telefono Proveedor</label>
            <br>
            <input type="text" id="telefonoP" v-model="telefonoProveedor" required>
            
        </div>
        <div>
            <span id="telefonoIncorrectoP" style="color:red"></span>
            <span id="todoCorrectoP" style="color:green"></span>
        </div>
        <button type="submit" class="btn btn-sm btn-warning" @click="comprobacionAgregarProveedor(nombreProveedor,telefonoProveedor)">Enviar</button>
    </div>
  </template>
  
  <style>
  .read-the-docs {
    color: #888;
  }
  </style>