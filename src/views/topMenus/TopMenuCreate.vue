<script setup>
import { computed, onMounted, ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

import TopMenuService from '@/services/TopMenuService'
import PageService from '@/services/PageService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const pageList = ref([])

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  title: null,
  page_id: null,
  link: null,
  targetIsBlank: true,
})

const rules = {
  title: { required },
  page_id: {
    required,
    minValue: minValue(1),
  },
  link: { required },
  targetIsBlank: { required },
}

const vuelidate = useVuelidate(rules, data)

const createSuccessToast = () => {
  toasts.value.push({
    title: 'İşlem Başarılı',
    content: `Üst menü eklendi`,
  })
}

const createFailToast = (error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `Üst menü eklenmedi. ${error}`,
  })
}

const handleSubmit = async () => {
  vuelidate.value.$validate()

  if (!vuelidate.value.$invalid) {
    loading.value = true

    TopMenuService.create(data.value)
      .then(() => {
        loading.value = false
        createSuccessToast()

        formRef.value.$el.reset()
        vuelidate.value.$reset()

        firstRef.value.$el.focus()
      })
      .catch((error) => {
        console.log('fail :>>', error)
        createFailToast(error)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

onMounted(() => {
  PageService.getAll().then((response) => {
    pageList.value = response.data.data
  })
})

const pageOptions = computed(() => {
  return pageList.value.map((page) => {
    return {
      label: page.ad,
      value: page.id,
    }
  })
})

const pageOptionsLabel = {
  label: 'Sayfa seçiniz',
  value: -1,
}
</script>

<template>
  <CToaster placement="top-end">
    <CToast v-for="(toast, index) in toasts" :key="index">
      <CToastHeader closeButton>
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody>
        {{ toast.content }}
      </CToastBody>
    </CToast>
  </CToaster>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Yeni Üst Menü Ekle</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            ref="formRef"
            class="row g-3"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="mb-3">
              <CFormLabel>Ad</CFormLabel>
              <CFormInput
                type="text"
                ref="firstRef"
                placeholder="Başlık giriniz"
                v-model="data.title"
                :invalid="vuelidate.title.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Bağlantı</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Bağlantı giriniz"
                v-model="data.link"
                :invalid="vuelidate.link.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Sayfa</CFormLabel>
              <CFormSelect
                :options="[pageOptionsLabel, ...pageOptions]"
                v-model="data.page_id"
                :invalid="vuelidate.page_id.$errors.length > 0"
              />
            </div>
            <CFormCheck label="Yeni Sekme" v-model="data.targetIsBlank" />
            <CButton color="primary">Üst Menü Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
