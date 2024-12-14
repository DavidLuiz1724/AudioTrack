import axios from "axios"
import { useNavigate } from "react-router-dom"



export const BASE_URL = "http://localhost:8000"

export const handleSignIn = async (user) => {
    const navigate = useNavigate();
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
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("error", err)
      })

      await axios.get(BASE_URL + `/api/user/`).then((res) => {
        console.log("data", res.data);
        localStorage.setItem("user", JSON.stringify(res.data))
      }).catch((err) => {
        console.error("error", err)
      })
  }

  export const handleSignUp = async (user) => {
    const navigate = useNavigate();
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
        navigate("/signin")
      })
      .catch((err) => {
        console.error("error", err)
      })
  }