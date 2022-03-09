<script setup>
import { ref, onMounted } from 'vue'

import NewsService from '@/services/NewsService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const newsList = ref([])

onMounted(() => {
  loading.value = true
  NewsService.getAll()
    .then((response) => {
      newsList.value = response.data.data
    })
    .finally(() => {
      loading.value = false
    })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR')
}

const openImage = (imageLink) => {
  window.open(`${process.env.VUE_APP_API_HOST}/${imageLink}`, '_blank')
}
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Tüm Haberler</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tarih</CTableHeaderCell>
                <CTableHeaderCell scope="col">Başlık</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="news in newsList" :key="news.id">
                <CTableHeaderCell scope="row">
                  {{ news.id }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  {{ formatDate(news.tarih) }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ news.baslik }}
                </CTableDataCell>
                <CTableHeaderCell scope="col">
                  <CButton size="sm" color="success" variant="outline">
                    Detay
                  </CButton>
                  <CButton
                    size="sm"
                    color="success"
                    variant="outline"
                    class="ms-1"
                    @click.prevent="openImage(news.resim_Dizin)"
                  >
                    Resim
                  </CButton>
                </CTableHeaderCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
