import EasyFluxStore from './store'

export default function EasyFlux(Store, state) {
  const store = new Store()
  return new EasyFluxStore(store, state)
}

EasyFlux.initialState = state => Store => EasyFlux(Store, state)
