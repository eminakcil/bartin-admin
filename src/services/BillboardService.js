import { appAxios } from '@/utils'

class BillboardService {
  static getAll() {
    return appAxios.get('/billboards/getall')
  }

  static create(data) {
    const formData = new FormData()

    formData.append('Baglanti', data.link)
    formData.append('image', data.image)

    return appAxios.post('/billboards/addWithImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default BillboardService
