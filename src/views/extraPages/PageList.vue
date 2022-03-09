<script setup>
import { ref, onMounted } from 'vue'

import PageService from '@/services/PageService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const pageList = ref([])

onMounted(() => {
  loading.value = true
  PageService.getAll()
    .then((response) => {
      pageList.value = response.data.data
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
          <strong>Tüm Sayfalar</strong>
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
              <CTableRow v-for="page in pageList" :key="page.id">
                <CTableHeaderCell scope="row">
                  {{ page.id }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  {{ formatDate(page.tarih) }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ page.ad }}
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
                    @click.prevent="openImage(page.resim_Dizin)"
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
