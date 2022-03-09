import { appAxios } from '@/utils'

class MidMenuService {
  static getAll() {
    return appAxios.get('/OrtaMenus/getAll')
  }

  static create(data) {
    return appAxios.post('/OrtaMenus/Add', {
      Ad: data.title,
      SimgeId: parseInt(data.icon_id),
      Baglanti: data.link,
      Aktiflik: false,
      Sira: 1,
      YeniSekme: data.targetIsBlank,
    })
  }
}

export default MidMenuService
