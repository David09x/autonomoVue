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
          <router-link to="/" class="nav-link">Obtener Citas</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/agregarCitas" class="nav-link">Agregar Citas/Gastos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cliente" class="nav-link">Agregar Clientes/Proveedores</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/gastosYBenefinicios" class="nav-link">Gastos Y Ingresos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dinero" class="nav-link">Calculo Gastos/ingresos</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<h1>ES EL NAVBAR</h1>

</template>


<style >
#app {
    padding :0;
    margin: 0;
}



</style>