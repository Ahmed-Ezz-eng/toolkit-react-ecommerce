import React from 'react';
import RenderProductsTab from './RenderProductsTab';

const RenderCategory = ({value}) => {

    switch(value) {
    case "1":
        return <RenderProductsTab cat="all"  />

    case "2":
        return <RenderProductsTab cat="electronics" />

    case "3":
        return <RenderProductsTab cat="jewelery"  />
            
    case "4":
        return <RenderProductsTab cat="men's clothing" />

    case "5":
        return <RenderProductsTab cat="women's clothing"  />

    default:
        break;
}
}
export default React.memo(RenderCategory);


