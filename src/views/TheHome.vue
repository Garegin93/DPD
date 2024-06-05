<template>
  <div>
    <Search v-model.trim="searchQuery" />
    <Table :data="data" :searchQuery="searchQuery" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Search from '../components/AppSearch.vue'
import Table from '../components/AppTable.vue'
import dataJson from '../data/api.json'

const searchQuery = ref('')
const data = ref(dataJson.results)

const route = useRoute()
const router = useRouter()

watch(
  () => searchQuery.value,
  (newQuery) => {
    router.replace({
      query: {
        ...route.query,
        search: newQuery
      }
    })
  }
)

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search as string
  }
})
</script>
