<script setup lang="ts">
  import type { Column, Sort, HomeData, HomeFilter } from '@/types'

  import { ref, reactive } from 'vue';

  import TableHeaderRow from '@/components/home/TableHeaderRow.vue'
  import TableItemRow from '@/components/home/TableItemRow.vue'

  const columns: [Column] = reactive([
    { id: 'title', name: '제목', filter: 'string', sort: true, style: 'px200' },
    { id: 'date', name: '날짜', filter: 'date', sort: true, style: 'px200' },
    { id: 'summary', name: '내용', filter: false, sort: false }
  ]);

  const sort: Sort = reactive({
    id: false,
    order: 'asc'
  })

  const listData: [HomeData] = ref([
    { id: 1, title: "제목1", date: "2024-01-26", summary: "요약1" },
    { id: 2, title: "제목2", date: "2024-02-26", summary: "요약2" },
    { id: 3, title: "제목3", date: "2024-03-26", summary: "요약3" },
    { id: 4, title: "제목4", date: "2024-04-26", summary: "요약4" },
    { id: 5, title: "제목5", date: "2024-05-26", summary: "요약5" }
  ]);

  const searchKeyword: HomeFilter = reactive({});

  const doSort = (id: Boolean) => {
    if (sort.id === id) {
      sort.order = (sort.order === 'asc' ? 'desc' : 'asc')
    } else {
      sort.id = id
      sort.order = 'desc'
    }

    console.log('doSort: ', sort.id, sort.order)
  };

  const doSearch = (keyword: HomeFilter) => {
    for (const column of columns) {
      if (column.filter) {
        searchKeyword[column.id] = keyword[column.id]
      }
    }

    console.log('doSearch: ', keyword)
  };

  const doRead = (id: Boolean) => {
    console.log('doRead: ', id)
  };
</script>

<template>
  <h1 class="home-title">
    Challenge 2410
  </h1>

  <div class="home-container">
    <section class="home-table">
      <table>
        <thead>
          <TableHeaderRow :columns="columns"
                          :searchKeyword="searchKeyword"
                          :sort="sort"
                          @doSort="doSort"
                          @doSearch="doSearch" />
        </thead>
        <tbody>
          <tr class="gap top">
            <td v-for="gap in columns.length" />
          </tr>
          <tr class="gap">
            <td v-for="gap in columns.length" />
          </tr>
          <TableItemRow v-for="itemData in listData"
                        :columns="columns"
                        :itemData="itemData"
                        @doRead="doRead" />
          <tr class="gap">
            <td v-for="gap in columns.length" />
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
  .home-title {
    margin: var(--margin-03) var(--margin-03) var(--margin-01) var(--margin-03);
    font-size: var(--font-size-04);
    font-weight: bold;
  }

  .home-container {
    margin: var(--margin-01) calc(var(--margin-03) - var(--margin-01)) calc(var(--margin-03) - var(--margin-01));
    white-space: nowrap;
    overflow-x: auto;
  }

  .home-table {
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: var(--margin-01) 0;

      .gap {
        td {
          background: var(--dark-color-02);
          height: var(--margin-01);
        }

        &.top {
          td {
            background: transparent;
            height: var(--margin-01);
          }
        }
      }
    }
  }
</style>