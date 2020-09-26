/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import DocumentPortal from '..';

const TestComponent = () => (
  <main data-testid="main">
    <p>Example application</p>
    <DocumentPortal>
      <dialog data-testid="dialog">Hello!</dialog>
    </DocumentPortal>
  </main>
);

test('does not render on server', () => {
  expect(renderToString(<TestComponent />)).not.toContain(
    'data-testid="dialog"'
  );
});
