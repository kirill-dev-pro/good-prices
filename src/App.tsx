import { PricesPage } from './pages/PricesPage'
import { FirebaseProvider } from './lib/solid-firebase'
import { Component } from 'solid-js'
import { HopeProvider } from '@hope-ui/solid'

const firebaseConfig = {
  apiKey: 'AIzaSyBFYTMWlrDsp78CYiAiWnjbQ2DxAK83mhw',
  authDomain: 'good-price-6bded.firebaseapp.com',
  projectId: 'good-price-6bded',
  storageBucket: 'good-price-6bded.appspot.com',
  messagingSenderId: '74232511006',
  appId: '1:74232511006:web:4c1f630296903980190c0f',
}

const App: Component = () => {
  return (
    <FirebaseProvider config={firebaseConfig}>
      <HopeProvider>
        <PricesPage />
      </HopeProvider>
    </FirebaseProvider>
  )
}

export default App
