<script setup>
import { computed, onMounted, ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

import FooterMenuItemService from '@/services/FooterMenuItemService'
import FooterMenuService from '@/services/FooterMenuService'
import PageService from '@/services/PageService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const footerMenuList = ref([])
const pageList = ref([])

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  title: null,
  footerMenuId: '0',
  pageId: '0',
})

const rules = {
  title: { required },
  footerMenuId: {
    required,
    minValue: minValue(1),
  },
  pageId: {
    required,
    minValue: minValue(1),
  },
}

const vuelidate = useVuelidate(rules, data)

const createSuccessToast = () => {
  toasts.value.push({
    title: 'İşlem Başarılı',
    content: `Footer menü öğe eklendi`,
  })
}

const createFailToast = (error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `Footer menü öğe eklenmedi. ${error}`,
  })
}

const handleSubmit = async () => {
  vuelidate.value.$validate()

  if (!vuelidate.value.$invalid) {
    loading.value = true

    FooterMenuItemService.create(data.value)
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

  PageService.getAll().then((response) => {
    pageList.value = response.data.data
  })
})

const footerMenuOptions = computed(() => {
  return footerMenuList.value.map((footerMenu) => {
    return {
      label: footerMenu.ad,
      value: footerMenu.id,
    }
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

const footerMenuOptionsLabel = {
  label: 'Footer Menü seçiniz',
  value: 0,
}

const pageOptionsLabel = {
  label: 'Sayfa seçiniz',
  value: 0,
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
          <strong>Yeni Footer Menü Öğe Ekle</strong>
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
              <CFormLabel>Footer Menü</CFormLabel>
              <CFormSelect
                :options="[footerMenuOptionsLabel, ...footerMenuOptions]"
                v-model="data.footerMenuId"
                :invalid="vuelidate.footerMenuId.$errors.length > 0"
              />
            </div>
            <div class="mb-3">
              <CFormLabel>Hedef Sayfa</CFormLabel>
              <CFormSelect
                :options="[pageOptionsLabel, ...pageOptions]"
                v-model="data.pageId"
                :invalid="vuelidate.pageId.$errors.length > 0"
              />
            </div>
            <CButton color="primary">Footer Menü Öğe Ekle</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <FullViewSpinner v-show="loading" />
</template>
