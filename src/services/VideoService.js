import { appAxios } from '@/utils'

class VideoService {
  static getAll() {
    return appAxios.get('/videogaleris/getAll')
  }

  static create(data) {
    return appAxios.post('/videogaleris/add', {
      Baslik: data.title,
      Dizin: data.link,
    })
  }
}

export default VideoService
