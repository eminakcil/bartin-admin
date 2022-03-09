<script setup>
import { ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import DataService from '@/services/PhotoGalleryService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  title: null,
  images: null,
})
const rules = {
  title: { required },
  images: { required },
}

const vuelidate = useVuelidate(rules, data)

const createSuccessToast = (title) => {
  toasts.value.push({
    title: 'İşlem Başarılı',
    content: `Fotogaleri '${title}' eklendi`,
  })
}

const createFailToast = (title, error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `Fotogaleri '${title}' eklenmedi. ${error}`,
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

    DataService.create(data.value)
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
          <strong>Yeni Fotogaleri Ekle</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            ref="formRef"
            class="row g-3"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="mb-3">
              <CFormLabel>Fotogaleri Başlığı</CFormLabel>
              <CFormInput
                type="text"
                ref="firstRef"
                placeholder="Fotogaleri başlığını giriniz"
                v-model="data.title"
                :invalid="vuelidate.title.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Fotogaleri Fotoğrafları Ekle</CFormLabel>
              <CFormInput
                type="file"
                accept="image/png, image/gif, image/jpeg"
                multiple
                @change="handleFileUpload($event, 'images')"
                :invalid="vuelidate.images.$errors.length > 0"
              />
            </div>
            <CButton color="primary">Fotogaleri Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
