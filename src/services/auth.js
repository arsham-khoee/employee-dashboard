import axios from "axios"

const login = async (inputs) => {
  try {
    const { data } = await axios.post("/login", inputs)
    return Promise.resolve(data)
  } catch (err) {
    console.error(err)
    return Promise.reject(err.response)
  }
}

export {login}