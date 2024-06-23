import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { AlertError, AlertSuccess } from '../common/ToastrCommon'
import AccountServices from '../services/AccountService'
import StockService from '../services/StockServices'
import { useNavigate } from 'react-router-dom'

interface AppContextProps {
  pathUrl: string
  setPathUrl: (pathUrl: string) => void
  isLogin: string
  majorUser: string
  isEdit: () => boolean
  isDelete: () => boolean
  editPermission: string
  deletePermission: string
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  deleteStock: (id: string, major: string) => () => void
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: '',
  setPathUrl: () => {},
  isLogin: '',
  majorUser: '',
  isEdit: () => false,
  isDelete: () => false,
  editPermission: '',
  deletePermission: '',
  isLoading: false,
  setIsLoading: () => {},
  deleteStock: () => () => {},
})

interface ChildrenProps {
  children: ReactNode
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname)
  const isLogin = sessionStorage.getItem('account') ?? ''
  const majorUser = sessionStorage.getItem('major') ?? ''
  const editPermission = sessionStorage.getItem('can_edit') ?? ''
  const deletePermission = sessionStorage.getItem('can_delete') ?? ''
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isEdit = () => editPermission === 'TRUE'
  const isDelete = () => deletePermission === 'TRUE'

  const deleteStock = (id: string, major: string) => () => {
    setIsLoading(true)
    StockService.DeleteStockById(id, major)
      .then((res) => {
        AlertSuccess(res.data.message)
        StockService.GetStock(majorUser)
          .then((res) => {
            window.location.reload()
          })
          .catch((err) => {
            AlertError(err.response.data.message)
            setIsLoading(false)
          })
      })
      .catch((err) => {
        AlertError(err.response.data.message)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    AccountServices.getFindUser(isLogin)
      .then((res) => {
        sessionStorage.setItem('major', res.data.MAJOR)
        sessionStorage.setItem('can_edit', res.data.CAN_EDIT ? 'TRUE' : 'FALSE')
        sessionStorage.setItem(
          'can_delete',
          res.data.CAN_DELETE ? 'TRUE' : 'FALSE'
        )
        setIsLoading(false)
      })
      .catch((err) => {
        AlertError(err.response.data.message)
        setIsLoading(false)
      })
  }, [isLogin])

  useEffect(() => {
    setIsLoading(true)
    AccountServices.getFindUser(isLogin)
      .then((res) => {
        sessionStorage.setItem('major', res.data.MAJOR)
        sessionStorage.setItem('can_edit', res.data.CAN_EDIT ? 'TRUE' : 'FALSE')
        sessionStorage.setItem(
          'can_delete',
          res.data.CAN_DELETE ? 'TRUE' : 'FALSE'
        )
        setIsLoading(false)
      })
      .catch((err) => {
        AlertError(err.response.data.message)
        setIsLoading(false)
      })
  }, [isLogin])

  const values = useMemo(
    () => ({
      pathUrl,
      setPathUrl,
      isLogin,
      majorUser,
      isEdit,
      isDelete,
      editPermission,
      deletePermission,
      isLoading,
      setIsLoading,
      deleteStock,
    }),
    [
      pathUrl,
      setPathUrl,
      isLogin,
      majorUser,
      isEdit,
      isDelete,
      editPermission,
      deletePermission,
      isLoading,
      setIsLoading,
      deleteStock,
    ]
  )

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}
