<template>
  <section class="">
    <div class="flex flex-col items-center justify-center px-6 py-8  md:h-screen">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src="https://cdn-icons-png.flaticon.com/512/124/124061.png" alt="logo">
            Gestion de Tareas    
        </a>
        <div class="w-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:w-96 xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Inicia sesión
                </h1>
                <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar sesión</button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      ¿Aún no tienes una cuenta? <router-link to="/register" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Regístrate</router-link>
                    </p>
                </form>
                <p>{{ errorMessage }}</p>
                <!--
                <button @click="loginWithGoogle">Iniciar sesión con Google</button>
              -->
            </div>
        </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  computed: {
    ...mapGetters(['authError'])
  },
  methods: {
    ...mapActions(['login']),  // Vuex action
    async handleLogin() {
    try {
      const success = await this.login({ email: this.email, password: this.password });
      if (this.$store.getters.isAuthenticated) {
            this.$router.push('/Task');
            }else {
                this.errorMessage = error.response?.data?.message;
            }
    } catch (error) {
      this.errorMessage = error.response?.data?.message || 'Error de inicio de sesión. Por favor, verifica tus datos.';
    }
  },
    async loginWithGoogle() {
      window.location.href = 'http://localhost/public/sis_task/auth/google';
    }
  }
};
</script>
<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite();
})

</script>
