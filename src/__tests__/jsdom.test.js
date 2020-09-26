/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import * as React from 'react';
import DocumentPortal from '..';

const TestComponent = () => (
  <main data-testid="main">
    <p>Example application</p>
    <DocumentPortal>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  </main>
);

test('renders child inside portal', () => {
  const { getByTestId } = render(<TestComponent />);
  const dialogElement = getByTestId('dialog');
  expect(getByTestId('main')).not.toContainElement(dialogElement);
  expect(dialogElement).toBeInTheDocument();
  expect(dialogElement.parentNode.tagName).toBe('DIV');
});

test('appends element to document body element on mount', () => {
  const { baseElement, getByTestId } = render(<TestComponent />);
  expect(baseElement.lastChild).toBe(getByTestId('dialog').parentNode);
});

test('removes element from document body element unmount', () => {
  const { getByTestId, unmount } = render(<TestComponent />);
  const parentElement = getByTestId('main');
  const targetElement = getByTestId('dialog');
  unmount();
  expect(parentElement).not.toBeInTheDocument();
  expect(targetElement).not.toBeInTheDocument();
});
