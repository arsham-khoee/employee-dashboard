import { Button } from "@mui/material"
import React, { useState } from "react"
import { useAuth } from '../context/AuthContext'

function AddEmployee() {
    const [employees, setEmployees] = useState([])
    const { header } = useAuth()

    const handleOnChange = () => {
        const fileReader = new FileReader();
        console.log('fuck file')
    }

    const selectFile = () => {
        const input = document.getElementById('file')
        input.click()
    }

    return (
        <>
        <Button onClick={() => selectFile()}>
            Upload file
            <input id='file' type="file" hidden onChange={handleOnChange} />
        </Button>
        <></>
        </>
    )
}

export default AddEmployee