import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

export const GoogleLogin = () => {
  const auth = getAuth()
  const signIn = () => signInWithPopup(auth, new GoogleAuthProvider())

  return (
    <button onClick={signIn} class='p-2 border rounded bg-neutral-50 hover:bg-neutral-100'>
      Войти с Google
    </button>
  )
}
