<script setup>
import { ref, onMounted } from 'vue'

import ReferanceService from '@/services/ReferanceService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const referanceList = ref([])

onMounted(() => {
  loading.value = true
  ReferanceService.getAll()
    .then((response) => {
      referanceList.value = response.data.data
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
          <strong>Referanslar</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Bağlantı</CTableHeaderCell>
                <CTableHeaderCell scope="col">Resim Dizin</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="referance in referanceList" :key="referance.id">
                <CTableHeaderCell scope="row">
                  {{ referance.id }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  {{ referance.baglanti }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  {{ referance.resim_Dizin }}
                </CTableHeaderCell>
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
