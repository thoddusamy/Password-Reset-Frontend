import React, { useEffect, useState } from 'react'
import { Box, Button, Input, InputGroup, InputRightElement, Text, Toast } from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { api } from '../../Config/api'
import axios from "axios"
import { useToast } from '@chakra-ui/react'

const Login = () => {

    const toast = useToast()
    const navigate = useNavigate()

    const [showHidePass, setShowHidePass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let checkToken = localStorage.getItem("resetpass-task-authToken")
        if (checkToken) {
            navigate('/dashboard')
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

        validate: (values) => {
            const errors = {}

            if (values.email.trim().length === 0) {
                errors.email = "Email is required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
                errors.email = "Invalid email address"
            }

            if (values.password.trim().length === 0) {
                errors.password = "Password is required"
            }

            return errors
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true)
                let { data } = await axios.post(`${api.url}/login`, values)
                localStorage.setItem("resetpass-task-authToken", data.token)
                localStorage.setItem("resetpass-task-username", data.name)
                toast({
                    title: data.message,
                    status: 'success',
                    position: "top-right",
                    duration: 3500,
                    isClosable: true,
                })
                resetForm({ values: "" })
                navigate('/dashboard')
                setIsLoading(false)
            } catch (error) {
                console.log(error.response.data.message);
                toast({
                    title: error.response.data.message,
                    status: 'error',
                    position: "top-right",
                    duration: 3500,
                    isClosable: true,
                })
                setIsLoading(false)
            }
        }
    })

    return (
        <Box
            display={'flex'}
            flexDir="column"
            alignItems='center'
            justifyContent={'center'}
            gap={"50px"}
            bg="white"
            px={10}
            h={{ base: "85vh", md: "500px" }}
            w={{ base: "90vw", md: "400px" }}
        >
            <Box>
                <Text fontSize={'5xl'}>Login</Text>
            </Box>
            <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
                <FormControl display={"flex"}
                    flexDir={"column"} gap={5}
                    pb={9}
                >
                    <Box>
                        <FormLabel>Email address</FormLabel>
                        <Input variant='flushed' type='email' name="email" placeholder='Enter your email' onChange={formik.handleChange} value={formik.values.email} />
                        {formik.errors.email ? <FormHelperText color={"red"}>{formik.errors.email}</FormHelperText> : <></>}
                    </Box>
                    <Box>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input variant='flushed' type={showHidePass ? 'text' : 'password'} name='password' placeholder='Enter your password' onChange={formik.handleChange} value={formik.values.password} />
                            <InputRightElement cursor={"pointer"} onClick={() => setShowHidePass(!showHidePass)}>
                                {showHidePass ? <BsFillEyeFill fontSize={"20px"} /> : <BsFillEyeSlashFill fontSize={"20px"} />}
                            </InputRightElement>
                        </InputGroup>
                        {formik.errors.password ? <FormHelperText color={"red"}>{formik.errors.password}</FormHelperText> : <></>}
                        <Text textAlign={"right"} pt={2}><Link style={{ textDecoration: "underline" }} to="/step1">forgot password</Link></Text>
                    </Box>
                    <Button type='submit' bg="orange" _hover={{ bg: "orange.200" }} isLoading={isLoading}>Login</Button>
                    <Text>If you have not account? <Link style={{ color: "blue" }} to="/register">register</Link></Text>
                </FormControl>
            </form>
        </Box>
    )
}

export default Login
