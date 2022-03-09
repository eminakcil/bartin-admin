import { appAxios } from '@/utils'

class ActivityService {
  static getAll() {
    return appAxios.get('/Etkinliklers/getDetails')
  }

  static create(data) {
    const formData = new FormData()

    formData.append('Icerik', data.content)
    formData.append('Baslik', data.title)
    formData.append('image', data.image)
    formData.append('Tarih', data.date)
    formData.append('BaslamaTarihi', data.startDate)
    formData.append('BitisTarihi', data.endDate)

    if (data.extraImages)
      for (const i of Object.keys(data.extraImages))
        formData.append('images', data.extraImages[i])

    if (data.extraFiles)
      for (const i of Object.keys(data.extraFiles))
        formData.append('files', data.extraFiles[i])

    return appAxios.post('/Etkinliklers/addDto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default ActivityService
