<script>


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
        if(fecha1 == "" || fecha2 == ""){
            alert("falta indicar una fecha")
        }else{
            fetch("http://localhost:8000/mostrarB/"+fecha1+"/"+fecha2)
          .then((response) => response.json())
          .then((json) => {
            //console.log(json.categorias);
            this.beneficio = json.beneficios;
            console.log(this.beneficio)
            this.agregarSpan(this.beneficio,"obtenerIngresos","ingresosObtenidos")
          })
          
        }
    },

    ensenyarGastos(fecha1,fecha2){
        if(fecha1 == "" || fecha2 == ""){
            alert("falta indicar una fecha")
        }else{
            fetch("http://localhost:8000/mostrarG/"+fecha1+"/"+fecha2)
            .then((response) => response.json())
            .then((json) => {
            //console.log(json.categorias);
            this.gastos = json.gastos;
            console.log(this.gastos)
            this.agregarSpan(this.gastos,"obtenerGastos","gastosObtenidos")
        })
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
         alert("Añade el campo vacio por favor")
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
         alert("Añade el campo vacio por favor")
       }
     }
    }

    
  }
}


</script>

<template>
  <h1>gastos y ingresos</h1>
   <div id="obtenerIngresos">
    <label for="ingreso">Ingresos</label>
    <input type="date" id="fecha1" name="fecha-poner1" v-model="fechaGuardada1">
    <input type="date" id="fecha2" name="fecha-poner2" v-model="fechaGuardada2">
    <br>
    <button type="submit" class="btn btn-sm btn-warning" @click="ensenyarBeneficios(fechaGuardada1,fechaGuardada2)">calcular</button>
    
   </div>
   <div id="obtenerGastos">
    <label for=""> Gastos</label>
    <input type="date" id="fecha3" name="fecha-poner1" v-model="fechaGuardada3">
    <input type="date" id="fecha4" name="fecha-poner2" v-model="fechaGuardada4">
    <br>
    <button type="submit" class="btn btn-sm btn-warning" @click="ensenyarGastos(fechaGuardada1,fechaGuardada2)">calcular</button>
   </div>
    <div id="gastosIngresoTotal">
        <label for="saasad"> Diferencia entre ingresos y gastos</label>
        <br>
        <label for="ss"> ingresos</label>
        <input type="number" v-model="beneficio2">
        -
        <label for="">gastos</label>
        <input type="number" v-model="gastos2">
        <br>
        <button type="submit" class="btn btn-sm btn-warning" @click="calcularGastos()">Calcular</button>
    </div>
  </template>
  
  <style scoped>
  .read-the-docs {
    color: #888;
  }
  </style>
  