<script setup>
import { ref, onMounted } from 'vue'

import DataService from '@/services/PhotoGalleryService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const dataList = ref([])

onMounted(() => {
  loading.value = true
  DataService.getAll()
    .then((response) => {
      dataList.value = response.data.data
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Fotogaleriler</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Başlık</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="data in dataList" :key="data.id">
                <CTableHeaderCell scope="row">
                  {{ data.id }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ data.kategoriAd }}
                </CTableDataCell>
                <CTableHeaderCell scope="col">
                  <CButton size="sm" color="success" variant="outline">
                    Detay
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
