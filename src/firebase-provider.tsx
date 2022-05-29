import { initializeApp } from 'firebase/app'
import { createContext } from 'solid-js'
export const FirebaseContext = createContext()
export const FirebaseProvider = props => {
  const app = initializeApp(props.config)
  return <FirebaseContext.Provider value={app}>{props.children}</FirebaseContext.Provider>
}
