import React, { useEffect, useRef, useState } from 'react';
import ThaanaKeyboard from '../class/ThaanaKeyboard';
import { generateUniqueClassName } from '../utils';
import { ThaanaFormWrapperProps } from '../types';

export const ThaanaFormWrapper: React.FC<ThaanaFormWrapperProps> = ({
  children,
  onChange,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const wrapperRef = useRef<HTMLFormElement | null>(null);

  // Generate a unique class name for this form wrapper
  const uniqueClassName = useRef(generateUniqueClassName('thaana-form'));

  const handleInputChange = (name: string, value: string) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    if (onChange) {
      onChange(updatedFormData);
    }
  };

  useEffect(() => {
    if (wrapperRef.current) {
      const keyboard = new ThaanaKeyboard(
        `.${uniqueClassName.current}`, // Use the unique class name to target fields
        true,
        value => {
          const activeElement = document.activeElement as
            | HTMLInputElement
            | HTMLTextAreaElement
            | null;
          if (activeElement && activeElement.name) {
            handleInputChange(activeElement.name, value);
          }
        }
      );
      keyboard.run();
    }
  }, []);

  const renderChildrenWithThaana = (children: React.ReactNode) => {
    return React.Children.map(children, child => {
      if (
        React.isValidElement<
          React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
            HTMLInputElement | HTMLTextAreaElement
          >
        >(child)
      ) {
        const name = child.props.name;
        if (!name) {
          console.warn(
            "All inputs in ThaanaFormWrapper should have a 'name' prop."
          );
        }
        return React.cloneElement(child, {
          className: `${child.props.className || ''} ${
            uniqueClassName.current
          }`.trim(),
          dir: 'rtl',
        });
      }
      return child;
    });
  };

  return <form ref={wrapperRef}>{renderChildrenWithThaana(children)}</form>;
};
