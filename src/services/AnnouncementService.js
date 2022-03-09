import { appAxios } from '@/utils'

class AnnouncementService {
  static getAll() {
    return appAxios.get('/Duyurulars/getDetails')
  }

  static create(data) {
    const formData = new FormData()

    formData.append('Icerik', data.content)
    formData.append('Baslik', data.title)
    formData.append('image', data.image)
    formData.append('Tarih', data.date)

    if (data.extraImages)
      for (const i of Object.keys(data.extraImages))
        formData.append('images', data.extraImages[i])

    if (data.extraFiles)
      for (const i of Object.keys(data.extraFiles))
        formData.append('files', data.extraFiles[i])

    return appAxios.post('/Duyurulars/addDto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default AnnouncementService
