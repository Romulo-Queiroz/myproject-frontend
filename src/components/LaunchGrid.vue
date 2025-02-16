<template>
    <div class="container mt-4">
      <h2 class="text-center">🚀 Launch Data</h2>

      <input
        type="text"
        v-model="search"
        class="form-control mb-3"
        placeholder="Search launches..."
      />
  
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="launch in paginatedLaunches" :key="launch.id">
            <td>{{ launch.id }}</td>
            <td>{{ launch.name }}</td>
            <td>{{ formatDate(launch.date) }}</td>
          </tr>
        </tbody>
      </table>
  
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage">Previous</button>
          </li>
  
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="goToPage(page)">
              {{ page }}
            </button>
          </li>
  
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import api from "../services/api";
  
  const launches = ref([]);
  const search = ref("");
  const currentPage = ref(1);
  const itemsPerPage = 20;
  
  const filteredLaunches = computed(() => {
    return launches.value.filter((launch) =>
      launch.name.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  const totalPages = computed(() => Math.ceil(filteredLaunches.value.length / itemsPerPage));
  
  const paginatedLaunches = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredLaunches.value.slice(start, start + itemsPerPage);
  });
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const fetchLaunches = async () => {
    try {
      const response = await api.get("/launch");
      launches.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar lançamentos:", error);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  onMounted(fetchLaunches);
  </script>
  