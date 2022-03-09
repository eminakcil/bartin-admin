<script setup>
import { ref, onMounted } from 'vue'

import ModalService from '@/services/ModalService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const modalList = ref([])

onMounted(() => {
  loading.value = true
  ModalService.getAll()
    .then((response) => {
      modalList.value = response.data.data
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
          <strong>Modal Listesi</strong>
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
              <CTableRow v-for="modal in modalList" :key="modal.id">
                <CTableHeaderCell scope="row">
                  {{ modal.id }}
                </CTableHeaderCell>
                <CTableHeaderCell>
                  {{ formatDate(modal.tarih) }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ modal.baslik }}
                </CTableDataCell>
                <CTableHeaderCell>
                  <CButton size="sm" color="success" variant="outline">
                    Detay
                  </CButton>
                  <CButton
                    size="sm"
                    color="success"
                    variant="outline"
                    class="ms-1"
                    @click.prevent="openImage(modal.resim_Dizin)"
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
