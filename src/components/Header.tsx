import { DrawerMenu } from './DrawerMenu'
import logo from '../icons/apple-icon.svg'
import { createDisclosure } from '@hope-ui/solid'

export const Header = () => {
  const { isOpen, onOpen, onClose } = createDisclosure()

  return (
    <>
      <header class='bg-slate-800 grid grid-cols-layout grid-flow-col place-items-center p-2 w-full'>
        <div />
        <div class='flex items-center'>
          <div class='relative w-10 h-10'>
            <img src={logo} class='w-10 h-10 absolute' alt='logo' />
          </div>
          <h2 class='ml-4 text-white text-xl'>Хорошие цены</h2>
        </div>
        <button class='hover:bg-slate-700 w-8 h-8 rounded text-white' onClick={onOpen}>
          <i class='ri-menu-line'></i>
        </button>
      </header>
      <DrawerMenu isOpen={isOpen} onClose={onClose} />
    </>
  )
}
