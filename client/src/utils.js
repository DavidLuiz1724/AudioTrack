import axios from "axios"

export const BASE_URL = ""

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
      .catch((err) => {
        console.error("error", err)
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
      .catch((err) => {
        console.error("error", err)
      })
  }
