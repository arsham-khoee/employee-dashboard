import axiosInstance from "../../axios.config"

const getAllDepartments = async (headers) => {
  try {
    const { data } = await axiosInstance({
      url: "/departments",
      headers,
    })
    return Promise.resolve(data)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

export { getAllDepartments }
