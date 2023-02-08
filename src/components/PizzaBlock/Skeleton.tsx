import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton:React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="139" cy="144" r="126" />
    <rect x="0" y="289" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="330" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="440" rx="10" ry="10" width="95" height="37" />
    <rect x="129" y="435" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
