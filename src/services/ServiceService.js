import { appAxios } from '@/utils'

class FooterMenuItemService {
  static path = 'hizmetlers'
  static getAll() {
    return appAxios.get(`/${this.path}/getdetails`)
  }

  static create(data) {
    const reqBody = {
      Ad: data.title,
      YeniSekme: data.newTab,
      SimgeId: parseInt(data.iconId),
      Baglanti: data.link,
      Sira: 1,
      Aktiflik: false,
      SayfaId: 1,
    }

    return appAxios.post(`/${this.path}/add`, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default FooterMenuItemService
