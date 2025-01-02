# react-thaana-controls

A React library for easily handling Thaana input in forms, currently supporting `<input>`, `<textarea>`, and form wrapper for grouped inputs.

## Features

- **Based on [thaana-keyboard](https://github.com/aharen/thaana-keyboard)** by [aharen](https://github.com/aharen):
  - Provides mapping of Latin characters to Thaana characters.
  - Supports special characters and ensures accurate Thaana input.
- **Lightweight and easy to integrate** into any React project.
- **Automatic Thaana input handling** for individual fields and entire forms:
  - `<ThaanaInput>`: Seamless single-line Thaana input.
  - `<ThaanaTextarea>`: Multi-line Thaana text input.
  - `<ThaanaFormWrapper>`: Automatically applies Thaana input behavior to all fields in a form.

---

### Updated Features Overview

1. **Individual Controls**:

   - `<ThaanaInput>`: Provides seamless Thaana input for single-line fields.
   - `<ThaanaTextarea>`: Supports Thaana input for multi-line fields.

2. **Form Grouping**:

   - `<ThaanaFormWrapper>`:
     - Automatically applies `dir="rtl"` and character mapping for all child `<input>` and `<textarea>` fields.
     - Simplifies form handling by centralizing `onChange` for grouped inputs.
     - Dynamically supports fields added or removed from the DOM.

3. **Thaana Mapping**:
   - Supports Latin-to-Thaana character mapping out of the box.
   - Handles special characters (e.g., `،`, `؟`, `؛`) for Thaana input.

---

## Installation

Install the library using npm or yarn:

```bash
npm install react-thaana-controls
# or
yarn add react-thaana-controls
```

### Example Usage

#### Thaana Input Example:

```tsx
import React, { useState } from 'react';
import { ThaanaInput } from 'react-thaana-controls';

const App = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <h1>Thaana Input Example</h1>
      <ThaanaInput value={value} onChange={setValue} placeholder="ތާނަ" />
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

#### Thaana Form Wrapper Example:

```tsx
import React, { useState } from 'react';
import { ThaanaFormWrapper } from 'react-thaana-controls';

const App = () => {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <h1>Thaana Form Example</h1>
      <ThaanaFormWrapper onChange={data => setFormData(data)}>
        <input name="firstName" placeholder="ނަން" />
        <textarea name="address" placeholder="ހުރިހާބު" />
      </ThaanaFormWrapper>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
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

### Props for `ThaanaFormWrapper`

| Prop       | Type                                         | Required | Description                                                                                                                                      |
| ---------- | -------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children` | `React.ReactNode`                            | Yes      | The child components (e.g., `<input>` and `<textarea>`) to be wrapped by the `ThaanaFormWrapper`.                                                |
| `onChange` | `(formData: Record<string, string>) => void` | No       | Callback function triggered whenever any child input/textarea value changes. The callback receives an object containing the form's current data. |

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
