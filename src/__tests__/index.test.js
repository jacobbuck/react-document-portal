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

test('updates function refs', () => {
  const ref = jest.fn();
  const { getByTestId, unmount } = render(
    <DocumentPortal ref={ref}>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  expect(ref).toHaveBeenLastCalledWith(getByTestId('dialog').parentNode);
  unmount();
  expect(ref).toHaveBeenLastCalledWith(null);
});

test('updates object refs', () => {
  const ref = React.createRef();
  const { getByTestId, unmount } = render(
    <DocumentPortal ref={ref}>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  expect(ref).toHaveProperty('current', getByTestId('dialog').parentNode);
  unmount();
  expect(ref).toHaveProperty('current', null);
});

test('handles changed ref', () => {
  const ref1 = jest.fn();
  const { getByTestId, rerender } = render(
    <DocumentPortal ref={ref1}>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  const ref2 = React.createRef();
  rerender(
    <DocumentPortal ref={ref2}>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  expect(ref1).toHaveBeenLastCalledWith(null);
  expect(ref2).toHaveProperty('current', getByTestId('dialog').parentNode);
});

test('propTypes aren’t set in production', () => {
  const env = process.env;
  process.env = { NODE_ENV: 'production' };
  jest.resetModules();
  expect(require('..').default).not.toHaveProperty('propTypes');
  process.env = env;
  jest.resetModules();
});
