import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ArrowButton from '../ArrowButton';

describe('ArrowButton', () => {
  test('renders without crashing', () => {
    const { getByText, container } = render(<ArrowButton>arrow-button</ArrowButton>);
    const testElement = getByText(/arrow-button/i);
    expect(testElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  [true, false].forEach((newTab) => {
    test(`renders without crashing with prop newTab ${newTab}`, () => {
      const { getByText, container } = render(
        <MemoryRouter>
          <ArrowButton to="#" newTab={newTab}>
            arrow-button
          </ArrowButton>
        </MemoryRouter>,
      );
      const testElement = getByText(/arrow-button/i);
      expect(testElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  [true, false].forEach((loading) => {
    test(`renders without crashing with prop loading ${loading}`, () => {
      const { getByText, container } = render(
        <MemoryRouter>
          <ArrowButton to="#" loading={loading}>
            arrow-button
          </ArrowButton>
        </MemoryRouter>,
      );
      const testElement = getByText(/arrow-button/i);
      expect(testElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
