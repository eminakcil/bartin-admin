import { appAxios } from '@/utils'

class ModalService {
  static getAll() {
    return appAxios.get('/modals/getall')
  }

  static create(data) {
    const formData = new FormData()

    formData.append('image', data.image)
    formData.append('Baglanti', data.link)
    formData.append('Tarih', data.date)
    formData.append('Baslik', data.title)

    return appAxios.post('/modals/addWithImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default ModalService
