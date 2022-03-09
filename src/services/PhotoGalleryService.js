import { appAxios } from '@/utils'

class PhotoGalleryService {
  static getAll() {
    return appAxios.get('/Kategoris/getAll')
  }

  static create(data) {
    const formData = new FormData()

    formData.append('KategoriAd', data.title)

    if (data.images)
      for (const i of Object.keys(data.images))
        formData.append('images', data.images[i])

    return appAxios.post('/Fotogaleris/addDto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default PhotoGalleryService
