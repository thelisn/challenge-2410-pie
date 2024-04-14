<script setup lang="ts">
import type { Column, HomeData } from '@/types'

import { reactive, defineProps, defineEmits } from 'vue'

interface Props {
  columns: [Column]
}
const props = defineProps<Props>()

const insertData = reactive<HomeData>({
  id: 0
});

const inputError = reactive<HomeData>({});

const emit = defineEmits<{
  (e: 'doInsert', data: HomeData): void
}>()

const unsetInputError = (id) => {
  inputError[id] = ''
}
const doInsert = () => {
  let hasError: Boolean = false
  for (const column of props.columns) {
    inputError[column.id] = ''
    if (column.required && !insertData[column.id]) {
      inputError[column.id] = 'require'
      hasError = true
    }
  }

  if (!hasError && confirm('정말로 저장하시겠습니까?')) {
    emit('doInsert', insertData)
  }
};

</script>

<template>
  <div class="insert-title">
    <h1>추가</h1>
  </div>

  <div class="insert-container">
    <section v-for="column in props.columns"
             class="form">
      <label :for="'insert-' + column.id">
        {{ column.name }}
      </label>

      <p class="error">
        <template v-if="inputError[column.id] === 'require'">
          {{ column.name }}은 필수입니다.
        </template>
      </p>

      <template v-if="!column.filter || column.filter === 'string'">
        <input type="text"
               v-model="insertData[column.id]"
               placeholder=" "
               @input="unsetInputError(column.id)"
               :title="column.name + ' 입력'" />
      </template>
      <template v-else-if="column.filter === 'date'">
        <input type="text"
               v-model="insertData[column.id]"
               placeholder=" "
               onfocus="(this.type='date')"
               onblur="(this.type='text')"
               @input="unsetInputError(column.id)"
               :title="column.name + ' 입력'" />
      </template>
    </section>
  </div>

  <div class="insert-btns">
    <button class="btn"
            @click="doInsert">
      저장
    </button>
  </div>
</template>

<style scoped>
  .insert-title {
    margin: var(--margin-03) var(--margin-03) 0;

    h1 {
      float: left;
      font-size: var(--font-size-04);
      font-weight: bold;
      line-height: var(--margin-04);
    }

    &::after {
      display: block;
      content: "";
      clear: both;
    }
  }

  .insert-container {
    margin: var(--margin-02) var(--margin-03);

    .form {
      margin: var(--margin-02) 0;

      label {
        display: inline-block;
        padding: var(--margin-01) 0;
        transform: translateY(2px);
        color: var(--light-color-02);
        text-align: left;
        font-size: var(--font-size-02);
      }

      input {
        box-sizing: border-box;
        width: 100%;
        height: var(--margin-04);
        line-height: var(--margin-04);
        padding: 0 var(--margin-02);
        color: var(--primary-color-02);
      }

      p {
        float: right;
        box-sizing: border-box;
        margin-top: var(--margin-01);
        font-size: var(--font-size-01);

        &.error {
          color: var(--primary-color-03)
        }
      }
    }
  }

  .insert-btns {
    margin: var(--margin-05) var(--margin-03) var(--margin-03);

    .btn {
      width: 100%;
    }
  }
</style>