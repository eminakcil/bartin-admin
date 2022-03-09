import { appAxios } from '@/utils'

class ReferanceService {
  static getAll() {
    return appAxios.get('/referanslars/getall')
  }

  static create(data) {
    const formData = new FormData()

    formData.append('Baglanti', data.link)
    formData.append('image', data.image)

    return appAxios.post('/referanslars/addwithimage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default ReferanceService
