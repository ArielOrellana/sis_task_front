<template>
    <SidebarComp />
    <div class="p-4 sm:ml-64">
        <div class="p-4 rounded-lg">
          <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div class="mb-4">
              <table id="default-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>nombre</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    </tr>
                </tbody>
              </table>
            </div>
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
    computed: {
    ...mapGetters(['users']),
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
  mounted() {
    this.fetchUsers().then(() => {
      
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
  },
}
</script>