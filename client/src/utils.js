import axios from "axios"

export const BASE_URL = "http://localhost:8000"

export const handleSignIn = async (user) => {
    await axios
      .post(BASE_URL + '/api/token/', user, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        localStorage.clear()
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res.data.access}`
      })
    await axios.get(BASE_URL + '/api/user/').then((res) => {
      localStorage.setItem('user', res.data)
    })
  }
  
  export const handleSignUp = async (user) => {
    await axios
      .post(BASE_URL + '/api/signup/', user, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        localStorage.clear()
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res.data.access}`
      })
  }