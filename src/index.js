import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const DocumentPortal = ({ children = null }) => {
  const [node, setNode] = useState();

  useEffect(() => {
    setNode((node) => node || document.createElement('div'));
  }, []);

  useEffect(() => {
    if (node) {
      document.body.appendChild(node);
      return () => {
        node.parentNode.removeChild(node);
      };
    }
  }, [node]);

  return node ? ReactDOM.createPortal(children, node) : null;
};

if (process.env.NODE_ENV !== 'production') {
  DocumentPortal.propTypes = {
    children: PropTypes.node,
  };
}

export default DocumentPortal;
