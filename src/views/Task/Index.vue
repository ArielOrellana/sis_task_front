<template>
<SidebarComp />

<div class="p-4 sm:ml-64">
   <div class="p-4 rounded-lg">
    <router-link to="/task/create" class="mb-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">Crear Nueva Tarea</router-link>
    <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
      <div class="mb-4">
        <label for="status-filter" class="mr-2">Filtrar por Estado:</label>
        <select
          
          id="status-filter"
          @change="filterByStatus"
          class="px-4 py-2 bg-white border border-gray-300 rounded-md"
        >
          <option value="">Todos</option>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En Curso</option>
          <option value="completed">Completado</option>
        </select>
      </div>
              <table id="default-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Fecha vencimiento</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="task in tasks" :key="task.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ task.id }}</td>
                    <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ task.title }}</td>
                    <td>{{ task.description }}</td>
                    <td>{{ task.due_date }}</td>
                    <td>
                      <span v-if="task.status == 'pending'"  class="bg-green-200 text-green-800 px-2 py-1 rounded mr-2">
                        Pendiente
                      </span>
                      <span v-if="task.status == 'in_progress'"  class="bg-green-200 text-green-800 px-2 py-1 rounded mr-2">
                        En Curso
                      </span>
                      <span v-if="task.status == 'completed'"  class="bg-green-200 text-green-800 px-2 py-1 rounded mr-2">
                        Completado
                      </span>
                    </td>
                    <td>
                      <router-link :to="'task/edit/'+task.id " class="mb-2 inline-flex items-center mr-2 px-4 py-2 bg-green-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-400 focus:bg-green-400 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                        </svg>
                      </router-link>
                      <button @click="handleDeleteTask(task.id)"
                      class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
   </div>
</div>

</template>



<script setup> 
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import SidebarComp from '@/components/SidebarComp.vue'
import { DataTable } from "simple-datatables"

onMounted(() => {
    initFlowbite();
})


</script>
<script>
import { mapActions, mapGetters } from 'vuex';
import { ref, computed, nextTick  } from 'vue'


export default {
  data() {
    return {
      dataTableInstance: null, // Filtro de estado
    };
  },
  computed: {
    ...mapGetters(['tasks', 'taskError']),
  },
  methods: {
    ...mapActions(['fetchTasks', 'deleteTask']),
    async handleDeleteTask(id) {
      const success = await this.deleteTask(id);
      if (success) {
        this.fetchTasks();
      } else {
        console.error("Error al eliminar la tarea");
      }
    },
    formatStatus(status) {
    const statuses = {
      pending: 'Pendiente',
      in_progress: 'En Curso',
      completed: 'Completado',
    };
    return statuses[status] || status;
  },
  filterByStatus(event) {
    const filterValue = event.target.value;
    const rows = document.querySelectorAll('#default-table tbody tr');
    rows.forEach(row => {
      const statusCell = row.querySelector('td:nth-child(5)'); // La columna de estado
      if (!statusCell) return;
      const statusText = statusCell.textContent.toLowerCase();
      const filterMatch = 
        filterValue === '' || 
        (filterValue === 'pending' && statusText.includes('pendiente')) ||
        (filterValue === 'in_progress' && statusText.includes('curso')) ||
        (filterValue === 'completed' && statusText.includes('completado'));
      row.style.display = filterMatch ? '' : 'none';
    });
  },
  },
  
  mounted() {
    this.fetchTasks().then(() => {
      nextTick(() => {
        const tableElement = document.getElementById('default-table');
        if (tableElement) {
          try {
            this.dataTableInstance = new DataTable(tableElement, {
              searchable: true,
              sortable: true,
              footer: false,
              header: true,
              perPage: 5,
              paging: true,
              labels: {
                placeholder: "Buscar...",
                perPage: "registros por página",
                noRows: "No se encontraron registros",
                info: "Mostrando {start} a {end} de {rows} registros",
              },
              classes: {
                active: "datatable-active",
                bottom: "datatable-bottom",
                container: "datatable-container",
                cursor: "datatable-cursor",
                dropdown: "datatable-dropdown",
                ellipsis: "datatable-ellipsis",
                empty: "datatable-empty",
                headercontainer: "datatable-headercontainer",
                info: "datatable-info",
                input: "datatable-input",
                loading: "datatable-loading",
                pagination: "datatable-pagination",
                paginationList: "datatable-pagination-list",
                search: "datatable-search",
                selector: "datatable-selector",
                sorter: "datatable-sorter",
                table: "datatable-table",
                top: "datatable-top",
                wrapper: "datatable-wrapper"
              },
            });
          } catch (error) {
            console.error("Error al inicializar la tabla:", error);
          }
        }
      });
    });
  },
};
</script>