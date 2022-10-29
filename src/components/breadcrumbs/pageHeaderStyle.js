import styled from "@emotion/styled";
import { Breadcrumbs } from "@mui/material";

export const BreadcrumbsContainer = styled(Breadcrumbs)(({theme}) => `
    a{
        color: ${theme.palette.text.secondary};
        text-decoration: none;
        text-transform: capitalize;
    }

    a.active{
        color: ${theme.palette.primary.main};
    }
`);