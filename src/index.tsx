import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import App from './App'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, //재시도 횟수를 0으로 설정. 바로 실패하도록
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
