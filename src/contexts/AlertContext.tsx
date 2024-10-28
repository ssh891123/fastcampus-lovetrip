import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import Alert from '@shared/Alert'

// ComponentProps: component의 prop을 가져오기 위함
type AlertProps = ComponentProps<typeof Alert>
// AlertProps에서 open이라는 Prop 제거
type AlertOptions = Omit<AlertProps, 'open'>

interface AlertContextValue {
  open: (options: AlertOptions) => void
}

const Context = createContext<AlertContextValue | undefined>(undefined)

const defaultValue: AlertProps = {
  open: false,
  title: null,
  description: null,
  onButtonClick: () => {},
}

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [alertState, setAlertState] = useState(defaultValue)

  const $portal_root = document.getElementById('root_portal')

  const close = useCallback(() => {
    setAlertState(defaultValue)
  }, [])

  const open = useCallback(({ onButtonClick, ...options }: AlertOptions) => {
    setAlertState({
      ...options,
      // alert이 닫히면서 실행됨: opetion으로 전달받은 onButtonClick 함수 실행, close 클로저 함수도 실행
      onButtonClick: () => {
        close()
        onButtonClick()
      },
      open: true,
    })
  }, [])

  const values = useMemo(() => ({ open }), [open])

  return (
    // 자식요소에서 value로 바로 접근할 수 있음
    <Context.Provider value={values}>
      {children}

      {$portal_root != null
        ? createPortal(<Alert {...alertState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export function useAlertContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('AlertContext 내부에서 사용해주세요')
  }
  return values
}
