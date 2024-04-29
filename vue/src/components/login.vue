<template>
    <section class="vh-100 gradient-custom" style="background-color: #508bfc" >
      <div class="container py-5 h-80">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                  <p class="text-white-50 mb-5">Please enter your login and password!</p>
                  <div data-mdb-input-init class="form-outline form-white mb-4">
                    <input type="text" id="usuario" v-model="usuario" class="form-control form-control-lg" placeholder="Usuario"/>
                  </div>
                  <div data-mdb-input-init class="form-outline form-white mb-4">
                    <input type="password" id="password" v-model="password" class="form-control form-control-lg" placeholder="Password"/>
                  </div>
                  <button @click="login" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5">Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { toast } from 'vue3-toastify';
   import 'vue3-toastify/dist/index.css';
  export default {
    created() {
        // Eliminar el token del localStorage al cargar la página de login
        localStorage.removeItem('token');
    },
    mounted() {
      
      document.getElementById('usuario').addEventListener('keydown', (event) => {
      
        if (event.key === 'Enter') {
          document.getElementById('password').focus();
        }
      });

      
      document.getElementById('password').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.login();
        }
      });
    },
    data() {
      return {
        usuario: '',
        password: ''
      };
    },
    methods: {
      login() {
        fetch('http://localhost:8000/buscar-usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idUsuario: this.usuario,
            password: this.password
          })
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          // Manejar la respuesta aquí
          if (data.token) {
            // La solicitud fue exitosa
            console.log(data.token);
            localStorage.setItem('token', data.token)
            this.$router.push('/citas');
          } else {
            // La solicitud falló, mostrar mensaje de error
            const customId = 'custom-id'
            // Verificar si hay un toast activo con el ID "custom-id"
            if (toast.isActive(customId)) {
            // Si hay un toast activo, cerrarlo
              toast.update(customId, {type: toast.TYPE.ERROR , render: data.descripcion});
            } else {
              // Si no hay un toast activo, mostrar uno nuevo
              toast.error( data.descripcion, {
                autoClose: 4000,
                pauseOnFocusLoss: false,
                transition: toast.TRANSITIONS.FADE,
                toastId: "custom-id"
              });
            }
          }
        })
        .catch(error => {
          // Manejar errores de red u otros errores
          console.error('Error:', error.message);
        });
      }
    }
  }
  </script>

  <style>
  section{
    width: 100vw;
    
  }

  #usuario, #password {
  text-align: center;
}
</style>
  