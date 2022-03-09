<script setup>
import { ref, onMounted } from 'vue'

import MagazineService from '@/services/MagazineService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const magazineList = ref([])

onMounted(() => {
  loading.value = true
  MagazineService.getAll()
    .then((response) => {
      console.table(response.data.data)
      magazineList.value = response.data.data
    })
    .finally(() => {
      loading.value = false
    })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR')
}
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>E-Bültenler</strong>
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
              <CTableRow v-for="magazine in magazineList" :key="magazine.id">
                <CTableHeaderCell scope="row">
                  {{ magazine.id }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  {{ formatDate(magazine.tarih) }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ magazine.ad }}
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
