<script>
//import obtenerCitas from './components/obtenerCitas.vue';
//import dinerito from './components/gastosYingresos.vue'
//import cliente from './components/agregarCliente.vue'
//import citas from './components/agregarCita.vue'
//import tablasGastosIngresos from './components/mostrarGastosYBeneficios.vue'
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar,
  }
}
</script>

<template>
 
  <Navbar v-if="$route.name !== 'login' && $route.name !== 'paginaError'"/>
  <router-view></router-view>
</template>

<style >

</style>
