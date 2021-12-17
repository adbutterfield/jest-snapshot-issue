import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
  test('renders without crashing', () => {
    const { getByTestId, container } = render(<Loading data-testid="loading" />);
    const testElement = getByTestId('loading');
    expect(testElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
