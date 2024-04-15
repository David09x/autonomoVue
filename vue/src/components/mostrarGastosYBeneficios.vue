<script>
export default {
    data(){
        return {
            persona:"",
            fechaGuardada1: "",
            fechaGuardada2:"",
            fechaGuardada3: "",
            fechaGuardada4:"",
            gastosM:"",
            beneficiosM: ""
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
            console.log(idClientes);

            })
        },
        async getGastos(fecha,fecha2){
            console.log(fecha+ " " + fecha2)
            try{
                const response = await fetch("http://localhost:8000/mostrarGastosFechas/"+fecha+ "/" + fecha2)
                const json = await response.json()
                this.gastosM=json.gastos
                console.log(this.gastosM)
                this.ponerTablaGastos(this.gastosM)
            }catch(error){
                console.error("error al intentar agregar gasto", error)
            }
        },

        async getBeneficios(fecha,fecha2){
            console.log(fecha+ " " + fecha2)
           try{
                const response = await fetch("http://localhost:8000/mostrarBeneficiosFechas/"+fecha+ "/" + fecha2)
                const json = await response.json()
                this.beneficiosM=json.beneficios
                console.log(this.beneficiosM)
                this.ponerTablaBeneficios(this.beneficiosM)
            }catch(error){
                console.error("error al intentar agregar gasto", error)
            }
        },
        ponerTablaGastos(datos){

        var recogerTabla =  document.getElementById("tablaGastosBeneficios")

        recogerTabla.innerHTML = ""

        var tabla = document.createElement("table")
        var thead = document.createElement("thead")
        var encabezadoNombre =  document.createElement("tr")

        var nombrePersona = document.createElement("th")
        nombrePersona.textContent = "Nombre"
        var nombreTipo = document.createElement("th")
        nombreTipo.textContent = document.textContent = "descripcion"
        var hora =  document.createElement("th")
        hora.textContent = document.textContent =  "precio"
        var fecha = document.createElement("th")
        fecha.textContent =  "fecha"

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
            tipo.textContent =  datos[i]['descripcion']
            var hora = document.createElement("td");
            hora.textContent =  datos[i]['precio']
            var precio= document.createElement("td");
            precio.textContent  =  datos[i]['fecha']

            fila.appendChild(nombre)
            fila.appendChild(tipo)
            fila.appendChild(hora)
            fila.appendChild(precio)

            tbody.appendChild(fila)
        } 
        tabla.appendChild(tbody)
        recogerTabla.appendChild(tabla);

        },
        ponerTablaBeneficios(datos){

            var recogerTabla =  document.getElementById("tablaGastosBeneficios")

            recogerTabla.innerHTML = ""

            var tabla = document.createElement("table")
            var thead = document.createElement("thead")
            var encabezadoNombre =  document.createElement("tr")

            var nombrePersona = document.createElement("th")
            nombrePersona.textContent = "Nombre"
            var nombreTipo = document.createElement("th")
            nombreTipo.textContent = document.textContent = "Hora"
            var hora =  document.createElement("th")
            hora.textContent = document.textContent =  "Tipo"
            var precio = document.createElement('th')
            precio.textContent =  "Precio"
            var fecha = document.createElement("th")
            fecha.textContent =  "Fecha"


            encabezadoNombre.appendChild(nombrePersona)
            encabezadoNombre.appendChild(nombreTipo)
            encabezadoNombre.appendChild(hora)
            encabezadoNombre.appendChild(precio)
            encabezadoNombre.appendChild(fecha)

            thead.appendChild(encabezadoNombre)

            tabla.appendChild(thead)

            var tbody = document.createElement("tbody");



            for (let i = 0; i < datos.length; i++) {
                var fila= document.createElement("tr");
                var nombre = document.createElement("td");
                nombre.textContent =  datos[i]['nombre'];
                var tipo = document.createElement("td");
                tipo.textContent =  datos[i]['hora']
                var hora = document.createElement("td");
                hora.textContent =  datos[i]['tipo']
                var precio= document.createElement("td");
                precio.textContent  =  datos[i]['precio']
                var fecha= document.createElement("td");
                fecha.textContent  =  datos[i]['fecha']

                fila.appendChild(nombre)
                fila.appendChild(tipo)
                fila.appendChild(hora)
                fila.appendChild(precio)
                fila.appendChild(fecha)

                tbody.appendChild(fila)
            } 
            tabla.appendChild(tbody)
            recogerTabla.appendChild(tabla);

        },
    },
}
</script>

<template>
  
    <div>
    <label for="ingreso">Gastos</label>
    <input type="date" id="fecha1" name="fecha-poner1" v-model="fechaGuardada1">
    <input type="date" id="fecha2" name="fecha-poner2" v-model="fechaGuardada2">
    <br>
    <button type="submit" class="btn btn-sm btn-warning" @click="getGastos(fechaGuardada1,fechaGuardada2)">mostrar</button>
    </div>
    <div>
    <label for="ingreso">Beneficios</label>
    <input type="date" id="fecha3" name="fecha-poner3" v-model="fechaGuardada3">
    <input type="date" id="fecha4" name="fecha-poner4" v-model="fechaGuardada4">
    <br>
    <button type="submit" class="btn btn-sm btn-warning" @click="getBeneficios(fechaGuardada3,fechaGuardada4)">mostrar</button>
    </div>
    <div id="tablaGastosBeneficios"> </div>
  </template>