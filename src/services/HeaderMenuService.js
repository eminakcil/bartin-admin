import { appAxios } from '@/utils'

class HeaderMenuService {
  static path = 'header_menus'
  static getAll() {
    return appAxios.get(`/${this.path}/getall`)
  }

  static create(data) {
    return appAxios.post(
      `/${this.path}/add`,
      {
        Ad: data.title,
        Header_Menu_Id: parseInt(data.parentMenuId),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default HeaderMenuService
