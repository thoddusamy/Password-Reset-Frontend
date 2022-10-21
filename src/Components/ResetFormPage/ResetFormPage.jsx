import React, { useEffect, useState } from 'react'
import { Box, Button, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { api } from '../../Config/api'
import { useToast } from '@chakra-ui/react'

const ResetFormPage = () => {

    const navigate = useNavigate()
    const { string, email } = useParams()
    const toast = useToast()

    useEffect(async () => {
        try {
            let checkUrl = await axios.post(`${api.url}/checkString`, { string, email })
            toast({
                title: checkUrl.data.message,
                status: 'success',
                position: "top-right",
                duration: 3500,
                isClosable: true,
            })
        } catch (error) {
            console.log(error);
            if (!error.response.data.isVerified) {
                toast({
                    title: error.response.data.message,
                    status: 'error',
                    position: "top-right",
                    duration: 2500,
                    isClosable: true,
                })
                setTimeout(() => {
                    navigate('/step1')
                }, 1500)
            }
        }
    }, [])


    useEffect(() => {
        let checkToken = localStorage.getItem("resetpass-task-authToken")
        if (checkToken) {
            navigate('/dashboard')
        }
    }, [])

    const [showHidePass, setShowHidePass] = useState(false)
    const [showHideConPass, setShowHideConPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email,
            password: "",
            confirm_password: ""
        },

        validate: (values) => {
            const errors = {}

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
                let updatePassword = await axios.post(`${api.url}/resetpassword`, values)
                toast({
                    title: updatePassword.data.message,
                    status: 'success',
                    position: "top-right",
                    duration: 2500,
                    isClosable: true,
                })
                resetForm({ values: '' })
                setIsLoading(false)
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            } catch (error) {
                console.log(error);
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
            h={{ base: "65vh", md: "380px" }}
            w={{ base: "90vw", md: "500px" }}
        >
            <Box>
                <Text fontSize={{ base: '4xl', md: '5xl' }}>Reset Password</Text>
            </Box>
            <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
                <FormControl display={"flex"}
                    flexDir={"column"} gap={3}
                    pb={9}
                >
                    <Box>
                        <FormLabel>New Password</FormLabel>
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
                        <FormLabel>Confirm New Password</FormLabel>
                        <InputGroup>
                            <Input variant='flushed' type={showHideConPass ? 'text' : 'password'} name='confirm_password' placeholder='Enter your confirm password'
                                onChange={formik.handleChange} value={formik.values.confirm_password} />
                            <InputRightElement cursor={"pointer"} onClick={() => setShowHideConPass(!showHideConPass)}>
                                {showHideConPass ? <BsFillEyeFill fontSize={"20px"} /> : <BsFillEyeSlashFill fontSize={"20px"} />}
                            </InputRightElement>
                        </InputGroup>
                        {formik.errors.confirm_password ? <FormHelperText color={"red"}>{formik.errors.confirm_password}</FormHelperText> : <></>}
                    </Box>
                    <Button type='submit' bg="orange" _hover={{ bg: "orange.200" }} mt={2} isLoading={isLoading}>Reset Password</Button>
                </FormControl>
            </form>
        </Box>
    )
}

export default ResetFormPage