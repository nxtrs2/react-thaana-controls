import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThaanaInput } from '../src/components/ThaanaInput';
import { keyMap } from '../src/keymaps/thaana';

describe('ThaanaInput Component', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <ThaanaInput value="" onChange={() => {}} placeholder="Type here" />
    );
    expect(getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('updates value and calls onChange when typing mapped characters', () => {
    let value = ''; // Simulate parent state
    const onChangeMock = jest.fn(newValue => {
      value = newValue; // Update simulated state
    });

    const { getByPlaceholderText, rerender } = render(
      <ThaanaInput
        value={value}
        onChange={onChangeMock}
        placeholder="Type here"
      />
    );

    const input = getByPlaceholderText('Type here') as HTMLInputElement;

    Object.entries(keyMap).forEach(([, thaanaChar]) => {
      fireEvent.input(input, { target: { value: thaanaChar } });

      // Update the component with the new value
      rerender(
        <ThaanaInput
          value={value}
          onChange={onChangeMock}
          placeholder="Type here"
        />
      );

      expect(onChangeMock).toHaveBeenCalledWith(thaanaChar);
      expect(input.value).toBe(thaanaChar);
    });
  });

  it('handles special character transformations', () => {
    let value = ''; // Simulate parent state
    const onChangeMock = jest.fn(newValue => {
      value = newValue;
    });

    const { getByPlaceholderText, rerender } = render(
      <ThaanaInput
        value={value}
        onChange={onChangeMock}
        placeholder="Type here"
      />
    );

    const input = getByPlaceholderText('Type here') as HTMLInputElement;

    const specialChars = { ',': '،', ';': '؛', '?': '؟' };

    Object.entries(specialChars).forEach(([, thaanaChar]) => {
      fireEvent.input(input, { target: { value: thaanaChar } });

      // Update the component with the new value
      rerender(
        <ThaanaInput
          value={value}
          onChange={onChangeMock}
          placeholder="Type here"
        />
      );

      expect(onChangeMock).toHaveBeenCalledWith(thaanaChar);
      expect(input.value).toBe(thaanaChar);
    });
  });

  // Other tests...
});
