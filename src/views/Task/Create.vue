<template>
<SidebarComp />

<div class="p-4 sm:ml-64">
   <div class="p-4 rounded-lg">
        <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight mb-4">Crear Nueva Tarea</h2>
            <form class="" @submit.prevent="handleStoreTask">
                <div class="mb-5">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                    <input type="text" id="title" v-model="task.title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titulo" required />
                </div>
                <div class="mb-5">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                    <textarea id="description" v-model="task.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deja una descripción..."></textarea>
                </div>
                <div class="mb-5">
                    <label for="due_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de vencimiento</label>
                    <input type="date" id="due_date" v-model="task.due_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                    <select id="countries" v-model="task.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option disabled selected>Seleccione...</option>
                        <option value="pending">Pendiente</option>
                        <option value="in_progress">En curso</option>
                        <option value="completed">Completado</option>
                    </select>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2">Guardar</button>
                <router-link to="/task" class="inline-flex items-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">Cancelar</router-link>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        due_date: '',
        status: ''
      }
    };
  },
  methods: {
    ...mapActions(['storeTask']),

    async handleStoreTask() {
      const success = await this.storeTask(this.task);
      if (success) {
        this.$router.push('/task');
      } else {
        console.error("Error al crear la tarea");
      }
    }
  },
  mounted() {

  }
};
</script>

<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import SidebarComp from '@/components/SidebarComp.vue'

onMounted(() => {
    initFlowbite();
})
</script>