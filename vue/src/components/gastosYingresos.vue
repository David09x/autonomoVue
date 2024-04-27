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
          const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
              toast.update(customId, {type: toast.TYPE.ERROR , render: "las fechas  no pueden estar vacias"});
            } else {
              // Si no hay un toast activo, mostrar uno nuevo
              toast.error("las fechas  no pueden estar vacias", {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
              });
            }
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
                  const customId = 'custom-id'
                  if (toast.isActive(customId)) {
                  // Si hay un toast activo, cerrarlo
                    toast.update(customId, {  type: toast.TYPE.INFO ,render: "total es " + (this.beneficio-this.gastos)});
                  } else {
                    // Si no hay un toast activo, mostrar uno nuevo
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
                }
              })
            }else{
              const customId = 'custom-id'
                // Verificar si hay un toast activo con el ID "custom-id"
                if (toast.isActive(customId)) {
                // Si hay un toast activo, cerrarlo
                  toast.update(customId, {type: toast.TYPE.ERROR , render: "las fecha primera no puede ser mayor que la 2"});
                } else {
                  // Si no hay un toast activo, mostrar uno nuevo
                  toast.error("las fecha primera no puede ser mayor que la 2", {
                    autoClose: 4000,
                    pauseOnFocusLoss: false,
                    transition: toast.TRANSITIONS.FADE,
                    toastId: "custom-id"
                  });
                }
            }
          
        }
    },

    ensenyarGastos(fecha1,fecha2){
      const customId = 'custom-id'
        if(fecha1 == "" || fecha2 == ""){
          const customId = 'custom-id'
          // Verificar si hay un toast activo con el ID "custom-id"
          if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
              toast.update(customId, {type: toast.TYPE.ERROR , render: "no puede estar vacio las fechas"});
            } else {
              // Si no hay un toast activo, mostrar uno nuevo
              toast.error("no puede estar vacio las fechas", {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
              });
            }
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
                  const customId = 'custom-id'
                  if (toast.isActive(customId)) {
                  // Si hay un toast activo, cerrarlo
                    toast.update(customId, {type: toast.TYPE.INFO , render: "total es " + (this.beneficio-this.gastos)});
                  } else {
                    // Si no hay un toast activo, mostrar uno nuevo
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
                }
              })
            }else{
                const customId = 'custom-id'
                // Verificar si hay un toast activo con el ID "custom-id"
                if (toast.isActive(customId)) {
                // Si hay un toast activo, cerrarlo
                  toast.update(customId, {type: toast.TYPE.ERROR, render: "las fecha primera no puede ser mayor que la 2"});
                } else {
                  // Si no hay un toast activo, mostrar uno nuevo
                  toast.error("las fecha primera no puede ser mayor que la 2", {
                    autoClose: 4000,
                    pauseOnFocusLoss: false,
                    transition: toast.TRANSITIONS.FADE,
                    toastId: "custom-id"
                  });
                }
            
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
    calcularGastos() {
     
      var spanConprobar = document.getElementById("calculoTotal");
  if (spanConprobar) {
    // Si el span ya existe, actualizar su contenido
    if (this.beneficio2 !== "" && this.gastos2 !== "") {
      var calculo = (this.beneficio2 - this.gastos2).toFixed(2);
      spanConprobar.textContent = calculo;
    } else {
      const customId = 'custom-id'
       // Verificar si hay un toast activo con el ID "custom-id"
      if (toast.isActive(customId)) {
      // Si hay un toast activo, cerrarlo
        toast.update(customId, { render: "Por favor, completa ambos campos"});
      } else {
        // Si no hay un toast activo, mostrar uno nuevo
        toast.error("Por favor, completa ambos campos", {
          autoClose: 4000,
          pauseOnFocusLoss: false,
          transition: toast.TRANSITIONS.FADE,
          toastId: "custom-id"
        });
      }
    }
  } else {
    // Si el span no existe, crear uno nuevo y agregarlo al contenedor
    if (this.beneficio2 !== "" && this.gastos2 !== "") {
      var span = document.createElement("span");
      span.id = "calculoTotal";
      var divGastosTotales = document.getElementById("gastosIngresoTotal");
      var calculo = (this.beneficio2 - this.gastos2).toFixed(2);
      span.textContent = calculo;
      divGastosTotales.appendChild(span);
    } else {
        const customId = 'custom-id'
    // Verificar si hay un toast activo con el ID "custom-id"
      if (toast.isActive(customId)) {
      // Si hay un toast activo, cerrarlo
        toast.update(customId, { render: "Por favor, completa ambos campos"});
      } else {
        // Si no hay un toast activo, mostrar uno nuevo
        toast.error("Por favor, completa ambos campos", {
          autoClose: 4000,
          pauseOnFocusLoss: false,
          transition: toast.TRANSITIONS.FADE,
          toastId: "custom-id"
        });
      }
    }
  }
}


    
  }
}


</script>

<template>
<div class="container px-5 my-5">
  <h1 class="text-center">Gastos e Ingresos</h1>
  <div class="row">
    <div  class="col-md-6">
      <h2 class="text-center">Ingresos</h2>
      <div class="card border-0 rounded-3 shadow-lg">
        <div class="card-body p-5">
          <div class="form-group">
            <label for="fecha1" class="form-label">Fecha de inicio:</label>
            <input type="date" class="form-control" id="fecha1" name="fecha-poner1" v-model="fechaGuardada1">
          </div>
          <div class="form-group">
            <label for="fecha2" class="form-label">Fecha de fin:</label>
            <input type="date" class="form-control" id="fecha2" name="fecha-poner2" v-model="fechaGuardada2">
          </div>
          <button id="boton" class="btn btn-primary btn-block" @click="ensenyarBeneficios(fechaGuardada1,fechaGuardada2)">Calcular</button>
          <br>
          <div id="obtenerIngresos">

          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h2 class="text-center">Gastos</h2>
      <div class="card border-0 rounded-3 shadow-lg">
        <div class="card-body p-5">
          <div class="form-group">
            <label for="fecha3" class="form-label">Fecha de inicio:</label>
            <input type="date" class="form-control" id="fecha3" name="fecha-poner1" v-model="fechaGuardada3">
          </div>
          <div class="form-group">
            <label for="fecha4" class="form-label">Fecha de fin:</label>
            <input type="date" class="form-control" id="fecha4" name="fecha-poner2" v-model="fechaGuardada4">
          </div>
          <button id="boton" class="btn btn-primary btn-block" @click="ensenyarGastos(fechaGuardada3,fechaGuardada4)">Calcular</button>
          <br>
          <div id="obtenerGastos" >

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center mt-4">
    <h2>Diferencia entre ingresos y gastos Manual</h2>
    <div class="card border-0 rounded-3 shadow-lg">
      <div class="card-body p-5">
        <div class="form-group">
          <label for="saasad" class="form-label">Ingresos:</label>
          <input type="number" id="numero1" class="form-control" v-model="beneficio2">
        </div>
        <div class="form-group mt-2">
          <label for="ss" class="form-label">Gastos:</label>
          <input type="number" id="numero1" class="form-control" v-model="gastos2">
        </div>
        <button class="btn btn-primary btn-block mt-3" @click="calcularGastos()">Calcular</button>
        <div id="gastosIngresoTotal" >

        </div>
        <br>
      </div>
    </div>
  </div>
</div>
  </template>
  
  <style scoped>
  .read-the-docs {
    color: #888;
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
  