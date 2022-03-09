<script setup>
import { ref, onMounted } from 'vue'

import FooterMenuService from '@/services/FooterMenuService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const footerMenuList = ref([])

onMounted(() => {
  loading.value = true
  FooterMenuService.getAll()
    .then((response) => {
      footerMenuList.value = response.data.data
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
          <strong>Footer Menüler</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Ad</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="footerMenu in footerMenuList"
                :key="footerMenu.id"
              >
                <CTableHeaderCell scope="row">
                  {{ footerMenu.id }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ footerMenu.ad }}
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
