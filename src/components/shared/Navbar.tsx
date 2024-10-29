import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import { colors } from '@styles/colorPalette'
import useUser from '@hooks/auth/useUser'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      //TODO 클릭시 user 정보 페이지로 이동 기능 추가
      return (
        <Flex align="center">
          <Link to="/my">
            <img
              src={
                // user.photoUrl ??
                'https://cdn1.iconfinder.com/data/icons/cute-emoji-smiles-with-gradient/83/Emoji_Emoticon_Happy_Laugh_Smile-512.png'
              }
              alt="유저의 이미지"
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
          <Spacing size={4} direction="horizontal" />
          <Link to="/settings">
            <img
              src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-5/24/setting-512.png"
              alt=""
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
        </Flex>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>회원가입/로그인</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainer}>
      <Link to="/">Love Trip</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainer = css`
  padding: 10px 24px;
  top: 0;
  position: sticky;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid;
`

export default Navbar
