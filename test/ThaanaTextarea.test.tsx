import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThaanaTextarea } from '../src/components/ThaanaTextarea';
import { keyMap } from '../src/keymaps/thaana';

describe('ThaanaTextarea Component', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <ThaanaTextarea value="" onChange={() => {}} placeholder="Type here" />
    );
    expect(getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('updates value and calls onChange when typing mapped characters', () => {
    let value = ''; // Simulate parent state
    const onChangeMock = jest.fn(newValue => {
      value = newValue; // Update simulated state
    });

    const { getByPlaceholderText, rerender } = render(
      <ThaanaTextarea
        value={value}
        onChange={onChangeMock}
        placeholder="Type here"
      />
    );

    const textarea = getByPlaceholderText('Type here') as HTMLTextAreaElement;

    Object.entries(keyMap).forEach(([, thaanaChar]) => {
      fireEvent.input(textarea, { target: { value: thaanaChar } });

      // Update the component with the new value
      rerender(
        <ThaanaTextarea
          value={value}
          onChange={onChangeMock}
          placeholder="Type here"
        />
      );

      expect(onChangeMock).toHaveBeenCalledWith(thaanaChar);
      expect(textarea.value).toBe(thaanaChar);
    });
  });

  it('does not transform unmapped characters', () => {
    let value = ''; // Simulate parent state
    const onChangeMock = jest.fn(newValue => {
      value = newValue;
    });

    const { getByPlaceholderText, rerender } = render(
      <ThaanaTextarea
        value={value}
        onChange={onChangeMock}
        placeholder="Type here"
      />
    );

    const textarea = getByPlaceholderText('Type here') as HTMLTextAreaElement;

    const unmappedChars = ['1', '@', '-', '+'];

    unmappedChars.forEach(char => {
      fireEvent.input(textarea, { target: { value: char } });

      // Update the component with the new value
      rerender(
        <ThaanaTextarea
          value={value}
          onChange={onChangeMock}
          placeholder="Type here"
        />
      );

      expect(onChangeMock).toHaveBeenCalledWith(char);
      expect(textarea.value).toBe(char);
    });
  });

  it('handles controlled value updates correctly', () => {
    const { getByPlaceholderText, rerender } = render(
      <ThaanaTextarea value="ރއ" onChange={() => {}} placeholder="Type here" />
    );

    const textarea = getByPlaceholderText('Type here') as HTMLTextAreaElement;

    // Ensure initial value is set
    expect(textarea.value).toBe('ރއ');

    // Update the value via props
    rerender(
      <ThaanaTextarea value="ތލ" onChange={() => {}} placeholder="Type here" />
    );
    expect(textarea.value).toBe('ތލ');
  });

  it('handles special character transformations', () => {
    let value = ''; // Simulate parent state
    const onChangeMock = jest.fn(newValue => {
      value = newValue;
    });

    const { getByPlaceholderText, rerender } = render(
      <ThaanaTextarea
        value={value}
        onChange={onChangeMock}
        placeholder="Type here"
      />
    );

    const textarea = getByPlaceholderText('Type here') as HTMLTextAreaElement;

    const specialChars = { ',': '،', ';': '؛', '?': '؟' };

    Object.entries(specialChars).forEach(([, thaanaChar]) => {
      fireEvent.input(textarea, { target: { value: thaanaChar } });

      // Update the component with the new value
      rerender(
        <ThaanaTextarea
          value={value}
          onChange={onChangeMock}
          placeholder="Type here"
        />
      );

      expect(onChangeMock).toHaveBeenCalledWith(thaanaChar);
      expect(textarea.value).toBe(thaanaChar);
    });
  });
});
