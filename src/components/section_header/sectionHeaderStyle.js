import styled from "@emotion/styled";
import { Typography } from '@mui/material';

export const SectionTilte = styled(Typography)(({theme}) => `
    color: transparent;
    text-transform: capitalize;
    font-weight: bold;
    -webkit-text-stroke: 2px ${theme.palette.primary.main};
    position: relative;
    letter-spacing: 1px;
    width: fit-content;
    margin: 0px auto 50px ;
    font-size: 55px;

    @media(max-width: 500px){
        font-size: 40px;
    }
    
    ::before{
        content: attr(data-fill-text);
        position: absolute;
        height: 100%;
        width: 0%;
        color: ${theme.palette.primary.main};
        letter-spacing: 1px;
        -webkit-text-stroke: 0px transparent;
        transition: all 2s;
        overflow: hidden;
    }

    :hover::before{
        width: 100%;
    }
`)