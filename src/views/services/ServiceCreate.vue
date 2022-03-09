<script setup>
import { computed, onMounted, ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

import ServiceService from '@/services/ServiceService'
import IconService from '@/services/IconService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const iconList = ref([])

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  title: null,
  link: null,
  newTab: false,
  iconId: '0',
})

const rules = {
  title: { required },
  link: { required },
  newTab: { required },
  iconId: {
    required,
    minValue: minValue(1),
  },
}

const vuelidate = useVuelidate(rules, data)

const createSuccessToast = () => {
  toasts.value.push({
    title: 'İşlem Başarılı',
    content: `Hizmet eklendi`,
  })
}

const createFailToast = (error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `Hizmet eklenmedi. ${error}`,
  })
}

const handleSubmit = () => {
  console.table(data.value)
  vuelidate.value.$validate()

  vuelidate.value.$validate()

  if (!vuelidate.value.$invalid) {
    loading.value = true

    ServiceService.create(data.value)
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
  IconService.getAll().then((response) => {
    iconList.value = response.data.data
  })
})

const iconOptions = computed(() => {
  return iconList.value.map((icon) => {
    return {
      label: icon.baslik,
      value: icon.id,
    }
  })
})

const iconOptionsLabel = {
  label: 'Simge seçiniz',
  value: '0',
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
          <strong>Yeni Hizmet Ekle</strong>
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
              <CFormLabel>Hedef Bağlantı</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Bağlantı giriniz"
                v-model="data.link"
                :invalid="vuelidate.link.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormCheck label="Yeni Sekmede Aç" v-model="data.newTab" />
            </div>
            <div class="mb-3">
              <CFormLabel>Simge</CFormLabel>
              <CFormSelect
                :options="[iconOptionsLabel, ...iconOptions]"
                v-model="data.iconId"
                :invalid="vuelidate.iconId.$errors.length > 0"
              />
            </div>
            <CButton color="primary">Hizmet Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
