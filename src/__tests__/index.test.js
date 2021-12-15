/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import DocumentPortal from '..';
import useBrowserLayoutEffect from '../useBrowserLayoutEffect';

jest.mock('../useBrowserLayoutEffect', () => ({
  __esModule: true,
  default: jest.fn(jest.requireActual('../useBrowserLayoutEffect').default),
}));

test('renders child inside portal', async () => {
  render(
    <main data-testid="main">
      <DocumentPortal>
        <dialog data-testid="dialog">Hello!</dialog>
      </DocumentPortal>
    </main>
  );
  const dialogElement = await screen.findByTestId('dialog');
  expect(screen.getByTestId('main')).not.toContainElement(dialogElement);
  expect(dialogElement).toBeInTheDocument();
  expect(dialogElement.parentNode.tagName).toBe('DIV');
});

test('renders without children', async () => {
  const ref = createRef();
  const { baseElement } = render(<DocumentPortal ref={ref} />);
  await waitFor(() => {
    expect(baseElement).toContainElement(ref.current);
  });
});

test('appends element to document body element on mount', async () => {
  const { baseElement } = render(
    <DocumentPortal>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  const dialogElement = await screen.findByTestId('dialog');
  expect(baseElement.lastChild).toBe(await dialogElement.parentNode);
});

test('removes element from document body element unmount', async () => {
  const { unmount } = render(
    <DocumentPortal>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  const targetElement = await screen.findByTestId('dialog');
  unmount();
  expect(targetElement).not.toBeInTheDocument();
});

test('uses `as` prop for portal container tagName', async () => {
  const { rerender } = render(
    <DocumentPortal as="aside">
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  let dialogElement = await screen.findByTestId('dialog');
  expect(dialogElement.parentNode.tagName).toBe('ASIDE');
  rerender(
    <DocumentPortal as="span">
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  dialogElement = await screen.findByTestId('dialog');
  expect(dialogElement.parentNode.tagName).toBe('SPAN');
});

test('updates function refs', async () => {
  const ref = jest.fn();
  const { unmount } = render(
    <DocumentPortal ref={ref}>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  const dialogElement = await screen.findByTestId('dialog');
  expect(ref).toHaveBeenLastCalledWith(dialogElement.parentNode);
  unmount();
  expect(ref).toHaveBeenLastCalledWith(null);
});

test('updates object refs', async () => {
  const ref = createRef();
  const { unmount } = render(
    <DocumentPortal ref={ref}>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  const dialogElement = await screen.findByTestId('dialog');
  expect(ref.current).toBe(dialogElement.parentNode);
  unmount();
  expect(ref.current).toBe(null);
});

test('handles changed ref', async () => {
  const ref1 = jest.fn();
  const { rerender } = render(
    <DocumentPortal ref={ref1}>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  const ref2 = createRef();
  rerender(
    <DocumentPortal ref={ref2}>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  );
  expect(ref1).toHaveBeenLastCalledWith(null);
  const dialogElement = await screen.findByTestId('dialog');
  expect(ref2.current).toBe(dialogElement.parentNode);
});

test('hydrates from server-side rendering', async () => {
  const TestComponent = () => (
    <main data-testid="main">
      <DocumentPortal>
        <dialog data-testid="dialog">Hello!</dialog>
      </DocumentPortal>
    </main>
  );

  useBrowserLayoutEffect.mockImplementationOnce(() => {});
  useBrowserLayoutEffect.mockImplementationOnce(() => {});
  useBrowserLayoutEffect.mockImplementationOnce(() => {});

  const container = document.createElement('div');
  container.innerHTML = renderToString(<TestComponent />);
  document.body.appendChild(container);

  render(<TestComponent />, { container, hydrate: true });

  const dialogElement = await screen.findByTestId('dialog');
  expect(dialogElement).toBeInTheDocument();
});
