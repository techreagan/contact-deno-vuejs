import axios from 'axios'

export default () => {
  const axiosInstance = axios.create({
    baseURL: `${process.env.VUE_APP_URL}/api/v1`
  })
  console.log(process.env.VUE_APP_URL)
  return axiosInstance
}
