import { ComponentType, ReactNode, Suspense } from 'react'

function withSuspense<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  options: { fallback: ReactNode },
) {
  return (props: Props) => {
    return (
      <Suspense fallback={options.fallback}>
        <WrappedComponent {...(props as any)} />
      </Suspense>
    )
  }
}

export default withSuspense
//withSuspense(<App />, { fallback: <로딩컴포넌트/> })
