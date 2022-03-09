import axios from 'axios'

const appAxios = axios.create({
  baseURL: `${process.env.VUE_APP_API_HOST}/${process.env.VUE_APP_API_PATH}`,
})

export default appAxios
