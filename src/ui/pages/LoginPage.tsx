import React, { useEffect } from 'react'
import Logo from '../components/logo/Logo'
import { Button, Form, FormProps, Input, notification } from 'antd'
import { useAuth } from '../../data/hooks/useAuth'

import './LoginPage.scss'

type FieldType = {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const [ form ] = Form.useForm()
  const { auth, error, getAuthToken } = useAuth()

  useEffect(() => {
    if (auth.token) {
      window.location.href = '/'
    }
  }, [auth])

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      getAuthToken(values.email, values.password)
    } catch(err) {
      notification.error({ message: 'Servicios no disponible', placement: 'bottomRight' })
      console.error(err)
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login-page">
      <div className="head">
        <Logo />
        <ul className="links">
          <li><a href="#" aria-label="Registrar">Registrar</a></li>
        </ul>
      </div>
      <div className="form-container">
        <Form
            name="login-form"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <h1>Iniciar sessión</h1>
            <Form.Item<FieldType>
              name="email"
              rules={[
                { required: true, message: 'Ingresa tu email' },
                { type: 'email', message: 'Email inválido'},
              ]}
            >
              <Input type="email" placeholder="name@domain.com" />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: 'Ingresa tu password' }]}
            >
              <Input type="password" placeholder="password" />
            </Form.Item>
            {
              error !== null && (
               <p className="error-text">Datos inválidos</p>
              )
            }
            <Form.Item >
              <Button type="primary" htmlType="submit" aria-label="Iniciar sesión" block>
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
      </div>
    </div>
  )
}

export default LoginPage
