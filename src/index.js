import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { createPortal } from 'react-dom';
import updateRef from './updateRef';
import useBrowserLayoutEffect from './useBrowserLayoutEffect';

const DocumentPortal = forwardRef(({ as = 'div', children = null }, ref) => {
  const [node, setNode] = useState(null);

  useBrowserLayoutEffect(() => {
    setNode(document.createElement(as));
  }, [as]);

  useBrowserLayoutEffect(() => {
    if (node) {
      document.body.appendChild(node);
      return () => {
        node.parentNode.removeChild(node);
      };
    }
  }, [node]);

  useBrowserLayoutEffect(() => {
    if (ref) {
      updateRef(ref, node);
      return () => {
        updateRef(ref, null);
      };
    }
  }, [node, ref]);

  return node && createPortal(children, node);
});

DocumentPortal.propTypes /* remove-proptypes */ = {
  as: PropTypes.string,
  children: PropTypes.node,
};

export default DocumentPortal;
