import React, { useState } from 'react';
const Loader = props => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={`progress-loader`} hidden={!loading && !props.lazyLoad}>
      <div id="overlay"></div>
    </div>
  );
};

export default Loader;
