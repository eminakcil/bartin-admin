import { appAxios } from '@/utils'

class FooterMenuService {
  static path = 'footer_menu_basliks'
  static getAll() {
    return appAxios.get(`/${this.path}/getall`)
  }

  static create(data) {
    return appAxios.post(
      `/${this.path}/add`,
      {
        Ad: data.title,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default FooterMenuService
