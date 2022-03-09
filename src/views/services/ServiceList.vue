<script setup>
import { ref, onMounted } from 'vue'

import ServiceService from '@/services/ServiceService'
import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const serviceList = ref([])

onMounted(() => {
  loading.value = true
  ServiceService.getAll()
    .then((response) => {
      serviceList.value = response.data.data
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
          <strong>Hizmetler Listesi</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Ad</CTableHeaderCell>
                <CTableHeaderCell scope="col">Aktiflik</CTableHeaderCell>
                <CTableHeaderCell scope="col">Yeni Sekme</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="service in serviceList" :key="service.id">
                <CTableHeaderCell scope="row">{{
                  service.id
                }}</CTableHeaderCell>
                <CTableDataCell>{{ service.ad }}</CTableDataCell>
                <CTableDataCell>
                  <template v-if="service.aktiflik">true</template>
                  <template v-else>false</template>
                </CTableDataCell>
                <CTableDataCell>
                  <template v-if="service.yeniSekme">true</template>
                  <template v-else>false</template>
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
