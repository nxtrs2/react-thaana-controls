import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThaanaFormWrapper } from '../src/components/ThaanaFormWrapper';

describe('ThaanaFormWrapper', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <ThaanaFormWrapper>
        <input name="testInput" placeholder="Enter text" />
        <textarea name="testTextarea" placeholder="Enter multiline text" />
      </ThaanaFormWrapper>
    );

    expect(getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter multiline text')).toBeInTheDocument();
  });

  it('applies dir="rtl" to all fields', () => {
    const { getByPlaceholderText } = render(
      <ThaanaFormWrapper>
        <input name="firstName" placeholder="First Name" />
        <textarea name="address" placeholder="Address" />
      </ThaanaFormWrapper>
    );

    const input = getByPlaceholderText('First Name');
    const textarea = getByPlaceholderText('Address');

    expect(input).toHaveAttribute('dir', 'rtl');
    expect(textarea).toHaveAttribute('dir', 'rtl');
  });

  it("logs a warning for inputs missing the 'name' prop", () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();

    render(
      <ThaanaFormWrapper>
        <input placeholder="No Name" />
      </ThaanaFormWrapper>
    );

    expect(consoleWarnMock).toHaveBeenCalledWith(
      "All inputs in ThaanaFormWrapper should have a 'name' prop."
    );

    consoleWarnMock.mockRestore();
  });
});
