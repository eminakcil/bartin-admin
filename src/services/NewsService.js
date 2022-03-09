import { appAxios } from '@/utils'

class NewsService {
  static getAll() {
    return appAxios.get('/Haberlers/getDetails')
  }

  static create(news) {
    const formData = new FormData()

    formData.append('Icerik', news.content)
    formData.append('Baslik', news.title)
    formData.append('image', news.image)
    formData.append('Tarih', news.date)

    if (news.extraImages)
      for (const i of Object.keys(news.extraImages))
        formData.append('images', news.extraImages[i])

    if (news.extraFiles)
      for (const i of Object.keys(news.extraFiles))
        formData.append('files', news.extraFiles[i])

    return appAxios.post('/haberlers/addDto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default NewsService
