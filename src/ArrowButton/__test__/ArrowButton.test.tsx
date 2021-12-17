import React from 'react';
import { render } from '@testing-library/react';
import ArrowButton from '../ArrowButton';

describe('ArrowButton', () => {
  test('renders without crashing', () => {
    const { getByText, container } = render(<ArrowButton>arrow-button</ArrowButton>);
    const testElement = getByText(/arrow-button/i);
    expect(testElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  [true, false].forEach((loading) => {
    test(`renders without crashing with prop loading ${loading}`, () => {
      const { getByText, container } = render(
          <ArrowButton loading={loading}>
            arrow-button
          </ArrowButton>,
      );
      const testElement = getByText(/arrow-button/i);
      expect(testElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
