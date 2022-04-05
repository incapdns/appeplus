import { memo } from "react";
import styled, { css } from "styled-components";

const done = css`
    background-image: url(https://i.imgur.com/EQiqtpu.png);
`;

const notDone = css`
    background-image: url(https://powerview-energy.com/wp-content/uploads/2020/10/uploading.gif);
`;

const error = css`
    background-image: url(https://i.imgur.com/shQkP3c.png)
`

interface IImageProgress {
    progress: number;
}

const ImageProgress = styled.div<IImageProgress>`
    width: 40px;
    height: 40px;
    display: inline-block !important;
    top: 13px;
    position: relative;
    background-size: 100%;
    ${(props: any) => props.progress >= 0 && props.progress < 100 && notDone};
    ${(props: any) => props.progress == 100 && done};
    ${(props: any) => props.progress == -1 && error};
  }
`;

export default memo(ImageProgress)