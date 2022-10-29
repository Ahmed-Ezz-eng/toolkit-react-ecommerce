import styled from "@emotion/styled";
import { Card } from "@mui/material";


export const CardContainer = styled(Card)`
    & .MuiButtonBase-root{
        margin-top: 0px;
    }
    
    img{
        width: 100%;
        height: 200px;
        object-fit: contain;
        padding: 10px 15px;
    }

    div.MuiCardContent-root{
        padding: 15px 0px;
        text-align: center;
    }

    button{
        margin-top: 10px;
        margin-left: auto;
    }
`;