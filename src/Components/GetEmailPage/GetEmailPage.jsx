import React, { useEffect, useState } from 'react'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../../Config/api'

const GetEmailPage = () => {

    const navigate = useNavigate()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let checkToken = localStorage.getItem("resetpass-task-authToken")
        if (checkToken) {
            navigate('/dashboard')
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            email: ""
        },

        validate: (values) => {
            const errors = {}

            if (values.email.trim().length === 0) {
                errors.email = "Email is required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
                errors.email = "Invalid email address"
            }

            return errors
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true)
                const { data } = await axios.post(`${api.url}/sendmail`, values)
                toast({
                    title: data.message,
                    status: 'success',
                    position: "top-right",
                    duration: 3500,
                    isClosable: true,
                })
                resetForm({ values: '' })
                setIsLoading(false)
            } catch (error) {
                console.log(error);
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
            gap={"20px"}
            bg="white"
            px={10}
            h={{ base: "50vh", md: "280px" }}
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
                        <FormLabel>Email address</FormLabel>
                        <Input variant='flushed' type='email' name="email" placeholder='Enter your email address' onChange={formik.handleChange} value={formik.values.email} />
                        {formik.errors.email ? <FormHelperText color={"red"}>{formik.errors.email}</FormHelperText> : <></>}
                    </Box>
                    <Button type='submit' bg="orange" _hover={{ bg: "orange.200" }} mt={1} isLoading={isLoading}>Get Reset Link</Button>
                </FormControl>
            </form>
        </Box>
    )
}

export default GetEmailPage