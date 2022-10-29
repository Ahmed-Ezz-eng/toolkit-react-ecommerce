import styled from "@emotion/styled";
import { Box, Paper } from "@mui/material";


export const NoData = styled("div")(({theme}) =>`
    padding: 20px 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:${theme.palette.primary.main};
    color: #fff;
    font-size: 40px;
    border-radius: 10px;
`);

export const CartImg = styled(Box)`
    width: 50%;
    @media(max-width: 900px){
        width: 100%;

        & img{
        height: 250px;
    }
}

    & img{
        width: 75%;
        transform: translateX(10%);
        height: 400px;
        object-fit: contain;
    }
`;

export const CartInfo = styled(Box)`
    width: 50%;
    @media(max-width: 900px){
        width: 100%;
    }
`;

export const CheckoutBox = styled(Paper)(({theme}) => `

    & .MuiBox-root{
        padding: 10px;
    }

    & h5{
        background: ${theme.palette.primary.main};
        padding: 10px 0px;
        text-align: center;
        color: #fff
    }
`)


