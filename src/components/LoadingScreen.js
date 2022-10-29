
import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const LoadingStyle = styled(Box)`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: #222;
    z-index: 9999;

    & span{
        background: red;
        position: absolute;
        border-radius: 50%;
        animation: animate 5s linear infinite;
        @keyframes animate {
            from{
                filter: hue-rotate(0deg);
                transform: translateY(0px);
            } to {
                filter: hue-rotate(720deg);
                transform: translateY(-1000px);
            }
        }
    }
`

const LoadingScreen = () => {
    const handleMove = (event) => {
        let divEl = document.querySelector("#load");
        let spanEl = document.createElement("span");
        spanEl.style.left = event.clientX - 15 + "px";
        spanEl.style.top = event.clientY - 15 + "px";
        const spanSize = Math.random() * 80;
        spanEl.style.width = spanSize + "px";
        spanEl.style.height = spanSize + "px";
        divEl.append(spanEl);

        setTimeout(() => {
            spanEl.remove();
        }, 1500)
    }

return (
<LoadingStyle id="load" onMouseMove={handleMove}>

</LoadingStyle>
)
}

export default LoadingScreen

