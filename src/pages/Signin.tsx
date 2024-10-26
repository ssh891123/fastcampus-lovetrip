import Flex from '@shared/Flex'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

import useGoogleSignin from '@hooks/useGoogleSignin'

function SigninPage() {
  const { signin } = useGoogleSignin()

  return (
    <Flex direction="column" align="center" style={{ padding: 24 }}>
      <Spacing size={100} />
      <img
        src="https://cdn2.iconfinder.com/data/icons/free-version/128/paper_plane-512.png"
        alt=""
        width={120}
        height={120}
      />
      <Spacing size={60} />
      <Button size="medium" weak={true} onClick={signin}>
        <Flex align="center" justify="center">
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
            alt=""
            width={20}
            height={20}
          />
          <Spacing direction="horizontal" size={4} />
          Google 로그인
        </Flex>
      </Button>
    </Flex>
  )
}

export default SigninPage
