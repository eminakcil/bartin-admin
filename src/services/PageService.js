import { appAxios } from '@/utils'

class PageService {
  static getAll() {
    return appAxios.get('/Sayfalars/getDetails')
  }

  static create(page) {
    const formData = new FormData()

    formData.append('Icerik', page.content)
    formData.append('Ad', page.title)
    formData.append('image', page.image)
    formData.append('Tarih', page.date)

    if (page.extraImages)
      for (const i of Object.keys(page.extraImages))
        formData.append('images', page.extraImages[i])

    if (page.extraFiles)
      for (const i of Object.keys(page.extraFiles))
        formData.append('files', page.extraFiles[i])

    return appAxios.post('/Sayfalars/addDto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default PageService
