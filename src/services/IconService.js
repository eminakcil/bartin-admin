import { appAxios } from '@/utils'

class IconService {
  static getAll() {
    return appAxios.get('/Simgelers/getAll')
  }

  static create(page) {
    const formData = new FormData()

    formData.append('Baslik', page.title)
    formData.append('image', page.image)

    return appAxios.post('/Simgelers/addWithImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default IconService
