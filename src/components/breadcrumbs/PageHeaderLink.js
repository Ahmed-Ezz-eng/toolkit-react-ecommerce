import React from 'react';
import { BreadcrumbsContainer } from './pageHeaderStyle';
import { Link } from "react-router-dom";


const PageHeaderLink = ({activeLink}) => {
const linkArray = ["home", "products", "features", "cart"];


return (
<BreadcrumbsContainer aria-label="breadcrumb" separator="›" sx={{marginBottom: "20px"}}>
    {
        linkArray.map((link, index) => {
            if(activeLink === link) {
                return <Link className="active" to={link === "home" ? `/` : `/${link}`} key={index}>{link}</Link>
            } else {
                return <Link to={link === "home" ? `/` : `/${link}`} key={index}>{link}</Link>
            }
        })
    }
</BreadcrumbsContainer>
)
}

export default React.memo(PageHeaderLink);