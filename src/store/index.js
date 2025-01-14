import { createStore } from 'vuex';  // Para Vuex 4 y Vue 3
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    authError: null,
    tasks: [],
    taskError: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
    setAuthError(state, error) {
      state.authError = error;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setTaskError(state, error) {
      state.taskError = error;
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://localhost/sis_task/public/api/login', credentials, {headers: {
          "Content-Type": "application/json"}
      });
        commit('setToken', response.data.access_token);
        commit('setUser', response.data.user);
      } catch (error) {
        commit('setAuthError', 'Error al iniciar sesión. Verifique sus credenciales.');
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('http://localhost/sis_task/public/api/register', userData);
        commit('setToken', response.data.access_token);
        commit('setUser', response.data.user);
        alert(response.data.message);
      } catch (error) {
        commit('setAuthError', error.response.data.message || 'Error al registrar usuario.');
      }
    },
    logout({ commit }) {
      commit('clearAuth');
    },
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('http://localhost/sis_task/public/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        commit('setTasks', response.data);
      } catch (error) {
        commit('setTaskError', 'Error al obtener las tareas.');
      }
    },
    async getTask({ commit }, taskId) {
      try {
        const response = await axios.get(`http://localhost/sis_task/public/api/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error al obtener la tarea:", error);
        throw error;
      }
    },
    async updateTask({ commit }, task) {
      try {
        const response = await axios.put(`http://localhost/sis_task/public/api/tasks/${task.id}`, task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error al actualizar la tarea:', error.response?.data || error.message);
        throw error;
      }
    },
    async storeTask({ commit }, task) {
      try {
        const response = await axios.post(`http://localhost/sis_task/public/api/tasks`, task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error al crear la tarea:', error.response?.data || error.message);
        throw error;
      }
    },
    async deleteTask({ commit }, task) {
      try {
        const response = await axios.delete(`http://localhost/sis_task/public/api/tasks/${task}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error al eliminar la tarea:', error.response?.data || error.message);
        throw error;
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    authError: state => state.authError,
    tasks: (state) => state.tasks,
    taskError: (state) => state.taskError,
  }
});
