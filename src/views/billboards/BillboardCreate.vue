<script setup>
import { ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import BillboardService from '@/services/BillboardService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  link: null,
  image: null,
})
const rules = {
  link: { required },
  image: { required },
}

const vuelidate = useVuelidate(rules, data)

const createSuccessToast = () => {
  toasts.value.push({
    title: 'İşlem Başarılı',
    content: `Billboard eklendi`,
  })
}

const createFailToast = (error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `Billboard eklenmedi. ${error}`,
  })
}

const handleFileUpload = (event, keyOfData, multiple = true) => {
  let _value

  if (multiple) _value = event.target.files
  else _value = event.target.files[0]

  data.value[keyOfData] = _value
}

const handleSubmit = async () => {
  vuelidate.value.$validate()

  if (!vuelidate.value.$invalid) {
    loading.value = true

    BillboardService.create(data.value)
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
          <strong>Yeni Billboard Ekle</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            ref="formRef"
            class="row g-3"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="mb-3">
              <CFormLabel>Bağlantı</CFormLabel>
              <CFormInput
                type="text"
                ref="firstRef"
                placeholder="Bağlantı giriniz"
                v-model="data.link"
                :invalid="vuelidate.link.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Resim</CFormLabel>
              <CFormInput
                type="file"
                accept="image/png, image/gif, image/jpeg"
                @change="handleFileUpload($event, 'image', false)"
                :invalid="vuelidate.image.$errors.length > 0"
              />
            </div>
            <CButton color="primary">Resim Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
