import { GoogleLogin } from './GoogleLogin'
import { UserView } from './UserView'
import { useAuth } from '../lib/solid-firebase'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@hope-ui/solid'
import { getAuth, signOut, User } from 'firebase/auth'
import { Match, Switch } from 'solid-js'

interface Props {
  isOpen?: () => boolean
  onClose: () => void
}

export const DrawerMenu = ({ isOpen, onClose }: Props) => {
  const auth = getAuth()
  const state = useAuth(auth)

  return (
    <Drawer opened={isOpen()} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Switch>
            <Match when={!state.data}>Войдите в свой аккаунт</Match>
            <Match when={state.data}>Вы вошли в аккаунт</Match>
          </Switch>
        </DrawerHeader>

        <DrawerBody>
          <Switch>
            <Match when={state.loading}>
              <p>Loading...</p>
            </Match>
            <Match when={state.error}>
              <p>Error: {JSON.stringify(state.error)}</p>
            </Match>
            <Match when={!state.data}>
              <GoogleLogin />
            </Match>
            <Match when={state.data}>
              {/* <User data={state.data} /> */}
              {/* <pre>{JSON.stringify(state)}</pre>
              <pre>{JSON.stringify(state.data)}</pre> */}
              <UserView user={state.data as User} />
            </Match>
          </Switch>
        </DrawerBody>

        <DrawerFooter>
          <Switch>
            <Match when={state.data}>
              <Button variant='outline' mr='$3' onClick={() => signOut(auth)}>
                Выйти
              </Button>
            </Match>
          </Switch>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
