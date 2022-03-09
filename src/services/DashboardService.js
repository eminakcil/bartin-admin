import { appAxios } from '@/utils'

class DashboardService {
  static getCounts() {
    return appAxios.get('/dashboards')
  }
}

export default DashboardService
