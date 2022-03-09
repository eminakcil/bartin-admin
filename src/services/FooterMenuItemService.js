import { appAxios } from '@/utils'

class FooterMenuItemService {
  static path = 'footer_menu_oges'
  static getAll() {
    return appAxios.get(`/${this.path}/getdetails`)
  }

  static create(data) {
    return appAxios.post(
      `/${this.path}/add`,
      {
        Ad: data.title,
        Footer_Menu_Baslik_Id: parseInt(data.footerMenuId),
        Sayfa_id: parseInt(data.pageId),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default FooterMenuItemService
