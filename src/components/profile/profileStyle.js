import styled from "@emotion/styled";
import { Box } from "@mui/material";


export const ProfileImg = styled(Box)(({theme}) => `
    position: relative;

    img{
        width: 250px;
        height: 250px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0px 0px 10px #ddd;
        padding: 10px;
        margin-bottom: 30px;
    }

    input[type="file"] {
        width: 100%;
        height: 100%;
        padding: 10px;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
    }

`)