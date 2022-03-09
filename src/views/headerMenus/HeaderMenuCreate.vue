<script setup>
import { computed, onMounted, ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

import HeaderMenuService from '@/services/HeaderMenuService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const headerMenuList = ref([])

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  title: null,
  parentMenuId: null,
})

const rules = {
  title: { required },
  parentMenuId: {
    minValue: minValue(1),
  },
}

const vuelidate = useVuelidate(rules, data)

const createSuccessToast = () => {
  toasts.value.push({
    title: 'İşlem Başarılı',
    content: `Header menü eklendi`,
  })
}

const createFailToast = (error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `Header menü eklenmedi. ${error}`,
  })
}

const handleSubmit = async () => {
  vuelidate.value.$validate()

  if (!vuelidate.value.$invalid) {
    loading.value = true

    HeaderMenuService.create(data.value)
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
  HeaderMenuService.getAll().then((response) => {
    headerMenuList.value = response.data.data
  })
})

const headerMenuOptions = computed(() => {
  return headerMenuList.value.map((headerMenu) => {
    return {
      label: headerMenu.ad,
      value: headerMenu.id,
    }
  })
})

const headerMenuOptionsLabel = {
  label: 'Header Menü seçiniz',
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
          <strong>Yeni Header Menü Ekle</strong>
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
              <CFormLabel>Üst Header Menü</CFormLabel>
              <CFormSelect
                :options="[headerMenuOptionsLabel, ...headerMenuOptions]"
                v-model="data.parentMenuId"
                :invalid="vuelidate.parentMenuId.$errors.length > 0"
              />
            </div>
            <CButton color="primary">Header Menü Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
