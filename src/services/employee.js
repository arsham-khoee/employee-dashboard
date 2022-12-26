import axiosInstance from "../../axios.config"

const getAllEmployees = async (headers) => {
  try {
    const { data } = await axiosInstance({
      url: "/employees",
      headers
    })
    return Promise.resolve(data)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const getHistoryById = async (id, headers) => {
  try {
    const { data } = await axiosInstance({
      url: `/employees/${id}/changes`,
      headers
    })
    return Promise.resolve(data)
  } catch(err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const updateEmployee = async (id, {firstName, lastName, role, address}, headers) => {
  try {
    const { data } = await axiosInstance({
      method: "PATCH",
      url: `/employees/${id}`,
      data: {firstName, lastName, role, address},
      headers,
    })
    return Promise.resolve(data)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

const deleteEmployee = async(id, headers) => {
  try {
    const { data } = await axiosInstance({
      method: 'DELETE',
      url: `/employees/${id}`,
      headers,
    })
    return Promise.resolve(data)
  } catch(e) {
    console.error(e)
    return Promise.reject(e)
  }
}

const createEmployee = async(data, headers) => {
  try {
    await axiosInstance({
      method: 'POST',
      url: '/employees',
      data,
      headers
    })
  } catch(err) {
    console.log(err)
  }
}

export { getAllEmployees, getHistoryById, updateEmployee, deleteEmployee, createEmployee }
