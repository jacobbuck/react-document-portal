import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const DocumentPortal = (props) => {
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

  return node ? ReactDOM.createPortal(props.children, node) : null;
};

DocumentPortal.defaultProps = {
  children: null,
};

if (process.env.NODE_ENV !== 'production') {
  DocumentPortal.propTypes = {
    children: PropTypes.node,
  };
}

export default DocumentPortal;
