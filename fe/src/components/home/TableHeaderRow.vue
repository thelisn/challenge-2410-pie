<script setup lang="ts">
  import type { Column, Sort, HomeFilter } from '@/types'

  import { reactive, defineProps, defineEmits } from 'vue'

  interface Props {
    columns: [Column],
    searchKeyword: HomeFilter,
    sort: Sort
  }
  const props = defineProps<Props>()

  const keyword = reactive<HomeFilter>({});
  for (const column of props.columns) {
    if (column.filter) {
      if (column.filter === 'date') {
        keyword[column.id] = {}
        keyword[column.id].start = props.searchKeyword[column.id]?.start
        keyword[column.id].end = props.searchKeyword[column.id]?.end
      } else {
        keyword[column.id] = props.searchKeyword[column.id]
      }
    }
  }

  const emit = defineEmits<{
    (e: 'doSort', id: Boolean): void
    (e: 'doSearch', keyword: HomeFilter): void
  }>()

  const doSort = (id: Boolean) => {
    emit('doSort', id)
  };

  const doSearch = () => {
    emit('doSearch', keyword)
  };

  const doResetSearch = (id: String) => {
    if (props.columns.find(el => el.id === id).filter === 'date') {
      delete keyword[id].start
      delete keyword[id].end
    } else {
      delete keyword[id]
    }
    doSearch()
  };
</script>

<template>
  <tr class="header-name">
    <th v-for="column in props.columns"
        :class="column.style">
      <span>{{ column.name }}</span>
      <button v-if="column.sort"
              class="sort"
              :class="{ 'active': sort.id === column.id }"
              :title="column.name + (sort.id !== column.id || sort.order === 'asc' ? ' 내림차순' : ' 오름차순') + ' 정렬 적용'"
              @click="doSort(column.id)">
        <FontAwesomeIcon v-if="sort.id !== column.id"
                         :icon="['fas', 'sort']" />
        <FontAwesomeIcon v-else-if="sort.order === 'asc'"
                         :icon="['fas', 'sort-up']" />
        <FontAwesomeIcon v-else-if="sort.order === 'desc'"
                         :icon="['fas', 'sort-down']" />
      </button>
    </th>
  </tr>
  <tr class="header-filter">
    <td v-for="column in props.columns">
      <template v-if="column.filter">
        <template v-if="column.filter === 'string'">
          <input type="text"
                 v-model="keyword[column.id]"
                 placeholder="키워드 입력"
                 :title="column.name + ' 키워드 입력'"
                 @keyup.enter="doSearch" />
        </template>
        <template v-else-if="column.filter === 'date'">
          <input type="text"
                 v-model="keyword[column.id].start"
                 placeholder="날짜 선택"
                 :title="column.name + ' 범위 시작 날짜 선택'"
                 onfocus="(this.type='date')"
                 onblur="(this.type='text')"
                 @keyup.enter="doSearch" />
          <span>~</span>
          <input type="text"
                 v-model="keyword[column.id].end"
                 placeholder="날짜 선택"
                 :title="column.name + ' 범위 종료 날짜 선택'"
                 onfocus="(this.type='date')"
                 onblur="(this.type='text')"
                 @keyup.enter="doSearch" />
        </template>
        <button class="filter"
                :title="column.name + ' 필터 적용'"
                @click="doSearch">
          <FontAwesomeIcon :icon="['fas', 'filter']" />
        </button>
        <button class="reset"
                :title="column.name + ' 필터 초기화'"
                @click="doResetSearch(column.id)">
          <FontAwesomeIcon :icon="['fas', 'close']" />
        </button>
      </template>
    </td>
  </tr>
</template>

<style scoped>
  button {
    background: transparent;
    border: none;
    line-height: 1em;
    vertical-align: middle;
    cursor: pointer;
  }

  .header-name {
    font-size: var(--font-size-02);

    th {
      background: var(--dark-color-01);
      color: var(--light-color-02);
      text-align: left;
      padding: 0;

      span {
        display: inline-block;
        padding: var(--margin-01) 0;
        transform: translateY(2px);
      }

      button {
        opacity: 0.3;

        &.active {
          color: var(--primary-color-03);
          opacity: 1;
        }
      }

      &.px200 {
        min-width: 210px;
        width: 210px;
      }
    }
  }

  .header-filter {
    td {
      background: var(--dark-color-03);
      text-align: left;
      white-space: normal;

      input {
        box-sizing: border-box;
        width: calc(100% - var(--margin-03) * 2);
        height: var(--margin-04);
        line-height: var(--margin-04);
        padding: 0 var(--margin-02);
        color: var(--primary-color-02);

        &::placeholder {
          font-size: var(--font-size-02);
        }
      }

      span {
        display: inline-block;
        width: var(--margin-03);
        height: var(--margin-04);
        text-align: center;
        line-height: var(--margin-04);
        color: var(--light-color-06);
        padding: 0;
      }

      button {
        width: var(--margin-03);
        height: var(--margin-04);
        text-align: center;
        line-height: var(--margin-04);
        color: var(--dark-color-06);
        padding: 0;

        &:hover,
        &:active {
          color: var(--primary-color-04);
        }
      }
    }
  }
</style>
