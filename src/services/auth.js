import axiosInstance from "../../axios.config"

const login = async (inputs) => {
  try {
    const { data } = await axiosInstance.post("/login", inputs)
    return Promise.resolve(data)
  } catch (err) {
    console.error(err)
    return Promise.reject(err.response)
  }
}

const signup = async (inputs) => {
  try {
    const {data} = await axiosInstance.patch("/signup", inputs)
    return Promise.resolve(data)
  } catch(err) {
    console.error(err)
    return Promise.reject(err.message)
  }
}

export { login, signup }
