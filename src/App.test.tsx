import React from 'react';

import {render, screen} from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders Navbar and Home components', () => {
    render(<App />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
