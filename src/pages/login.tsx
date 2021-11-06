import React from 'react'

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'

import Center from '@/components/Center/Center'

const StyledCard = styled(Card)({
  maxWidth: 280,
  padding: 10,
})

const Login = () => {
  const router = useRouter()
  const returnTo = router.query.returnTo || '/'

  return (
    <Center>
      <StyledCard color='secondary'>
        <CardActionArea>
          <CardMedia
            alt='Sreeram Padmanabhan'
            component='img'
            height='195'
            image='/img/sections/about.svg'
            title='Sreeram Padmanabhan'
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography
              color='textSecondary'
              component='p'
              style={{ marginBottom: 10 }}
              variant='body1'>
              Please login to access this content.
            </Typography>
            <Button
              color='secondary'
              href={`/api/auth/login?returnTo=${returnTo}`}
              variant='contained'>
              Login
            </Button>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Center>
  )
}

export default Login
