import React, { useEffect, useState } from 'react'
import { Box, Button, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { api } from '../../Config/api'
import axios from "axios"
import { useToast } from '@chakra-ui/react'

const Register = () => {

    const navigate = useNavigate()

    useEffect(() => {
        let checkToken = localStorage.getItem("resetpass-task-authToken")
        if (checkToken) {
            navigate('/dashboard')
        }
    }, [])

    const toast = useToast()

    const [showHidePass, setShowHidePass] = useState(false)
    const [showHideConPass, setShowHideConPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        },

        validate: (values) => {
            const errors = {}

            if (values.name.trim().length === 0) {
                errors.name = "Name is required"
            }

            if (values.email.trim().length === 0) {
                errors.email = "Email is required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
                errors.email = "Invalid email address"
            }

            if (values.password.trim().length === 0) {
                errors.password = "Password is required"
            } else if (values.password.trim().length < 8) {
                errors.password = "password length should be minimum 8charaters"
            }

            if (values.confirm_password.trim().length === 0) {
                errors.confirm_password = "Confrim password is required"
            }

            if (values.password.trim() !== values.confirm_password.trim()) {
                errors.password = "password & confirm password not same"
                errors.confirm_password = "password & confirm password not same"
            }

            return errors
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true)
                const { data } = await axios.post(`${api.url}/register`, values)
                resetForm({ values: '' })
                toast({
                    title: data.message,
                    status: 'success',
                    position: "top-right",
                    duration: 3500,
                    isClosable: true,
                })
                navigate('/')
                setIsLoading(false)
            } catch (error) {
                console.log(error.message);
            }

        }
    })


    return (
        <Box
            display={'flex'}
            flexDir="column"
            alignItems='center'
            justifyContent={'center'}
            gap={"20px"}
            bg="white"
            px={10}
            h={{ base: "95vh", md: "580px" }}
            w={{ base: "90vw", md: "400px" }}
        >
            <Box>
                <Text fontSize={'5xl'}>Register</Text>
            </Box>
            <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
                <FormControl display={"flex"}
                    flexDir={"column"} gap={3}
                    pb={9}
                >
                    <Box>
                        <FormLabel>Name</FormLabel>
                        <Input variant='flushed' type='text' name="name" placeholder='Enter your name' onChange={formik.handleChange} value={formik.values.name} />
                        {formik.errors.name ? <FormHelperText color={"red"}>{formik.errors.name}</FormHelperText> : <></>}
                    </Box>
                    <Box>
                        <FormLabel>Email address</FormLabel>
                        <Input variant='flushed' type='email' name="email" placeholder='Enter your email' onChange={formik.handleChange} value={formik.values.email} />
                        {formik.errors.email ? <FormHelperText color={"red"}>{formik.errors.email}</FormHelperText> : <></>}
                    </Box>
                    <Box>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input variant='flushed' type={showHidePass ? 'text' : 'password'} name='password' placeholder='Enter your password'
                                onChange={formik.handleChange} value={formik.values.password} />
                            <InputRightElement cursor={"pointer"} onClick={() => setShowHidePass(!showHidePass)}>
                                {showHidePass ? <BsFillEyeFill fontSize={"20px"} /> : <BsFillEyeSlashFill fontSize={"20px"} />}
                            </InputRightElement>
                        </InputGroup>
                        {formik.errors.password ? <FormHelperText color={"red"}>{formik.errors.password}</FormHelperText> : <></>}
                    </Box>
                    <Box>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                            <Input variant='flushed' type={showHideConPass ? 'text' : 'password'} name='confirm_password' placeholder='Enter your confirm password'
                                onChange={formik.handleChange} value={formik.values.confirm_password} />
                            <InputRightElement cursor={"pointer"} onClick={() => setShowHideConPass(!showHideConPass)}>
                                {showHideConPass ? <BsFillEyeFill fontSize={"20px"} /> : <BsFillEyeSlashFill fontSize={"20px"} />}
                            </InputRightElement>
                        </InputGroup>
                        {formik.errors.confirm_password ? <FormHelperText color={"red"}>{formik.errors.confirm_password}</FormHelperText> : <></>}
                    </Box>
                    <Button type='submit' bg="orange" _hover={{ bg: "orange.200" }} mt={1} isLoading={isLoading}>Register</Button>
                    <Text>If you have already account? <Link style={{ color: "blue" }} to="/">login</Link></Text>
                </FormControl>
            </form>
        </Box>
    )
}

export default Register