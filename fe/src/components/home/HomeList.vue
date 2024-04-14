<script setup lang="ts">
  import type { Column, Sort, HomeData, HomeFilter } from '@/types'
  import HomeApi from '@/api/home'

  import { ref, reactive } from 'vue'

  import TableHeaderRow from '@/components/home/TableHeaderRow.vue'
  import TableItemRow from '@/components/home/TableItemRow.vue'

  import HomeInsert from '@/components/home/HomeInsert.vue'

  const columns = reactive<[Column]>([
    { id: 'title', name: '제목', filter: 'string', sort: true, style: 'px200', required: true },
    { id: 'date', name: '날짜', filter: 'date', sort: true, style: 'px200', required: true },
    { id: 'summary', name: '내용', filter: false, sort: false, required: true }
  ]);

  const sort = reactive<Sort>({
    id: 'date',
    order: 'desc'
  })

  let listData = ref<[HomeData]>([])

  const searchKeyword = reactive<HomeFilter>({})

  const isShowInsert = ref<Boolean>(false)

  const getList = () => {
    HomeApi.getList({ filter: searchKeyword, sort })
        .then((response: { data: any }) => {
          listData.value = response.data.list
        })
        .catch(() => {
          alert('오류가 발생했습니다.')
        })
  }

  const postItem = (data: any) => {
    HomeApi.postInsert(data)
        .then(() => {
          isShowInsert.value = false
          getList()
        })
        .catch(() => {
          alert('오류가 발생했습니다.')
        })
  }

  const doSort = (id: Boolean) => {
    if (sort.id === id) {
      sort.order = (sort.order === 'asc' ? 'desc' : 'asc')
    } else {
      sort.id = id
      sort.order = 'desc'
    }
    getList()
  }

  const doSearch = (keyword: HomeFilter) => {
    for (const column of columns) {
      if (column.filter) {
        searchKeyword[column.id] = keyword[column.id]
      }
    }

    getList()
  }

  const showInsert = (show: Boolean) => {
    if (show || confirm('정말로 닫으시겠습니까?')) {
      isShowInsert.value = show
    }
  }

  const doInsert = (data: HomeData) => {
    postItem(data)
  }

  getList()
</script>

<template>
  <div class="home-title">
    <h1>Challenge 2410</h1>
    <div class="btn-area">
      <button class="btn"
              @click="showInsert(true)">
        <FontAwesomeIcon :icon="['fas', 'plus']" />
        추가
      </button>
    </div>
  </div>

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
            <td v-for="gap in columns.length"
                :key="`gap1${gap}`" />
          </tr>
          <tr class="gap">
            <td v-for="gap in columns.length"
                :key="`gap2${gap}`" />
          </tr>
          <TableItemRow v-for="itemData in listData"
                        :key="`item-${itemData.id}`"
                        :columns="columns"
                        :itemData="itemData" />
          <tr class="gap">
            <td v-for="gap in columns.length"
                :key="`gap3${gap}`" />
          </tr>
        </tbody>
      </table>
    </section>
  </div>

  <div v-if="isShowInsert"
       class="home-insert-modal">
    <div class="modal-container">
      <button class="close"
              @click="showInsert(false)">
        <FontAwesomeIcon :icon="['fas', 'close']" />
      </button>
      <HomeInsert :columns="columns"
                  @doInsert="doInsert" />
    </div>
  </div>
</template>

<style scoped>
  .home-title {
    margin: var(--margin-03) var(--margin-03) 0;

    h1 {
      float: left;
      font-size: var(--font-size-04);
      font-weight: bold;
      line-height: var(--margin-04);
    }

    .btn-area {
      float: right;
    }

    &::after {
      display: block;
      content: "";
      clear: both;
    }
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

  .home-insert-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);

    .modal-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(100vw - var(--margin-04) * 2);
      max-width: 480px;
      max-height: calc(100vh - var(--margin-04) * 2);
      overflow: auto;
      transform: translate(-50%, -50%);
      background: var(--dark-color-02);

      .close {
        position: absolute;
        top: var(--margin-01);
        right: var(--margin-01);
        width: var(--margin-04);
        height: var(--margin-04);
        line-height: var(--margin-04);
        text-align: center;
        background: transparent;
        border: none;
        cursor: pointer;

        &:hover,
        &:active {
          color: var(--primary-color-04);
        }
      }
    }
  }
</style>