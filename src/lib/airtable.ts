const apiKey = 'keyTNoUnyiq5mArEG'

export interface Record<T> {
  id: string
  fields: T
  createdTime: string
}

export interface Product {
  Name: string
  PricesRef: [string]
  Measurment: string
}

export interface Price {
  Price: string
  ProductsRef: [string]
}

interface AirtableData {
  records: [Record<any>]
}

const request = async (path: string): Promise<Response> =>
  await fetch('https://api.airtable.com/v0/appimTjpzrAM3wUC2' + path, {
    headers: {
      Authorization: 'Bearer ' + apiKey,
    },
  })

async function getProducts(): Promise<[Record<Product>]> {
  const res = await request('/Products')
  const data: AirtableData = await res.json()
  return data.records
}

async function getPrices(): Promise<[Record<Price>]> {
  const res = await request('/Prices')
  const data: AirtableData = await res.json()
  return data.records
}

export { getProducts, getPrices }
