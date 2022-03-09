<script setup>
import { ref, onMounted } from 'vue'

import FooterMenuItemService from '@/services/FooterMenuItemService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const footerMenuItemList = ref([])

onMounted(() => {
  loading.value = true
  FooterMenuItemService.getAll()
    .then((response) => {
      footerMenuItemList.value = response.data.data
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
          <strong>Footer Menü Öğe Listesi</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Ad</CTableHeaderCell>
                <CTableHeaderCell scope="col">Başlık</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sayfa</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="footerMenuItem in footerMenuItemList"
                :key="footerMenuItem"
              >
                <CTableHeaderCell scope="row">{{
                  footerMenuItem.id
                }}</CTableHeaderCell>
                <CTableDataCell>{{ footerMenuItem.ad }}</CTableDataCell>
                <CTableDataCell>{{ footerMenuItem.baslikAd }}</CTableDataCell>
                <CTableDataCell>{{ footerMenuItem.sayfaAd }}</CTableDataCell>
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
