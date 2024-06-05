<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" class="pagination-btn" @click="prevPage">Previous</button>
    <button
      v-for="page in pages"
      :key="page"
      :class="{ active: page === currentPage }"
      class="pagination-btn"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button :disabled="currentPage === totalPages" class="pagination-btn" @click="nextPage">
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue'

const props = defineProps<{
  total: number
  pageSize: number
  currentPage: number
}>()
const emit = defineEmits<{
  (e: 'page-changed', page: number): void
}>()

const currentPage = ref(props.currentPage)
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
const pages = computed(() => {
  const pagesArray = []
  for (let i = 1; i <= totalPages.value; i++) {
    pagesArray.push(i)
  }
  return pagesArray
})

watch(
  () => props.currentPage,
  (newPage) => {
    currentPage.value = newPage
  }
)

const changePage = (page: number) => {
  currentPage.value = page
  emit('page-changed', page)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    emit('page-changed', currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
    emit('page-changed', currentPage.value)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;

  .pagination-btn {
    padding: 8px 12px;
    margin: 0;
    border: 1px solid #cccccc;
    background-color: #f8f9fa;
    color: #333333;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e9ecef;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.active {
      background-color: #007bff;
      color: #ffffff;
    }
  }
}
</style>
