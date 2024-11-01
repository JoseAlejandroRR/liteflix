import { useEffect } from 'react'
import { useAuth } from '../../data/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const emailDemo = import.meta.env.VITE_ACCOUNT_DEMO_EMAIL
const passwordDemo = import.meta.env.VITE_ACCOUNT_DEMO_PASSWORD

const AccessDemoPage = () => {

  const { auth, getAuthToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.token) return navigate('/')

    if (emailDemo && passwordDemo) {
      getAuthToken(
        String(emailDemo),
        String(passwordDemo)
      )
    }

  }, [auth])

  return (
    <>
      <Spin style={{ position: 'absolute',  top: '48%', left: '48%' }} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </>
  )
}

export default AccessDemoPage
