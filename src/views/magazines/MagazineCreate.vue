<script setup>
import { ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import MagazineService from '@/services/MagazineService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  title: null,
  link: null,
  date: null,
  image: null,
})
const rules = {
  title: { required },
  link: { required },
  date: { required },
  image: { required },
}

const vuelidate = useVuelidate(rules, data)

const createSuccessToast = (title) => {
  toasts.value.push({
    title: 'İşlem Başarılı',
    content: `E-Bülten '${title}' eklendi`,
  })
}

const createFailToast = (title, error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `E-Bülten '${title}' eklenmedi. ${error}`,
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

    MagazineService.create(data.value)
      .then(() => {
        loading.value = false
        let tempTitle = ''
        tempTitle += data.value.title

        createSuccessToast(tempTitle)

        data.value.title = ''

        formRef.value.$el.reset()
        vuelidate.value.$reset()

        firstRef.value.$el.focus()
      })
      .catch((error) => {
        console.log('fail :>>', error)
        createFailToast(data.value.title, error)
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
          <strong>E-Bülten Ekle</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            ref="formRef"
            class="row g-3"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="mb-3">
              <CFormLabel>E-Bülten Başlığı</CFormLabel>
              <CFormInput
                type="text"
                ref="firstRef"
                placeholder="E-Bülten başlığını giriniz"
                v-model="data.title"
                :invalid="vuelidate.title.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>E-Bülten Bağlantısı</CFormLabel>
              <CFormInput
                type="text"
                placeholder="E-Bülten bağlantısı giriniz"
                v-model="data.link"
                :invalid="vuelidate.link.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>E-Bülten Kapak Görseli</CFormLabel>
              <CFormInput
                type="file"
                accept="image/png, image/gif, image/jpeg"
                @change="handleFileUpload($event, 'image', false)"
                :invalid="vuelidate.image.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>E-Bülten Tarihi</CFormLabel>
              <CFormInput
                type="date"
                v-model="data.date"
                :invalid="vuelidate.date.$errors.length > 0"
              />
            </div>
            <CButton color="primary">E-Bülten Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
