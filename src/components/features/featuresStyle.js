import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const FeatureContent = styled(Card)`
    padding: 20px;
    margin: 30px 0px 0px;

    & .price{
        text-align: center;
    }

    & h3 {
        margin: 10px 0px;
    }
    & img{
        object-fit: contain;
        width: 100%;
        height: 200px;
        margin-bottom: 15px;
    }
`;