# @props-break/core

## Usage

```
import { parse } from '@props-break/core'

const code = `
    type FormProps = {
        name: string
        friends: string[],
        assets: {
            money: number,
            house: number
        }
    }
`

const {
    name, // FormProps
    fields, // ['name', 'friends', 'assets']
} = parse(code)
```
