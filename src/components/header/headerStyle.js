import styled from "@emotion/styled";
import {Box} from "@mui/material";

export const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    loop: true,
    autoplay: true,
    arrows: false
};

export const GridContainer = styled(Box)`
    padding: 0px 100px;
    @media(max-width: 768px){
        padding: 0px 50px;
    }

    @media(max-width: 500px){
        padding: 0px 20px;
    }
`;

export const SliderContent = styled(Box)(({theme}) => `
    height: 600px;
    
    & div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: inherit;
        padding: 20px;
    }
    & span{
        font-size: 25px;
        color: ${theme.palette.text.primary};
    }

    & h2{
        font-size: 40px;
        @media (max-width: 450px) {
            font-size:30px;
        }
    }

    & .desc{
        max-width: 400px;
        font-size: 25px;
        color: ${theme.palette.text.secondary};

        @media (max-width: 450px) {
            font-size:20px;
        }
    }

    & .price{
        font-size: 30px
    }
`);


export const BannerContent = styled(Box)(({theme})=> `
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 286px;

    & .sale{
        color: ${theme.palette.text.primary};
        font-size: 22px;
    }

    & .title{
        padding: 10px 0px;
        @media (max-width: 450px) {
            font-size:25px;
        }
    }

    & .price{
        color: ${theme.palette.text.primary};
    }

    & button{
        width: 140px;
        margin-top: 20px;
    }

    & .desc{
        color: #eee;
        font-size: 20px;
    }
`);