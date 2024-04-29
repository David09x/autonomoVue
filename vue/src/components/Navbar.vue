<template>
  <nav id="navbar" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <h2 class="navbar-brand">David Projects</h2>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/citas" class="nav-link">Ver Citas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/agregarCitas" class="nav-link">Agregar Citas/Gastos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cliente" class="nav-link">Agregar Clientes/Proveedores</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/gastosYBenefinicios" class="nav-link">Mostrar Gastos/Ingresos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dinero" class="nav-link">Calculo</router-link>
          </li>
         
          <li class="nav-item">
            <button @click="desconectar" class="nav-link">Desconectar</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    desconectar() {
  
      localStorage.removeItem('token');
     
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
#app {
  padding: 0;
  margin: 0;
}
</style>
