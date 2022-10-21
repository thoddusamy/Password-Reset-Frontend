import { Box, Button, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()

    const [userName, setUserName] = useState('')

    useEffect(() => {
        let checkToken = localStorage.getItem('resetpass-task-authToken')
        if (!checkToken) {
            navigate('/')
        }
        let Name = localStorage.getItem('resetpass-task-username')
        setUserName(Name)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('resetpass-task-authToken')
        localStorage.removeItem('resetpass-task-username')
        navigate('/')
    }

    return (
        <Box
            display={'flex'}
            flexDir='column'
            alignItems='center'
            justifyContent={'center'}
            gap={'50px'}
            bg='white'
            px={10}
            h={{ base: '55vh', md: '300px' }}
            w={{ base: '90vw', md: 'auto' }}
        >
            <Box
                display={'flex'}
                alignItems='center'
                justifyContent={'center'}
                flexDir='column'
                gap={5}
            >
                <Text fontSize={'4xl'}>Hello, {userName}</Text>
                <Text fontSize={'3xl'}>Welcome back</Text>
                <Button type='button'
                    bg='orange'
                    _hover={{ bg: 'orange.200' }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    )
}

export default Dashboard
