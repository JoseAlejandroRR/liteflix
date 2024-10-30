import LoginPage from "../../ui/pages/LoginPage"

export { Page }

function Page() {
  return (
    <>
      <LoginPage/>
    </>
  )
}

export const documentProps = {
    title: 'Login',
    description: 'Accede a tu cuenta para empezar a disfrutar de Liteflix',
  }