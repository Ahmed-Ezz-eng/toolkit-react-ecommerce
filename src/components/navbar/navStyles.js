import { List, styled } from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export const NavIcons = styled(List)`
    display: flex;
    align-items: center;
    margin-left: auto;
    
    & > li{
        padding: 0px;
    }

    & > li:nth-of-type(2){
        padding: 0px 15px;
    }
`;

export const NavLogo = styled(RouterLink)`
    font-size: 30px;
    text-transform: capitalize;
    letter-spacing: 1px;
    text-decoration: none;
    color: inherit;

    @media(max-width: 350px){
        display: none;
    }

`;