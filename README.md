<div align="center">
  <img width="200px" src="https://www.solidjs.com/assets/logo.123b04bc.svg" />
  <h1 >awesome-solid-hooks</h1>
  <div style="text-align: center">Collection of Solid-js Hook</div>
</div>

---

inspired by [react-use](https://github.com/streamich/react-use), [vueuse](https://github.com/vueuse/vueuse).


## Installed

```
npm i awesome-solid-hooks
// or 
yarn add awesome-solid-hooks
```

## Example

```tsx
import { useLocalStorage } from 'awesome-solid-hooks'


function App() {
  const [storageValue, setStorageValue, remove] = useLocalStorage('sample', 'test')
}
```


## Features

- useLocalStorage
- useEvent
- useShare
- useCookie
- useMouse

## TODO

- [ ] useMouse
