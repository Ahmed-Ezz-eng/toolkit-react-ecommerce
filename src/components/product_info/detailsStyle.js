import styled from "@emotion/styled";
import { Box } from "@mui/material";


export const ProductDetailsBox = styled("div")(({theme}) => `
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    box-shadow: 0px 0px 5px ${theme.palette.mode === "light" ? "#ddd" : "#333" };
`);

export const ProductImgBox = styled('div')`
    max-width: 50%;
    display: flex;
    @media(max-width: 800px) {
        margin-bottom: 30px;
        min-width: 100%;
    }

    @media(max-width: 600px) {
        flex-flow: row wrap-reverse;
    }

    > img{
        max-width: 60%;
        object-fit: contain;
        margin: auto;

        @media(max-width: 800px) {
        max-width: 70%;
        height: 350px;
    }

        @media(max-width: 600px){
            max-width: 100%;
        }

    }
    .small-imgs{
        max-width: 25%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        height: 100%;

        @media(max-width: 800px) {
            max-width: 30%;
    }
        @media(max-width: 600px){
            max-width: 100%;
            display: flex ;
            flex-flow: row wrap;
            justify-content: center;
            align-content: center;
            align-items: center;
            height: auto;
            margin-top: 30px;
        }
        
        > img{
            padding: 5px;
            cursor: pointer;
            z-index: 99;
            max-width: 90%;
            height: 120px;

            @media(max-width: 600px){
                height: 100px;
                margin-bottom: 10px;
                margin-left: 5px;
                margin-right: 5px;
        }
        }
    }

`
export const ProductInfoBox = styled("div")`
    max-width: 50%;
    @media(max-width: 800px) {
        max-width: 100%;
        margin-top: 30px;
    }
`


export const RelatedBox = styled("div")(({theme}) => `
    padding: 20px;
`);

export const RelatedContainer = styled(Box)`
    & h3{
        margin: 70px 0px;
        font-size: 30px;
        text-transform: capitalize;
    }
`;
