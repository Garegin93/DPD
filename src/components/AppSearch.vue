<template>
  <input
    :value="modelValue"
    class="search-input"
    placeholder="Поиск..."
    type="text"
    @input="onInput"
  />
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) emit('update:modelValue', target.value)
}
</script>

<style scoped>
.search-input {
  width: 100%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  padding: 10px;
  font-size: 1rem;
  border: 0.0625rem solid #cccccc;
  border-radius: 0.3125rem;
  box-sizing: border-box;
  max-width: 25rem;
  margin-top: 10px;

  &:focus {
    outline: none;
    border-color: #66afe9;
    box-shadow: 0 0 0.3125rem #66afe9;
  }
}
</style>
