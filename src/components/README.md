## Components

Here all the project components are indexed and given an `alias` to facilitate their location and usage.

```typescript
export * from './Annotation'
export * from './Button'
export * from './Canvas'
export * from './Card'
// ...
```

You can import directly from `@components`

```typescript
import { Button } from '@components'

const YourComponent = () => {
	// Use components as needed
}
```
