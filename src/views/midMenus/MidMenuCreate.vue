<script setup>
import { computed, onMounted, ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

import MidMenuService from '@/services/MidMenuService'
import IconService from '@/services/IconService'

import FullViewSpinner from '@/components/FullViewSpinner.vue'

const iconList = ref([])

const loading = ref(false)
const toasts = ref([])

const formRef = ref()
const firstRef = ref()

const data = ref({
  title: null,
  icon_id: null,
  link: null,
  targetIsBlank: true,
})

const rules = {
  title: { required },
  icon_id: {
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
    content: `Orta menü eklendi`,
  })
}

const createFailToast = (error) => {
  toasts.value.push({
    title: 'İşlem Başarısız',
    content: `Orta menü eklenmedi. ${error}`,
  })
}

const handleSubmit = async () => {
  vuelidate.value.$validate()

  if (!vuelidate.value.$invalid) {
    loading.value = true

    MidMenuService.create(data.value)
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
          <strong>Yeni Orta Menü Ekle</strong>
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
              <CFormLabel>Simge</CFormLabel>
              <CFormSelect
                :options="[iconOptionsLabel, ...iconOptions]"
                v-model="data.icon_id"
                :invalid="vuelidate.icon_id.$errors.length > 0"
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
