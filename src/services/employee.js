import axiosInstance from "../../axios.config"

const getAllEmployees = async () => {
  try {
    const { data } = await axiosInstance.get("/employees")
    return Promise.resolve(data)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

export { getAllEmployees }
