import PropTypes from 'prop-types';
import { Children, useRef } from 'react';
import { createPortal } from 'react-dom';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

const DocumentPortal = (props) => {
  const child = Children.only(props.children);
  const nodeRef = useRef(document.createElement('div'));

  useIsomorphicLayoutEffect(() => {
    const node = nodeRef.current;
    document.body.appendChild(node);
    return () => document.body.removeChild(node);
  }, []);

  return createPortal(child, nodeRef.current);
};

DocumentPortal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DocumentPortal;
