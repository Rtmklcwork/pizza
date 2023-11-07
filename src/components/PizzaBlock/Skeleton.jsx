import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
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
        <rect x="0" y="297" rx="10" ry="10" width="280" height="32" />
        <rect x="0" y="347" rx="10" ry="10" width="280" height="88" />
        <circle cx="135" cy="135" r="125" />
        <rect x="12" y="449" rx="0" ry="0" width="0" height="16" />
        <rect x="0" y="449" rx="18" ry="18" width="95" height="15" />
        <rect x="130" y="443" rx="15" ry="15" width="150" height="30" />
    </ContentLoader>
)

export default Skeleton;
