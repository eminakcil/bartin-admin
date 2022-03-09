<script setup>
import { ref, onMounted } from 'vue'

import HeaderMenuItemService from '@/services/HeaderMenuItemService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const headerMenuItemList = ref([])

onMounted(() => {
  loading.value = true
  HeaderMenuItemService.getAll()
    .then((response) => {
      headerMenuItemList.value = response.data.data
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
          <strong>Header Menü Öğe Listesi</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Ad</CTableHeaderCell>
                <CTableHeaderCell scope="col">Header</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sayfa</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="headerMenuItem in headerMenuItemList"
                :key="headerMenuItem"
              >
                <CTableHeaderCell scope="row">{{
                  headerMenuItem.id
                }}</CTableHeaderCell>
                <CTableDataCell>{{ headerMenuItem.ad }}</CTableDataCell>
                <CTableDataCell>{{
                  headerMenuItem.haeder_MenuAd
                }}</CTableDataCell>
                <CTableDataCell>{{ headerMenuItem.sayfaAd }}</CTableDataCell>
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
