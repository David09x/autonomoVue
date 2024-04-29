<template>
    <div id="fondoError">
      <div class="container bootstrap snippets bootdey">
        <div class="row">
          <div class="col-md-12">
            <div class="pull-right" style="margin-top:10px;">
              <div class="col-md-10 col-md-offset-1 pull-right text-center"> <!-- Añadido text-center para centrar el contenido -->
                <img class="img-error" src="https://bootdey.com/img/Content/fdfadfadsfadoh.png" alt="Error 404 image">
                <h2 class="text-lg">404 Not Found</h2> <!-- Cambiado a text-lg para un tamaño de texto más grande -->
                <p class="text-lg">Sorry, an error has occurred. The requested page was not found!</p> <!-- Cambiado a text-lg para un tamaño de texto más grande -->
                <div class="error-actions">
                  <span class="glyphicon glyphicon-arrow-left">You will be redirected to login shortly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  #fondoError {
    background: #2E95EF;
    background-image: -moz-radial-gradient(center 45deg,circle cover, #9BD1FF, #2E95EF);
    background-image: -webkit-gradient(radial, 50% 50%, 0, 50% 50%,800, from(#9BD1FF), to(#2E95EF));
    height: 100vh;
    width: 100vw; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-error {
    width: 30%; 
    height: auto;
  }
  .text-lg {
    font-size: 24px;
  }
  </style>
  
  <script>
  export default {
    mounted() {
      // Redireccionar al login después de 5 segundos
      setTimeout(() => {
        this.$router.push({ name: 'login' });
      }, 5000);
    }
  };
  </script>
  