import EasyStore from './store'

export default function EasyStoreDecorator(Store, state) {
  const store = new Store()
  return new EasyStore(store, state)
}

EasyStoreDecorator.initialState = state => Store =>
  EasyStoreDecorator(Store, state)
