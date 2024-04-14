<script setup lang="ts">
  import type { Column, HomeData } from '@/types'

  import { defineProps } from 'vue'

  interface Props {
    columns: [Column],
    itemData: HomeData
  }

  const props = defineProps<Props>()
</script>

<template>
  <tr class="list-item"
      role="button">
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
    }

    &:hover {
      td {
        background: var(--primary-color-10);
      }
    }
  }
</style>
