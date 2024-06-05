<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th @click="sort('picture.medium')">Аватар</th>
          <th @click="sort('name.first')">ФИО</th>
          <th @click="sort('gender')">Пол</th>
          <th @click="sort('location.country')">Страна</th>
          <th @click="sort('dob.date')">Дата рождения</th>
          <th @click="sort('email')">Адрес электронной почты</th>
          <th @click="sort('phone')">Телефон</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.login.uuid">
          <td><img :src="item.picture.medium" alt="avatar" class="avatar" /></td>
          <td>{{ `${item.name.first} ${item.name.last}` }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.location.country }}</td>
          <td>{{ formatDate(item.dob.date) }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination
    :currentPage="currentPage"
    :pageSize="pageSize"
    :total="filteredData.length"
    @page-changed="onPageChanged"
  />
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref, watch } from 'vue'
import Pagination from './AppPagination.vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  data: Array<any>
  searchQuery: string
}>()

const currentPage = ref(1)
const pageSize = 20
const sortKey = ref('')
const sortOrder = ref(1)

const route = useRoute()
const router = useRouter()

const filteredData = ref(props.data)

watch(
  () => props.searchQuery,
  () => {
    filterData()
    currentPage.value = 1
    updateQueryParams()
  }
)

const filterData = () => {
  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase()
    filteredData.value = props.data.filter((item) => containsQuery(item, query))
  } else {
    filteredData.value = props.data
  }
}

const containsQuery = (obj: any, query: string): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (typeof value === 'string' && value.toLowerCase().includes(query)) {
        return true
      } else if (typeof value === 'object' && value !== null) {
        if (containsQuery(value, query)) {
          return true
        }
      }
    }
  }
  return false
}

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredData.value.slice(start, end)
})

const sort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value
  } else {
    sortKey.value = key
    sortOrder.value = 1
  }
  sortData()
  currentPage.value = 1
  updateQueryParams()
}

const sortData = () => {
  filteredData.value.sort((a, b) => {
    const valueA = getValueByPath(a, sortKey.value)
    const valueB = getValueByPath(b, sortKey.value)
    return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * sortOrder.value
  })
}

const onPageChanged = (page: number) => {
  currentPage.value = page
  updateQueryParams()
}

const formatDate = (date: string) => {
  const formattedDate = new Date(date)
  return formattedDate.toLocaleDateString()
}

const getValueByPath = (obj: any, path: string) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

const updateQueryParams = () => {
  router.replace({
    query: {
      ...route.query,
      page: currentPage.value,
      sort: sortKey.value,
      order: sortOrder.value,
      search: props.searchQuery
    }
  })
}

onMounted(() => {
  currentPage.value = parseInt(route.query.page as string) || 1
  sortKey.value = (route.query.sort as string) || ''
  sortOrder.value = parseInt(route.query.order as string) || 1

  if (sortKey.value) {
    sortData()
  }
  filterData()
})
</script>

<style lang="scss" scoped>
.table-container {
  height: calc(100vh - 14rem);
  overflow-y: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border: 1px solid #dddddd;
  }

  th:hover {
    background-color: #dddddd;
  }
}

.avatar {
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
}
</style>
