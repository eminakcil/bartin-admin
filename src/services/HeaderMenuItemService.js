import { appAxios } from '@/utils'

class HeaderMenuItemService {
  static path = 'header_menu_oges'
  static getAll() {
    return appAxios.get(`/${this.path}/getdetails`)
  }

  static create(data) {
    return appAxios.post(
      `/${this.path}/add`,
      {
        Ad: data.title,
        Header_Menu_Id: parseInt(data.headerMenuId),
        SayfaId: parseInt(data.pageId),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default HeaderMenuItemService
