<script setup>
import { ref, onMounted } from 'vue'

import DataService from '@/services/ActivityService'
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
          <strong>Tüm Etkinlikler</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tarih</CTableHeaderCell>
                <CTableHeaderCell scope="col">Başlık</CTableHeaderCell>
                <CTableHeaderCell scope="col"
                  >Başlangıç Tarihi</CTableHeaderCell
                >
                <CTableHeaderCell scope="col">Bitiş Tarihi</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="data in dataList" :key="data.id">
                <CTableHeaderCell scope="row">
                  {{ data.id }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  {{ formatDate(data.tarih) }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ data.baslik }}
                </CTableDataCell>
                <CTableHeaderCell scope="row">
                  {{ formatDate(data.baslamaTarihi) }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  {{ formatDate(data.bitisTarihi) }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  <CButton size="sm" color="success" variant="outline">
                    Detay
                  </CButton>
                  <CButton
                    size="sm"
                    color="success"
                    variant="outline"
                    class="ms-1"
                    @click.prevent="openImage(data.resim_Dizin)"
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
