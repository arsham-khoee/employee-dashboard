import { Button, Card, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import React, { useState } from "react"
import { useAuth } from '../context/AuthContext'
import papaparse from 'papaparse'
import { createEmployee } from "../services/employee"


function AddEmployee() {
    const [employees, setEmployees] = useState([])
    const { headers } = useAuth()

    const handleOnChange = (event) => {
        console.log(event.target.files[0])
        console.log(event.files)
        const reader = new FileReader();
        papaparse.parse(event.target.files[0], {
            header: true,
            newline: '\n',
            complete: getCotentFile
        })
    }

    const getCotentFile = (res) => {
        const { data, err } = res
        console.log('data')
        console.log(data)
        console.log(err)
        setEmployees(data)
    }

    const selectFile = () => {
        const input = document.getElementById('file')
        input.click()
    }
    const saveEmployee = async() => {
        try {
            await createEmployee(employees, headers)
            setEmployees([])
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <>
        <Button onClick={() => selectFile()}>
            Upload file
            <input id='file' type="file" hidden onChange={(e) => handleOnChange(e)} />
        </Button>
        {employees.length ? <>
            <Button  style={{margin: '0 5px'}} onClick={() => saveEmployee()}>
                Save
            </Button>
            <Button  color='error' style={{margin: '0 5px'}} onClick={() => setEmployees([])}>
                Cancel
            </Button>
        </>: ''}
        
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Job Title</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {employees.map(item => (
                <>
                    <TableRow key={item.email}>
                        <TableCell >{item.firstName}</TableCell>
                        <TableCell >{item.lastName}</TableCell>
                        <TableCell >{item.email}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>{item.jobTitle}</TableCell>
                    </TableRow>
                </>
                ))}
            </TableBody>
        </Table>
        </>
    )
}

export default AddEmployee