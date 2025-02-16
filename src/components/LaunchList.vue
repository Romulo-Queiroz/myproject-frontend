<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

const launches = ref([]);

const fetchLaunches = async () => {
  console.log("Base URL usada:", api.defaults.baseURL); 
  try {
    const response = await api.get("/launch");
    launches.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar lançamentos:", error);
  }
};

onMounted(fetchLaunches);
</script>
