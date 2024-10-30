import { createContext, useContext, useState } from 'react'

type ConnectHomeContect = {
  isLoading: boolean,
  notifyStatus: (status: boolean) => void
}

const ConnectHomeContext = createContext<ConnectHomeContect>({
  isLoading: false,
  notifyStatus: () => {}
})

export const useHomePage = () => useContext(ConnectHomeContext)


const ConnectHomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  const notifyStatus = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <ConnectHomeContext.Provider value={{
      isLoading, notifyStatus,
    }}>
      { children }
    </ConnectHomeContext.Provider>
  )
}

export default ConnectHomeProvider
