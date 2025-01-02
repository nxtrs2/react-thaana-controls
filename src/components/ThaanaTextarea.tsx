import React, { useEffect, useRef } from 'react';
import ThaanaKeyboard from '../class/ThaanaKeyboard';
import { ThaanaInputProps } from '../types';
import { generateUniqueClassName } from '../utils';

export const ThaanaTextarea: React.FC<ThaanaInputProps> = ({
  value,
  onChange,
  placeholder,
  style,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const uniqueClassName = useRef(generateUniqueClassName('thaana-textarea'));

  useEffect(() => {
    let keyboard: ThaanaKeyboard | null = null;
    if (inputRef.current) {
      keyboard = new ThaanaKeyboard(
        `.${uniqueClassName.current}`,
        true,
        onChange
      );
      keyboard.run();
    }

    return () => {
      if (keyboard) {
        document.removeEventListener(
          'selectionchange',
          keyboard.selectionChange
        );
      }
    };
  }, [onChange]);

  return (
    <textarea
      cols={30}
      ref={inputRef}
      dir="rtl"
      value={value}
      placeholder={placeholder}
      className={uniqueClassName.current}
      onChange={e => onChange(e.target.value)}
      style={style}
      disabled={disabled}
    />
  );
};
