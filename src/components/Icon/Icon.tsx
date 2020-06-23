import * as React from 'react';
import SVG from 'react-inlinesvg';

// @ts-ignore
const Icon = ({ icon, ...props }) => {
  return <SVG cacheRequests={true} src={'/icons/' + icon + '.svg'} {...props}/>;
};

export default Icon;
