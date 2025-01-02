import React, { useEffect, useRef } from 'react';
import ThaanaKeyboard from '../class/ThaanaKeyboard';
import { ThaanaInputProps } from '../types';
import { generateUniqueClassName } from '../utils';

export const ThaanaInput: React.FC<ThaanaInputProps> = ({
  value,
  onChange,
  placeholder,
  style,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uniqueClassName = useRef(generateUniqueClassName('thaana-input'));

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
    <input
      ref={inputRef}
      dir="rtl"
      type="text"
      className={uniqueClassName.current}
      onChange={e => onChange(e.target.value)}
      value={value}
      placeholder={placeholder}
      style={style}
      disabled={disabled}
    />
  );
};
