<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
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
            const customId = 'custom-id'
            toast.success("se agrego con exito el gasto", {
                autoClose: false, // Para que no se cierre automáticamente
                hideProgressBar: true, // Para ocultar la barra de progreso
                toastId: customId,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FLIP,
            });
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
            const customId = 'custom-id'
            toast.success("se agrego con exito la cita", {
                autoClose: false, // Para que no se cierre automáticamente
                hideProgressBar: true, // Para ocultar la barra de progreso
                toastId: customId,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FLIP,
            });
            //alert("se agrego con exito")
        }catch(error){
            console.error("error al intentar buscar cita", error)
        }
    },
    async agregarCita(numero,hora,fecha){
        console.log(numero+ " "+ hora + " " + fecha +  " " +  this.servicioId)
        const customId = 'custom-id'
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
                        //alert(this.comprobarCitaAntes.descripcion)
                        toast.error(this.comprobarCitaAntes.descripcion, {
                            autoClose: 4000,
                            limit: 2,
                            toastId: customId,
                            pauseOnFocusLoss: false,
                            transition: toast.TRANSITIONS.FLIP,
                        });
                    }
                }else{
                    //alert("tienes que agregar todos los campos")
                    toast.error("tienes que agregar todos los campos", {
                            autoClose: 4000,
                            limit: 2,
                            toastId: customId,
                            pauseOnFocusLoss: false,
                            transition: toast.TRANSITIONS.FLIP,
                        });
                }
            }else{
                //alert(this.telefonoC.descripcion);
                toast.error(this.telefonoC.descripcion, {
                    autoClose: 4000,
                    limit: 2,
                    toastId: customId,
                    pauseOnFocusLoss: false,
                    transition: toast.TRANSITIONS.FLIP,
                });
            }
        }else{
            //alert("el telefono tiene que ser de 9 digitos")
            toast.error("el telefono tiene que ser de 9 digitos", {
                autoClose: 4000,
                limit: 2,
                toastId: customId,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FLIP,
            });
        }
    },
    async agregarProveedor(precio,fecha,descripcion){
      console.log(precio +" "+fecha+" "+descripcion + " " +this.proveedorId)
      if(precio != "" && fecha != "" && descripcion != "" && this.proveedorId >0){
         await this.guardarGasto(this.proveedorId,descripcion,precio.toFixed(2),fecha)
      }else{
        toast.error("tienes algun campo vacio", {
                autoClose: 4000,
                limit: 2,
                toastId: customId,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FLIP,
            });
      }
    },

}  
}
</script>

<template>
<div class="container px-5 my-5">
  <div class="row justify-content-center">
    <div class="col-lg-10">
      <div class="row">
        <!-- Columna para Agregar Citas -->
        <div class="col-md-6">
          <div class="card border-0 rounded-3 shadow-lg">
            <div class="card-body p-5">
              <div class="text-center">
                <div class="h1 fw-light">Agregar Citas</div>
              </div>
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="ntelefono" class="form-label">Telefono:</label>
                  <input type="text" class="form-control" id="ntelefono" v-model="telefono" required>
                </div>
                <div class="mb-3">
                  <label for="tipo" class="form-label text-center">Servicio:</label>
                  <select class="form-select" id="tipo" v-model="servicioId" required>
                    <option v-for="servicio in servicios" :key="servicio.id" :value="servicio.id">{{ servicio.tipo }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="hora" class="form-label text-center">Hora:</label>
                  <input type="time" class="form-control" id="hora" v-model="hora" required>
                </div>
                <div class="mb-3">
                  <label for="fecha" class="form-label text-center">Fecha:</label>
                  <input type="date" class="form-control" id="fecha" v-model="fecha" required>
                </div>
                <button type="submit" class="btn btn-primary" @click="agregarCita(telefono,hora,fecha)">Guardar</button>
              </form>
            </div>
          </div>
        </div>
        <!-- Columna para Agregar Proveedores -->
        <div class="col-md-6 mt-5 mt-md-0">
          <div class="card border-0 rounded-3 shadow-lg">
            <div class="card-body p-5">
              <div class="text-center">
                <div class="h1 fw-light">Agregar Proveedores</div>
              </div>
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="tipoProveedor" class="form-label text-center">Proveedor:</label>
                  <select class="form-select" id="tipoProveedor" v-model="proveedorId" required>
                    <option v-for="proveedor in proveedoresLista" :key="proveedor.id" :value="proveedor.id">{{ proveedor.nombre }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="precio" class="form-label text-center">Precio:</label>
                  <input type="number" class="form-control" id="precio" v-model="precioP" required>
                </div>
                <div class="mb-3">
                  <label for="fechaP" class="form-label text-center">Fecha:</label>
                  <input type="date" class="form-control" id="fechaP" v-model="fechaP" required>
                </div>
                <div class="mb-3">
                  <label for="proveedorD" class="form-label text-center">Descripción:</label>
                  <textarea class="form-control" id="proveedorD" cols="50" rows="2" maxlength="50" placeholder="Descripción aquí" v-model="descripcionP"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" @click="agregarProveedor(precioP,fechaP,descripcionP)">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


</template>

<style scope>

</style>