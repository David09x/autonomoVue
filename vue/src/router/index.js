import { createRouter, createWebHistory } from 'vue-router'
import dinerito from '../components/gastosYingresos.vue'
import cliente from '../components/agregarCliente.vue'
import citas from '../components/agregarCita.vue'
import tablasGastosIngresos from '../components/mostrarGastosYBeneficios.vue'
import tablaCitas  from '../components/obtenerCitas.vue'
import loginUsuario from '../components/login.vue'
import paginaError404 from '../components/error.vue'
const routes = [


    {
        path:'/citas',
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
    },
    {
        path:'/',
        name: 'login',
        component: loginUsuario
    },
    {
        path: '/:catchAll(.*)',
        name: 'paginaError',
        component: paginaError404
    }

]




const router = createRouter({
    history:createWebHistory('/'),
    routes
})

router.beforeEach((to, from, next) => {
    // Verificar si el usuario tiene un token válido en el localStorage
    const token = localStorage.getItem('token');
    if (to.name !== 'login' && !token) {
      // Si la ruta no es '/login' y no hay token, redirigir al usuario a la página de inicio de sesión
      next({ name: 'login' });
    } else {
      // Permitir al usuario acceder a la ruta solicitada
      next();
    }
  });
  

export default router;