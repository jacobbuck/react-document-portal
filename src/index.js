import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import updateRef from './updateRef';

const DocumentPortal = forwardRef(function DocumentPortal(
  { as = 'div', children = null },
  ref
) {
  const [node, setNode] = useState();

  useIsomorphicLayoutEffect(() => {
    setNode(document.createElement(as));
  }, [as]);

  useIsomorphicLayoutEffect(() => {
    if (node) {
      document.body.appendChild(node);
      return () => {
        node.parentNode.removeChild(node);
      };
    }
  }, [node]);

  useIsomorphicLayoutEffect(() => {
    if (ref) {
      updateRef(ref, node);
      return () => {
        updateRef(ref, null);
      };
    }
  }, [node, ref]);

  return node ? createPortal(children, node) : null;
});

if (process.env.NODE_ENV !== 'production') {
  DocumentPortal.propTypes = {
    as: PropTypes.string,
    children: PropTypes.node,
  };
}

export default DocumentPortal;
