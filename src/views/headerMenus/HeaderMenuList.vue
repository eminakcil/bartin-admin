<script setup>
import { ref, onMounted } from 'vue'

import HeaderMenuService from '@/services/HeaderMenuService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const headerMenuList = ref([])

onMounted(() => {
  loading.value = true
  HeaderMenuService.getAll()
    .then((response) => {
      headerMenuList.value = response.data.data
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
          <strong>Header Menüler</strong>
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
                v-for="headerMenu in headerMenuList"
                :key="headerMenu.id"
              >
                <CTableHeaderCell scope="row">
                  {{ headerMenu.id }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ headerMenu.ad }}
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
