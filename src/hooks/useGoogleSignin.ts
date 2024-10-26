import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth, store } from '@remote/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { FirebaseError } from 'firebase/app'

function useGoogleSignin() {
  const navigate = useNavigate()

  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()

    try {
      const { user } = await signInWithPopup(auth, provider)

      const 새로운유저 = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
      }

      await setDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
        새로운유저,
      )

      navigate('/')
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          return
        }
      }

      throw new Error('fail to signin')
    }
  }, [navigate])

  const signout = useCallback(() => {
    signOut(auth)
  }, [])

  return { signin, signout }
}

export default useGoogleSignin
