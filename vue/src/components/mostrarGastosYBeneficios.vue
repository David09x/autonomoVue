<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
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
            var fecha_formateada = fecha.replace(/-/g, '');
            var fecha_formateada2 = fecha2.replace(/-/g, '');
            // Dividir la fecha en partes
            var partes_fecha = fecha_formateada.split('-');
            var partes_fecha2 = fecha_formateada2.split('-');
            var fechaCalcular = partes_fecha[0];
            var fechaCalcular2 = partes_fecha2[0];
            const customId = 'custom-id'
            if(fecha != "" && fecha2 != ""){
                if(fechaCalcular <= fechaCalcular2){
                     try{
                        const response = await fetch("http://localhost:8000/mostrarGastosFechas/"+fecha+ "/" + fecha2)
                        const json = await response.json()
                        this.gastosM=json
                        console.log(this.gastosM)
                        if(this.gastosM.ok){
                            this.ponerTablaGastos(this.gastosM.gastos)

                        }else{
                            var recogerTabla =  document.getElementById("tablaGastosBeneficios")

                            recogerTabla.innerHTML = ""
                            toast.info("no hay gastos entre las fechas seleccionadas", {
                                autoClose: 6000,
                                limit: 2,
                                toastId: customId,
                                pauseOnFocusLoss: false,
                                transition: toast.TRANSITIONS.FLIP,
                            });
                        }
                    }catch(error){
                        console.error("error al intentar agregar gasto", error)
                    }
                   
                }else{
                    var recogerTabla =  document.getElementById("tablaGastosBeneficios")

                    recogerTabla.innerHTML = ""
                    toast.error("la fecha 1 no puede ser mayor a la 2", {
                        autoClose: 4000,
                        limit: 2,
                        toastId: customId,
                        pauseOnFocusLoss: false,
                        transition: toast.TRANSITIONS.FLIP,
                    });
                }
            }else{
                toast.error("las fechas no pueden estar vacias", {
                    autoClose: 4000,
                    limit: 2,
                    toastId: customId,
                    pauseOnFocusLoss: false,
                    transition: toast.TRANSITIONS.FLIP,
                });
            }
        },

        async getBeneficios(fecha,fecha2){

            
            var fecha_formateada = fecha.replace(/-/g, '');
            var fecha_formateada2 = fecha2.replace(/-/g, '');
            // Dividir la fecha en partes
            var partes_fecha = fecha_formateada.split('-');
            var partes_fecha2 = fecha_formateada2.split('-');
            var fechaCalcular = partes_fecha[0];
            var fechaCalcular2 = partes_fecha2[0];
            const customId = 'custom-id'

            if(fecha != "" && fecha2 != ""){
                
                if(fechaCalcular <= fechaCalcular2){
                    
                    try{
                        const response = await fetch("http://localhost:8000/mostrarBeneficiosFechas/"+fecha+ "/" + fecha2)
                        const json = await response.json()
                        this.beneficiosM=json
                        console.log(this.beneficiosM)
                        if(this.beneficiosM.ok){
                            this.ponerTablaBeneficios(this.beneficiosM.beneficios)

                        }else{
                            var recogerTabla =  document.getElementById("tablaGastosBeneficios")
                            recogerTabla.innerHTML = ""
                            toast.info("no hay beneficios entre las fechas seleccionadas", {
                                autoClose: 6000,
                                limit: 2,
                                toastId: customId,
                                pauseOnFocusLoss: false,
                                transition: toast.TRANSITIONS.FLIP,
                            });
                        }
                    }catch(error){
                        console.error("error al intentar agregar gasto", error)
                    }
                }else{
                    var recogerTabla =  document.getElementById("tablaGastosBeneficios")
                    recogerTabla.innerHTML = ""
                    toast.error("la fecha 1 no puede ser mayor a la 2", {
                        autoClose: 4000,
                        limit: 2,
                        toastId: customId,
                        pauseOnFocusLoss: false,
                        transition: toast.TRANSITIONS.FLIP,
                    });
                }
            }else{
                toast.error("las fechas no pueden estar vacias", {
                    autoClose: 4000,
                    limit: 2,
                    toastId: customId,
                    pauseOnFocusLoss: false,
                    transition: toast.TRANSITIONS.FLIP,
                });
            }
        },
        ponerTablaGastos(datos){

        var recogerTabla =  document.getElementById("tablaGastosBeneficios")

        recogerTabla.innerHTML = ""

        var tabla = document.createElement("table")
        tabla.className = "table table-striped"
        var thead = document.createElement("thead")
        var encabezadoNombre =  document.createElement("tr")

        var nombrePersona = document.createElement("th")
        nombrePersona.setAttribute("scope","col")
        nombrePersona.textContent = "Nombre"
        var nombreTipo = document.createElement("th")
        nombreTipo.setAttribute("scope","col")
        nombreTipo.textContent = document.textContent = "descripcion"
        var hora =  document.createElement("th")
        hora.setAttribute("scope","col")
        hora.textContent = document.textContent =  "precio"
        var fecha = document.createElement("th")
        fecha.setAttribute("scope","col")
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
            tabla.className = "table table-striped"
            var thead = document.createElement("thead")
            var encabezadoNombre =  document.createElement("tr")

            var nombrePersona = document.createElement("th")
            nombrePersona.setAttribute("scope","col")
            nombrePersona.textContent = "Nombre"
            var nombreTipo = document.createElement("th")
            nombreTipo.setAttribute("scope","col")
            nombreTipo.textContent = document.textContent = "Hora"
            var hora =  document.createElement("th")
            hora.setAttribute("scope","col")
            hora.textContent = document.textContent =  "Tipo"
            var precio = document.createElement('th')
            precio.setAttribute("scope","col")
            precio.textContent =  "Precio"
            var fecha = document.createElement("th")
            fecha.setAttribute("scope","col")
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
    <div id="divFecha">
        <label for="ingreso">Gastos</label>
        <input type="date" id="fecha1" class="form-control" name="fecha-poner1" v-model="fechaGuardada1">
        <input type="date" id="fecha2" class="form-control" name="fecha-poner2" v-model="fechaGuardada2">
        <br>
        <button type="submit"  class="btn btn-sm btn-primary" @click="getGastos(fechaGuardada1,fechaGuardada2)">mostrar</button>
        </div>
        <div>
        <label for="ingreso">Beneficios</label>
        <input type="date" id="fecha3" class="form-control" name="fecha-poner3" v-model="fechaGuardada3">
        <input type="date" id="fecha4" class="form-control" name="fecha-poner4" v-model="fechaGuardada4">
        <br>
        <button type="submit" class="btn btn-sm btn-primary" @click="getBeneficios(fechaGuardada3,fechaGuardada4)">mostrar</button>
    </div>
    </div>
    <div id="tablaGastosBeneficios"> </div>
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

#fecha1 , #fecha2 , #fecha3, #fecha4{
  width: 150px;
  margin: 0 auto;
  display: inline-block !important;
}

button {
    margin-top: 10px;
    width: 5rem;
    height: 2rem;
    padding: 0 auto

}
</style>