import { appAxios } from '@/utils'

class MagazineService {
  static getAll() {
    return appAxios.get('/e_bultenlers/getall')
  }

  static create(data) {
    const formData = new FormData()

    formData.append('Ad', data.title)
    formData.append('Baglanti', data.link)
    formData.append('Tarih', data.date)
    formData.append('image', data.image)

    return appAxios.post('/e_bultenlers/addwithimage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default MagazineService
