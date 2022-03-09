<script setup>
import { ref, onMounted } from 'vue'

import IconService from '@/services/IconService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const iconList = ref([])

onMounted(() => {
  loading.value = true
  IconService.getAll()
    .then((response) => {
      iconList.value = response.data.data
    })
    .finally(() => {
      loading.value = false
    })
})

const openImage = (imageLink) => {
  window.open(`${process.env.VUE_APP_API_HOST}/${imageLink}`, '_blank')
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
          <strong>Tüm Simgeler</strong>
        </CCardHeader>
        <CCardBody>
          <div class="icon-list">
            <div
              @click="openImage(icon.resim_Dizin)"
              class="icon-item"
              v-for="icon in iconList"
              :key="icon.id"
            >
              <img :src="getHostLink(icon.resim_Dizin)" />
              <span>{{ icon.baslik }}</span>
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
  text-align: center;
}

.icon-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
