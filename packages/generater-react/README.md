# @props-break/generater-react

## Usage

```javascript
import { generate } from "@props-break/generater-react"

const result = generate({
  componentName: "Form",
  propsTypeName: "FormProps",
  propsFields: ["name", "age"],
})
// result is:
// const Form: React.FC<FormProps> = ({ name, age }) => {
//     return
// }
```
