<script setup>
import { ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import DataService from '@/services/ActivityService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const editorConfig = {}
const data = ref({
  title: null,
  image: null,
  content: null,
  extraFiles: null,
  extraImages: null,
  date: null,
  startDate: null,
  endDate: null,
})
const rules = {
  title: { required },
  image: { required },
  content: {
    required: helpers.withMessage('Etkinlik İçeriği boş olamaz', required),
  },
  extraFiles: {},
  extraImages: {},
  date: { required },
  startDate: { required },
  endDate: { required }, //todo make more rule
}

const vuelidate = useVuelidate(rules, data)

const createSuccessToast = (title) => {
  toasts.value.push({
    title: 'İşlem Başarılı',
    content: `Etkinlik '${title}' eklendi`,
  })
}

const createFailToast = (title, error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `Etkinlik '${title}' eklenmedi. ${error}`,
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
        data.value.content = ''

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
          <strong>Yeni Etkinlik Ekle</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            ref="formRef"
            class="row g-3"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="mb-3">
              <CFormLabel>Etkinlik Başlığı</CFormLabel>
              <CFormInput
                type="text"
                ref="firstRef"
                placeholder="Etkinlik başlığını giriniz"
                v-model="data.title"
                :invalid="vuelidate.title.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Etkinlik Görseli</CFormLabel>
              <CFormInput
                type="file"
                accept="image/png, image/gif, image/jpeg"
                @change="handleFileUpload($event, 'image', false)"
                :invalid="vuelidate.image.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Etkinlik İçeriği </CFormLabel>
              <ckeditor
                :editor="ClassicEditor"
                :config="editorConfig"
                v-model="data.content"
              ></ckeditor>
              <CAlert
                color="danger"
                class="m-0 mt-3"
                v-for="error in vuelidate.content.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </CAlert>
            </div>
            <div class="mb-3">
              <CFormLabel>Etkinlik Tarihi</CFormLabel>
              <CFormInput
                type="date"
                v-model="data.date"
                :invalid="vuelidate.date.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Etkinlik Başlangıç Tarihi</CFormLabel>
              <CFormInput
                type="date"
                v-model="data.startDate"
                :invalid="vuelidate.startDate.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Etkinlik Bitiş Tarihi</CFormLabel>
              <CFormInput
                type="date"
                v-model="data.endDate"
                :invalid="vuelidate.endDate.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Etkinlik Dosyaları Ekle</CFormLabel>
              <CFormInput
                type="file"
                multiple
                @change="handleFileUpload($event, 'extraFiles')"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Etkinlik Fotoğrafları Ekle</CFormLabel>
              <CFormInput
                type="file"
                accept="image/png, image/gif, image/jpeg"
                multiple
                @change="handleFileUpload($event, 'extraImages')"
              />
            </div>
            <CButton color="primary">Etkinlik Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
