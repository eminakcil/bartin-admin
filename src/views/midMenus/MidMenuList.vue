<script setup>
import { ref, onMounted } from 'vue'

import MidMenuService from '@/services/MidMenuService'

const loading = ref(false)
const midMenuList = ref([])

onMounted(() => {
  loading.value = true
  MidMenuService.getAll()
    .then((response) => {
      midMenuList.value = response.data.data
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
          <strong>Orta Menüler</strong>
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
              <CTableRow v-for="midMenu in midMenuList" :key="midMenu.id">
                <CTableHeaderCell scope="row">
                  {{ midMenu.id }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ midMenu.ad }}
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
