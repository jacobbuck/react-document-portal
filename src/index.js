import PropTypes from 'prop-types';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

const DocumentPortal = ({ children = null }) => {
  const [node, setNode] = useState();

  useIsomorphicLayoutEffect(() => {
    setNode((node) => node || document.createElement('div'));
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (node) {
      document.body.appendChild(node);
      return () => {
        node.parentNode.removeChild(node);
      };
    }
  }, [node]);

  return node ? createPortal(children, node) : null;
};

if (process.env.NODE_ENV !== 'production') {
  DocumentPortal.propTypes = {
    children: PropTypes.node,
  };
}

export default DocumentPortal;
