import { Avatar } from '@hope-ui/solid'
import { User } from 'firebase/auth'

export const UserView = ({ user }: { user: User }) => {
  return (
    <div class='flex flex-col items-center'>
      <Avatar src={user.photoURL} size='xl' name={user.displayName} />
      <p class='text-xl'>{user.displayName}</p>
      <p>{user.email}</p>
    </div>
  )
}
