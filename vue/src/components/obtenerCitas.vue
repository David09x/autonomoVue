<script>
import { ref } from 'vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import cargando from '../../js/cargando'

export default {

  data(){
    return{
      persona: null,
      fechaGuardada: null,
      estado: null
    }
  },
  mounted(){
    this.pantalla = new cargando();
  },
  created(){
    //this.getCitas()
  },

  methods: {
   /* getCitas(){
      fetch("http://localhost:8000/restaurant")
      .then((response) => response.json())
      .then((json) => {
        //console.log(json.categorias);
        this.persona = json.categorias;
        const idClientes = [];
      for (let i = 0; i < this.persona.length; i++) {
        idClientes.push(this.persona[i].idCliente);
      }
      //console.log(idClientes);

      })
    },*/
    getCitas2(fechaDada){
      this.pantalla.contadorAumentando("Cargando ...",2)
      fetch("http://localhost:8000/mostrarCitasFecha/" + fechaDada)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.estado = json
        console.log(this.estado.citasEncontradas)
      if(this.estado.ok){
        console.log("entra en el true");
        this.ponerTabla(this.estado.citasEncontradas)
        return json;
      } else{
        const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
                toast.update(customId, {type: toast.TYPE.WARNING, render:"No hay citas"});
            } else {
                // Si no hay un toast activo, mostrar uno nuevo
                toast.warning("No hay citas", {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
                });
            }
         var recogerTabla =  document.getElementById("tablaCitas").innerHTML = ""
         return json;
      }

      })
      .catch((error) => {
        console.error("Error al obtener citas:", error);
        // Aquí puedes manejar el error si lo necesitas
      })
      .finally(() => {
        this.pantalla.borrarCargando();
      });
      
    },

    borrarCita(id,nombre){
      console.log(id)
      if(confirm("Estas seguro de borrar la cita de " + nombre)){
        fetch("http://localhost:8000/borrarCita/"+ id)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
                toast.update(customId, {type: toast.TYPE.SUCCESS, render:"se borro la cita correctamente"});
            } else {
                // Si no hay un toast activo, mostrar uno nuevo
                toast.success("se borro la cita correctamente", {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
                });
            }
          this.getCitas2(this.fechaGuardada)
        })
      }
    },
    ponerTabla(datos){

      var recogerTabla =  document.getElementById("tablaCitas")

      recogerTabla.innerHTML = ""

      var tabla = document.createElement("table")
      tabla.className = "table table-striped"
      var thead = document.createElement("thead")
      var encabezadoNombre =  document.createElement("tr")

      var nombrePersona = document.createElement("th")
      nombrePersona.setAttribute("scope","col")
      nombrePersona.textContent = "Nombre y Apellidos"
      var nombreTipo = document.createElement("th")
      nombreTipo.setAttribute("scope","col")
      nombreTipo.textContent = document.textContent = "Tipo de Corte"
      var hora =  document.createElement("th")
      hora.setAttribute("scope","col")
      hora.textContent = document.textContent =  "Hora"
      var fecha = document.createElement("th")
      fecha.setAttribute("scope","col")
      fecha.textContent =  "precio"

      encabezadoNombre.appendChild(nombrePersona)
      encabezadoNombre.appendChild(nombreTipo)
      encabezadoNombre.appendChild(hora)
      encabezadoNombre.appendChild(fecha)

      thead.appendChild(encabezadoNombre)

      tabla.appendChild(thead)

      var tbody = document.createElement("tbody");

      
        
        for (let i = 0; i < datos.length; i++) {
          var fila= document.createElement("tr");
          var nombre = document.createElement("td");
          nombre.textContent =  datos[i]['nombre'];
          var tipo = document.createElement("td");
          tipo.textContent =  datos[i]['tipo']
          var hora = document.createElement("td");
          hora.textContent =  datos[i]['hora']
          var precio= document.createElement("td");
          precio.textContent  =  datos[i]['precio']
          var boton1 = document.createElement("td");
          var boton  = document.createElement("button")
          boton.textContent = "Borrar"
          boton.classList.add("btn","btn-danger");
          boton1.appendChild(boton)
          
         
          boton.setAttribute("cita-id", datos[i]["id"]);

          
          boton.addEventListener("click", () => {
              this.borrarCita(datos[i]["id"],datos[i]['nombre']);
          });

          fila.appendChild(nombre)
          fila.appendChild(tipo)
          fila.appendChild(hora)
          fila.appendChild(precio)
          fila.appendChild(boton1)

          tbody.appendChild(fila)
        }
        
        tabla.appendChild(tbody)



      recogerTabla.appendChild(tabla);

      

    }
    
  }
}


</script>

<template>
  
  <div>
    <div id="divFecha">
      <label for="">Fecha para citas</label>
      <br>
      <input type="date"  id="fecha" class="form-control" name="fecha-poner" v-model="fechaGuardada">
      <button type="submit" class="btn btn-sm btn-primary" @click="getCitas2(fechaGuardada)">Buscar </button>
    </div>
  </div>
  <div id="tablaCitas"> </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

#tablaCitas{
  width: 70vw;
  height: 100vh;
  max-height: 100vh;
  margin: 0 auto;
  padding: 3rem;
  text-align: center; 
}

#divFecha{
  padding: 1rem;
  text-align: center; 
  margin: 0 auto;
}

#fecha{
  width: 200px;
  margin: 0 auto;
  display: inline-block !important;
}

</style>
