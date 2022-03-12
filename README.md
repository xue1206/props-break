# Props Break

> Generate React code depends on the declarations

visit the [website](https://props-break.vercel.app/)

input:

```typescript
type FormProps = {
  name: string
}
```

output:

```typescript
const Form: React.FC<FormProps> = ({ name }) => {
  return
}
```

## @props-break/core

> Parse declarations, [see](./packages/core//README.md)

## @props-break/generater-react

> Generate React code from declarations, [see](./packages/generater-react/README.md)
