import { createRouter, createWebHistory } from 'vue-router'
//import dinerito from './components/gastosYingresos.vue'
//import cliente from './components/agregarCliente.vue'
//import citas from './components/agregarCita.vue'
//import tablasGastosIngresos from './components/mostrarGastosYBeneficios.vue'
import tablaCitas  from '../components/obtenerCitas.vue'
const routes = [


    {
        path:'/',
        name:'citas',
        component: tablaCitas
    }


]




const router = createRouter({
    history:createWebHistory('/'),
    routes
})

export default router;