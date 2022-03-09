<script setup>
import { onMounted, ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import FooterMenuService from '@/services/FooterMenuService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const footerMenuList = ref([])

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  title: null,
})

const rules = {
  title: { required },
}

const vuelidate = useVuelidate(rules, data)

const createSuccessToast = () => {
  toasts.value.push({
    title: 'İşlem Başarılı',
    content: `Footer menü eklendi`,
  })
}

const createFailToast = (error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `Footer menü eklenmedi. ${error}`,
  })
}

const handleSubmit = async () => {
  vuelidate.value.$validate()

  if (!vuelidate.value.$invalid) {
    loading.value = true

    FooterMenuService.create(data.value)
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
  FooterMenuService.getAll().then((response) => {
    footerMenuList.value = response.data.data
  })
})
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
          <strong>Yeni Footer Menü Ekle</strong>
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
            <CButton color="primary">Footer Menü Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
