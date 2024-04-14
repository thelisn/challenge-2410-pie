<script setup lang="ts">
import type { Column, HomeData } from '@/types'

import { defineProps, defineEmits } from 'vue'

interface Props {
  columns: [Column],
  itemData: HomeData
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'doRead', id: Number): void
}>()

const doRead = (id: Number) => {
  emit('doRead', id)
};

</script>

<template>
  <tr class="list-item"
      role="button"
      title="상세 보기"
      @click="doRead(props.itemData.id)">
    <td v-for="column in props.columns">
      {{ props.itemData[column.id] }}
    </td>
  </tr>
</template>

<style scoped>
  .list-item {
    td {
      text-align: left;
      background: var(--dark-color-02);
      padding: var(--margin-01) var(--margin-02);
      cursor: pointer;
    }

    &:hover {
      td {
        background: var(--primary-color-10);
      }
    }
  }
</style>
