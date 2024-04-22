<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {

data(){
    return{
        fechaGuardada1: "",
        fechaGuardada2: "",
        fechaGuardada3: "",
        fechaGuardada4: "",
        beneficioObtenido: null,
        gastosObtenido: null,
        beneficio: "",
        gastos: "",
        beneficio2: "",
        gastos2: ""
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
    
    ensenyarBeneficios(fecha1,fecha2){
      const customId = 'custom-id'
        if(fecha1 == "" || fecha2 == ""){
          toast.error("las fechas no pueden estar vacias", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
            });
        }else{
            var fecha_formateada = fecha1.replace(/-/g, '');
            var fecha_formateada2 = fecha2.replace(/-/g, '');
            // Dividir la fecha en partes
            var partes_fecha = fecha_formateada.split('-');
            var partes_fecha2 = fecha_formateada2.split('-');
            var fechaCalcular = partes_fecha[0];
            var fechaCalcular2 = partes_fecha2[0];
            if(fechaCalcular <= fechaCalcular2){

              fetch("http://localhost:8000/mostrarB/"+fecha1+"/"+fecha2)
              .then((response) => response.json())
              .then((json) => {
                //console.log(json.categorias);
                this.beneficio = json.beneficios;
                this.agregarSpan(this.beneficio,"obtenerIngresos","ingresosObtenidos")
                if(this.beneficio!= "" && this.gastos != ""){
                  console.log(this.gastos )
                  console.log(this.beneficio)
                 toast.info("total es " + (this.beneficio-this.gastos), {
                    position: toast.POSITION.TOP_CENTER, // Para mostrar el toast desde arriba
                    autoClose: false, // Para que no se cierre automáticamente
                    hideProgressBar: true, // Para ocultar la barra de progreso
                    toastId: customId,
                    pauseOnFocusLoss: false,
                    transition: toast.TRANSITIONS.FLIP,
                  });
                }
              })
            }else{
              toast.error("las fecha primera no puede ser mayor que la 2", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
              });
            }
          
        }
    },

    ensenyarGastos(fecha1,fecha2){
      const customId = 'custom-id'
        if(fecha1 == "" || fecha2 == ""){
          toast.error("las fechas no pueden estar vacias", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
            });
        }else{
          var fecha_formateada = fecha1.replace(/-/g, '');
            var fecha_formateada2 = fecha2.replace(/-/g, '');
            // Dividir la fecha en partes
            var partes_fecha = fecha_formateada.split('-');
            var partes_fecha2 = fecha_formateada2.split('-');
            var fechaCalcular = partes_fecha[0];
            var fechaCalcular2 = partes_fecha2[0];
            if(fechaCalcular <= fechaCalcular2){
                fetch("http://localhost:8000/mostrarG/"+fecha1+"/"+fecha2)
                .then((response) => response.json())
                .then((json) => {
                //console.log(json.categorias);
                this.gastos = json.gastos;
                this.agregarSpan(this.gastos,"obtenerGastos","gastosObtenidos")
                if(this.gastos != "" && this.beneficio != ""){
                  toast.info("total es " + (this.beneficio-this.gastos), {
                    position: toast.POSITION.TOP_CENTER, // Para mostrar el toast desde arriba
                    autoClose: false, // Para que no se cierre automáticamente
                    closeButton: false, // Para ocultar el botón de cierre
                    hideProgressBar: true, // Para ocultar la barra de progreso
                    toastId: customId,
                    pauseOnFocusLoss: false,
                    transition: toast.TRANSITIONS.FLIP,
                  });
                }
              })
            }else{
              toast.error("las fecha primera no puede ser mayor que la 2", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
              });
            }
        }
    },
   
    agregarSpan(valor,div,id){
      var spanConprobar =  document.getElementById(id)
      

       if(spanConprobar == null){
        var span =  document.createElement("span");
        span.id =  id
         span.textContent = valor
         var divAnyadir = document.getElementById(div) 
          divAnyadir.appendChild(span)

       }else{
        var span2 = document.getElementById(id)
        span2.textContent =  ""
        span2.textContent = valor
        var divAnyadir = document.getElementById(div) 
          divAnyadir.appendChild(span2)
       }
    },
    calcularGastos(){
     var spanConprobar =  document.getElementById("calculoTotal")
     var span2 =  document.createElement("span");
     if(spanConprobar == null){
     
       if(this.beneficio2 != "" && this.gastos2 != ""){
         span2.id = "calculoTotal"
         var divGastosTotales = document.getElementById("gastosIngresoTotal")
         var calculo = (this.beneficio2- this.gastos2).toFixed(2) 
         span2.textContent = calculo
         divGastosTotales.appendChild(span2)
         console.log(calculo)
 
       }else{
        toast.error("Añade el campo vacio por favor", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
              });
       }
     }else{
      if(this.beneficio2 != "" && this.gastos2 != ""){

          var span3  =  document.getElementById("calculoTotal");
          span3.textContent = ""
         var divGastosTotales = document.getElementById("gastosIngresoTotal")
         var calculo = (this.beneficio2- this.gastos2).toFixed(2) 
         span.textContent = calculo
         divGastosTotales.appendChild(span2)
         console.log(calculo)
 
       }else{
          toast.error("Añade el campo vacio por favor", {
              autoClose: 4000,
              limit: 2,
              toastId: customId,
              pauseOnFocusLoss: false,
              transition: toast.TRANSITIONS.FLIP,
           });
       }
     }
    }

    
  }
}


</script>

<template>
  <div class="container">
    <h1 class="text-center">Gastos e Ingresos</h1>
    <div class="row">
        <div  id="obtenerIngresos" class="col-md-6">
            <h2 class="text-center">Ingresos</h2>
            <div class="form-group">
                <label for="fecha1" id="label">Fecha de inicio:</label>
                <input type="date"  class="form-control" id="fecha1" name="fecha-poner1" v-model="fechaGuardada1">
            </div>
            <div class="form-group">
                <label for="fecha2" id="label">Fecha de fin:</label>
                <input type="date" class="form-control" id="fecha2" name="fecha-poner2" v-model="fechaGuardada2">
            </div>
            <button id="boton" class="btn btn-primary btn-block" @click="ensenyarBeneficios(fechaGuardada1,fechaGuardada2)">Calcular</button>
            <br>
        </div>
        <div id="obtenerGastos" class="col-md-6">
            <h2 class="text-center">Gastos</h2>
            <div class="form-group">
                <label for="fecha3" id="label">Fecha de inicio:</label>
                <input type="date" class="form-control" id="fecha3" name="fecha-poner1" v-model="fechaGuardada3">
            </div>
            <div class="form-group">
                <label for="fecha4" id="label">Fecha de fin:</label>
                <input type="date" class="form-control" id="fecha4" name="fecha-poner2" v-model="fechaGuardada4">
            </div>
            <button id="boton" class="btn btn-primary btn-block" @click="ensenyarGastos(fechaGuardada3,fechaGuardada4)">Calcular</button>
            <br>
        </div>
    </div>
    <div id="gastosIngresoTotal" class="text-center mt-4">
        <h2>Diferencia entre ingresos y gastos Manual</h2>
        <label for="saasad">Ingresos:</label>
        <input type="number" id="numero1" class="form-control" v-model="beneficio2">
        <label for="ss" class="mt-2">Gastos:</label>
        <input type="number"  id="numero1" class="form-control" v-model="gastos2">
        <button class="btn btn-primary btn-block mt-3" @click="calcularGastos()">Calcular</button>
        <br>
    </div>
  </div>
  </template>
  
  <style scoped>
  .read-the-docs {
    color: #888;
  }

  #fecha1,#fecha2,#fecha3,#fecha4{
    width: 30vw;
    text-align: center;
    font-size: 25px;
    margin: 0 auto;
  }

  #obtenerIngresos{
    margin-top: 1rem;
  }
  .form-group{
    margin-top: 10px;
  }
  #label{
    font-size: 2rem
  }
  #boton{
    margin-top: 10px;
    margin-bottom: 5px;
  }

  #numero1{
    width: 40vw;
    margin: 0 auto;
    text-align: center;
    font-size: 2rem;
  }

  #calculoTotal{
    font-size: 2rem;
  }
  </style>
  