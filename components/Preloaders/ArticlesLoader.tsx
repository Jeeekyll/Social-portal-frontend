import React from 'react';
import ContentLoader from 'react-content-loader';

const ArticlesLoader = (props) => (
  <ContentLoader
    speed={2}
    width={600}
    height={200}
    viewBox='0 0 600 200'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='39' cy='36' r='30' />
    <rect x='85' y='9' rx='9' ry='9' width='500' height='16' />
    <rect x='6' y='81' rx='8' ry='8' width='581' height='55' />
    <rect x='85' y='42' rx='9' ry='9' width='500' height='16' />
    <rect x='6' y='156' rx='9' ry='9' width='580' height='16' />
  </ContentLoader>
);

export default ArticlesLoader;
