# Parameters

Implement the built-in Parameters generic without using it.

For example:

```js
const foo = (arg1: string, arg2: number): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```
