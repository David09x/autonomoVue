<script>
import { ref } from 'vue'

export default {

  data(){
    return{
      persona: null,
      fechaGuardada: null,
      estado: null
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
        const idClientes = [];
      for (let i = 0; i < this.persona.length; i++) {
        idClientes.push(this.persona[i].idCliente);
      }
      //console.log(idClientes);

      })
    },
    getCitas2(fechaDada){
      console.log(fechaDada)
      console.log("http://localhost:8000/mostrarCitasFecha/" + fechaDada)
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
         alert("no hay citas")
         var recogerTabla =  document.getElementById("tablaCitas").innerHTML = ""
         return json;
      }

      });
      
    },

    ponerTabla(datos){

      var recogerTabla =  document.getElementById("tablaCitas")

      recogerTabla.innerHTML = ""

      var tabla = document.createElement("table")
      var thead = document.createElement("thead")
      var encabezadoNombre =  document.createElement("tr")

      var nombrePersona = document.createElement("th")
      nombrePersona.textContent = "Nombre y Apellidos"
      var nombreTipo = document.createElement("th")
      nombreTipo.textContent = document.textContent = "Tipo de Corte"
      var hora =  document.createElement("th")
      hora.textContent = document.textContent =  "Hora"
      var fecha = document.createElement("th")
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

          fila.appendChild(nombre)
          fila.appendChild(tipo)
          fila.appendChild(hora)
          fila.appendChild(precio)

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
    <input type="date" id="fecha" name="fecha-poner" v-model="fechaGuardada">
    <button type="submit" class="btn btn-sm btn-warning" @click="getCitas2(fechaGuardada)">Buscar </button>
  </div>
  <div id="tablaCitas"> </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
