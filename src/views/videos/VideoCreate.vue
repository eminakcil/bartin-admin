<script setup>
import { ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import DataService from '@/services/VideoService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  title: null,
  link: null,
})
const rules = {
  title: { required },
  link: { required },
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
    content: `Videogaleri '${title}' eklenmedi. ${error}`,
  })
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
          <strong>Yeni Video Ekle</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            ref="formRef"
            class="row g-3"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="mb-3">
              <CFormLabel>Video Başlığı</CFormLabel>
              <CFormInput
                type="text"
                ref="firstRef"
                placeholder="Video başlığını giriniz"
                v-model="data.title"
                :invalid="vuelidate.title.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Video Bağlantısı</CFormLabel>
              <CFormInput
                type="text"
                placeholder="https://youtu.be/l3zAqQacTGA"
                v-model="data.link"
                :invalid="vuelidate.link.$errors.length > 0"
              />
            </div>
            <CButton color="primary">Video Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
