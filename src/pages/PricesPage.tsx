import logo from '../icons/apple-icon.svg'
import { getProducts, getPrices } from '../lib/airtable'
import { Header } from '../components/Header'
import { createResource, createSignal, ErrorBoundary, For, Show, Suspense } from 'solid-js'
import type { Setter, Accessor } from 'solid-js'
import clsx from 'clsx'
import { Skeleton } from '@hope-ui/solid'

interface PricesTableProps {
  filter: Accessor<string>
}

function PricesTable({ filter }: PricesTableProps) {
  const [prices] = createResource(getPrices)
  const [products] = createResource(getProducts)

  const loadingView = (
    <For each={Array(9)}>
      {(el, index) => (
        <div class={clsx('hover:bg-yellow-100 border-t p-1', !(index() % 2) && 'bg-yellow-50')}>
          <Skeleton height={24} rounded='$lg' />
        </div>
      )}
    </For>
  )

  const fallbackView = (err, reset: () => void) => (
    <div class='w-full grid place-items-center'>
      <p>Something went wrong:</p>
      <pre>{String(err)}</pre>
      <button onClick={reset} class='border rounded bg-yellow-50 hover:bg-yellow-100 px-2'>
        Try again
      </button>
    </div>
  )

  return (
    <ErrorBoundary fallback={fallbackView}>
      <div class='m-2 border w-full rounded-2xl shadow-md overflow-hidden'>
        <div class='grid grid-cols-2 p-1'>
          <p class='text-center border-r'>Название</p>
          <p class='text-center'>Цена, ₽</p>
        </div>
        <Suspense fallback={loadingView}>
          <For
            each={products()}
            fallback={
              <div class='w-full grid place-items-center'>
                <img src={logo} class='w-10 h-10 animate-spin' alt='logo' />
              </div>
            }
          >
            {(product, index) => (
              <Show when={product?.fields?.Name?.toLocaleLowerCase().includes(filter())}>
                <div
                  class={clsx(
                    'grid grid-cols-2 hover:bg-yellow-100 border-t p-1',
                    !(index() % 2) && 'bg-yellow-50',
                  )}
                >
                  <p class='border-r px-2'>{product.fields.Name}</p>
                  <p class='px-2'>
                    {
                      prices()?.find(price => price.id === product.fields.PricesRef?.[0])?.fields
                        .Price
                    }
                  </p>
                </div>
              </Show>
            )}
          </For>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

function SearchBar({ setFilter }: { setFilter: Setter<string> }) {
  return (
    <div class='w-full flex border rounded-2xl px-3 py-1 m-1 shadow-md'>
      <i class='ri-search-line text-xl mr-2' />
      <input
        placeholder='Поиск продуктов'
        class='flex-1 focus:outline-0 text-xl'
        onInput={e => setFilter(e.currentTarget.value.toLowerCase())}
      />
    </div>
  )
}

export function PricesPage() {
  const [filter, setFilter] = createSignal('')

  return (
    <div class='grid grid-rows-layout place-items-center'>
      <Header />
      {/* content */}
      <div class='max-w-xl grid grid-flow-row place-items-center py-2'>
        <SearchBar setFilter={setFilter} />
        <PricesTable filter={filter} />
      </div>
      <footer>
        <p class='text-center text-gray-500 text-xs'>
          &copy; {new Date().getFullYear()} Все права защищены, наверное
        </p>
      </footer>
    </div>
  )
}
