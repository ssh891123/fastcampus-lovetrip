import { useCallback } from 'react'

interface shareProps {
  title: string
  description: string
  imageUrl: string
  buttonLabel: string
}

function useShare() {
  const handleShare = useCallback(
    ({ title, description, imageUrl, buttonLabel }: shareProps) => {
      //function
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: buttonLabel,
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      })
    },
    [],
  )

  return handleShare
}

export default useShare