import axiosInstance from "../../axios.config"

const getAllEmployees = async ({ headers }) => {
  try {
    const { data } = await axiosInstance.get("/employees", { headers })
    return Promise.resolve(data)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const updateEmployee = async (id, userData, headers) => {
  try {
    const { data } = await axiosInstance({
      method: "PATCH",
      url: `/employees/${id}`,
      data: userData,
      headers,
    })
    return Promise.resolve(data)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

export { getAllEmployees, updateEmployee }
