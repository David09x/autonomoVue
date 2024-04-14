<script>

export default {

data(){

    return{servicios:"",telefono:"",hora:"",fecha:"",servicioId:"",telefonoC:"",comprobarCitaAntes:"",
    idClienteBusqueda: "",proveedoresLista:"",proveedorId: "",precioP:"",fechaP:"",
    descripcionP:"",agregarPobjeto:""}
},

created(){
//this.getCitas()
this.getServicios()
this.getProveedores()
},
methods: {

    getProveedores(){
      fetch("http://localhost:8000/mostrarProveedoresLista")
    .then((response) => response.json())
    .then((json) => {
        //console.log(json.categorias);
        this.proveedoresLista = json.Proveedores;
        console.log(this.proveedoresLista)
    })
    },

    getCitas(){
    fetch("http://localhost:8000/restaurant")
    .then((response) => response.json())
    .then((json) => {
        //console.log(json.categorias);
        this.persona = json.categorias;
        console.log(this.persona)
    })
    }, 
    getServicios(){
        fetch("http://localhost:8000/obtenerServicios")
        .then((response) =>  response.json())
        .then((json)=> {
            this.servicios = json.servicios
            console.log(this.servicios)
        })
    },
    async guardarGasto(idProveedor,descripcion,precio,fecha){
      try{
         const response = await fetch("http://localhost:8000/agregarGastos/"+idProveedor+"/"+descripcion+"/"+precio+"/"+fecha)
            const json = await response.json()
            this.agregarPobjeto = json
            console.log(this.agregarPobjeto)
        }catch(error){
            console.error("error al intentar agregar gasto", error)
        }
    },
   async comprobarCliente(telefono){
        try {
        const response = await fetch("http://localhost:8000/darClienteId/" + telefono);
        const json = await response.json();
        this.telefonoC = json;
        console.log(this.telefonoC.ok);
        } catch (error) {
            console.error("Error al buscar cliente:", error);
        }
    },
    async comprobarCitaPrevia(hora,fecha){
        try{
         const response = await fetch("http://localhost:8000/buscarCitaPrevia/"+hora+"/"+fecha)
            const json = await response.json()
            this.comprobarCitaAntes = json
            console.log(this.comprobarCitaAntes)
        }catch(error){
            console.error("error al intentar buscar cita", error)
        }

    },
    async buscarIdCliente(numero){
        try{
            const response =  await fetch("http://localhost:8000/darClienteId/" + numero)
            const json = await response.json()
            this.idClienteBusqueda = json.idDelCliente[0].id
            console.log(this.idClienteBusqueda)
        }catch(error){
            console.error("error al intentar buscar cita", error)
        }

         
    },

    async anyadirCita(idCliente,idServicio,hora,fecha){
        try{
            const response =  await fetch("http://localhost:8000/citas/" + 
            idCliente+ "/" + idServicio + "/" + hora + "/" + fecha)
            const json = await response.json()
            alert("se agrego con exito")
        }catch(error){
            console.error("error al intentar buscar cita", error)
        }
    },
    async agregarCita(numero,hora,fecha){
        console.log(numero+ " "+ hora + " " + fecha +  " " +  this.servicioId)
        if(numero.length == 9){
            await this.comprobarCliente(numero)
            console.log(this.telefonoC.ok)
            if(this.telefonoC.ok){ 
                if(numero != "" && hora != "" && fecha != "" && this.servicioId > 0){
                   await this.comprobarCitaPrevia(hora,fecha);
                    if(this.comprobarCitaAntes.ok){
                        await this.buscarIdCliente(numero)
                        await this.anyadirCita(this.idClienteBusqueda,this.servicioId,hora,fecha)
                    }else{
                        alert(this.comprobarCitaAntes.descripcion)
                    }
                }else{
                    alert("tienes que agregar todos los campos")
                }
            }else{
                alert(this.telefonoC.descripcion);
            }
        }else{
            alert("el telefono tiene que ser de 9 digitos")
        }
    },
    async agregarProveedor(precio,fecha,descripcion){
      console.log(precio +" "+fecha+" "+descripcion + " " +this.proveedorId)
      if(precio != "" && fecha != "" && descripcion != "" && this.proveedorId >0){
         await this.guardarGasto(this.proveedorId,descripcion,precio.toFixed(2),fecha)
         alert("se agrego con exito")
      }else{
        alert("tienes algun campo vacio")
      }
    },

}  
}
</script>

<template>
<div>
    <h2>Agregar Citas</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="numero">Telefono:</label>
        <input type="text" id="ntelefono" v-model="telefono" required>
      </div>
      <div>
        <label for="tipo">Servicio:</label>
        <select id="tipo" v-model="servicioId" required>
          <option v-for="servicio in servicios" :key="servicio.id" :value="servicio.id">
            {{ servicio.tipo }}</option>
        </select>
      </div>
      <div>
        <label for="hora">Hora:</label>
        <input type="time" id="hora" v-model="hora" required>
      </div>
      <div>
        <label for="fecha">Fecha:</label>
        <input type="date" id="fecha" v-model="fecha" required>
      </div>
      <button type="submit" class="btn btn-sm btn-warning"  @click="agregarCita(telefono,hora,fecha)">Guardar</button>
    </form>
  </div>
  <div>
    <h2>Agregar Gastos</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="tipo">Proveedor:</label>
        <select id="tipo" v-model="proveedorId" required>
          <option v-for="proveedor in proveedoresLista" :key="proveedor.id" :value="proveedor.id">
            {{ proveedor.nombre }}</option>
          </select>
        </div>
        <div>
          <label for="Precio">Precio:</label>
          <input type="number" id="numero" v-model="precioP" required>
        </div>
        <div>
          <label for="fecha">Fecha:</label>
          <input type="date" id="fechaP" v-model="fechaP" required>
        </div>
        <div>
          <textarea name="descripcion" id="proveedorD" cols="50" rows="2" maxlength="50" placeholder="Descripcion aquí" v-model="descripcionP"></textarea>
        </div>
      <button type="submit" class="btn btn-sm btn-warning"  @click="agregarProveedor(precioP,fechaP,descripcionP)">Guardar</button>
    </form>
  </div>

</template>

<style></style>