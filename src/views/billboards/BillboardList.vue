<script setup>
import { ref, onMounted } from 'vue'

import BillboardService from '@/services/BillboardService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const dataList = ref([])

onMounted(() => {
  loading.value = true
  BillboardService.getAll()
    .then((response) => {
      dataList.value = response.data.data
    })
    .finally(() => {
      loading.value = false
    })
})

const openNewTab = (link) => {
  window.open(link, '_blank')
}

const getHostLink = (append) => {
  return `${process.env.VUE_APP_API_HOST}/${append}`
}
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Billboard Listesi</strong>
        </CCardHeader>
        <CCardBody>
          <div class="icon-list">
            <div
              @click="openNewTab(data.baglanti)"
              class="icon-item"
              v-for="data in dataList"
              :key="data.id"
            >
              <img :src="getHostLink(data.dizin)" />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>

<style scoped>
.icon-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 7px;
}
.icon-item {
  width: 100%;
  aspect-ratio: 1;
  background-image: var(--image-link);
  cursor: pointer;
}

.icon-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
