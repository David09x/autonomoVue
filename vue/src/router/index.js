import { createRouter, createWebHistory } from 'vue-router'
import dinerito from '../components/gastosYingresos.vue'
import cliente from '../components/agregarCliente.vue'
import citas from '../components/agregarCita.vue'
import tablasGastosIngresos from '../components/mostrarGastosYBeneficios.vue'
import tablaCitas  from '../components/obtenerCitas.vue'
const routes = [


    {
        path:'/',
        name:'citas',
        component: tablaCitas
    },
    {
        path:'/gastosYBenefinicios',
        name:'tablaGastosBene',
        component: tablasGastosIngresos
    },
    {
        path:'/dinero',
        name:'dineroGeneral',
        component: dinerito
    },
    {
        path:'/cliente',
        name:'clientes',
        component: cliente
    },
    {
        path:'/agregarCitas',
        name: 'citasAgregar',
        component: citas
    }


]




const router = createRouter({
    history:createWebHistory('/'),
    routes
})

export default router;