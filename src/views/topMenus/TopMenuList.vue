<script setup>
import { ref, onMounted } from 'vue'

import TopMenuService from '@/services/TopMenuService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const topMenuList = ref([])

onMounted(() => {
  loading.value = true
  TopMenuService.getAll()
    .then((response) => {
      topMenuList.value = response.data.data
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
          <strong>Üst Menüler</strong>
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
              <CTableRow v-for="topMenu in topMenuList" :key="topMenu.id">
                <CTableHeaderCell scope="row">
                  {{ topMenu.id }}
                </CTableHeaderCell>
                <CTableDataCell>
                  {{ topMenu.ad }}
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
