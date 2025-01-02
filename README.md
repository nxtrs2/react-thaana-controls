# react-thaana-controls

A React library for easily handling Thaana input in forms, currently supporting `<input>` and `<textarea>` fields.

## Features

- Based on [thaana-keyboard](https://github.com/aharen/thaana-keyboard) by [aharen](https://github.com/aharen) which provides...
- ...mapping of Latin characters to Thaana characters.
- This implementation is (hopefully) lightweight and easy to integrate into any React project.

## Installation

Install the library using npm or yarn:

```bash
npm install react-thaana-controls
# or
yarn add react-thaana-controls
```

## Usage (currently available components)

### 1. ThaanaInput Component

The `ThaanaInput` component provides Thaana support for single-line text inputs.

```tsx
import React, { useState } from 'react';
import { ThaanaInput } from 'react-thaana-controls';

const App = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <h1>Thaana Input Example</h1>
      <ThaanaInput
        value={value}
        onChange={setValue}
        placeholder="ތާނަ އިމްޕުޓް"
      />
      <p>Current Value: {value}</p>
    </div>
  );
};

export default App;
```

---

### 2. ThaanaTextarea Component

The `ThaanaTextarea` component provides Thaana support for multi-line text inputs.

```tsx
import React, { useState } from 'react';
import { ThaanaTextarea } from 'react-thaana-controls';

const App = () => {
  const [text, setText] = useState('');

  return (
    <div>
      <h1>Thaana Textarea Example</h1>
      <ThaanaTextarea
        value={text}
        onChange={setText}
        placeholder="ތާނަ ޓެކްސްޓްއޭރިޔާ"
      />
      <p>Current Value:</p>
      <pre>{text}</pre>
    </div>
  );
};

export default App;
```

---

## Props

### Common Props for `ThaanaInput` and `ThaanaTextarea`

| Prop          | Type                      | Required | Description                              |
| ------------- | ------------------------- | -------- | ---------------------------------------- |
| `value`       | `string`                  | Yes      | The current value of the input/textarea. |
| `onChange`    | `(value: string) => void` | Yes      | Callback to handle value changes.        |
| `placeholder` | `string`                  | No       | Placeholder text for the input/textarea. |
| `style`       | `React.CSSProperties`     | No       | Inline styles for the input/textarea.    |
| `disabled`    | `boolean`                 | No       | Disables the input/textarea when `true`. |

---

## Development

### Scripts

- `npm start`: Starts the development server with live reload.
- `npm run build`: Builds the library for production.
- `npm run test`: Runs the test suite.

### Testing

To test the library, run:

```bash
npm test
```

---

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests on the [GitHub repository](https://github.com/nxtrs2/react-thaana-controls).

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
