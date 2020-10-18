import { render } from '@testing-library/react';
import * as React from 'react';
import DocumentPortal from '..';

test('renders child inside portal', () => {
  const { getByTestId } = render(
    <main data-testid="main">
      <DocumentPortal>
        <dialog data-testid="dialog">Hello!</dialog>
      </DocumentPortal>
    </main>
  );
  const dialogElement = getByTestId('dialog');
  expect(getByTestId('main')).not.toContainElement(dialogElement);
  expect(dialogElement).toBeInTheDocument();
  expect(dialogElement.parentNode.tagName).toBe('DIV');
});

test('renders without children', () => {
  const { baseElement } = render(<DocumentPortal />);
  expect(baseElement.lastChild.tagName).toBe('DIV');
});

test('appends element to document body element on mount', () => {
  const { baseElement, getByTestId } = render(
    <DocumentPortal>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  expect(baseElement.lastChild).toBe(getByTestId('dialog').parentNode);
});

test('removes element from document body element unmount', () => {
  const { getByTestId, unmount } = render(
    <DocumentPortal>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  const targetElement = getByTestId('dialog');
  unmount();
  expect(targetElement).not.toBeInTheDocument();
});

test('uses `as` prop for portal container tagName', () => {
  const { getByTestId, rerender } = render(
    <DocumentPortal as="aside">
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  expect(getByTestId('dialog').parentNode.tagName).toBe('ASIDE');
  rerender(
    <DocumentPortal as="span">
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  expect(getByTestId('dialog').parentNode.tagName).toBe('SPAN');
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
