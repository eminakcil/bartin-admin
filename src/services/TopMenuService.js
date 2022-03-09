import { appAxios } from '@/utils'

class TopMenuService {
  static getAll() {
    return appAxios.get('/topmenus/getAll')
  }

  static create(data) {
    return appAxios.post('/TopMenus/Add', {
      Ad: data.title,
      SayfaId: parseInt(data.page_id),
      Baglanti: data.link,
      YeniSekme: data.targetIsBlank,
      Sira: 1,
      Aktiflik: false,
    })
  }
}

export default TopMenuService
