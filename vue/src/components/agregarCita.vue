<script>

export default {

data(){

    return{servicios:"",telefono:"",hora:"",fecha:"",servicioId:"",telefonoC:"",comprobarCitaAntes:"",
    idClienteBusqueda: ""}
},

created(){
//this.getCitas()
this.getServicios()
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
    getServicios(){
        fetch("http://localhost:8000/obtenerServicios")
        .then((response) =>  response.json())
        .then((json)=> {
            this.servicios = json.servicios
            console.log(this.servicios)
        })
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
    },

}  
}
</script>

<template>
<div>
    <h2>Crear Evento</h2>
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

</template>

<style></style>