import styled, { css } from "styled-components";

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

type IDropContainer = {
  isDragActive?: boolean;
  isDragReject?: boolean;
};

export const DropContainer = styled.div<IDropContainer>`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props: any) => props.isDragActive && dragActive};
  ${(props: any) => props.isDragReject && dragReject};
`;

const messageColors = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5",
};

interface ITypeMessageColor {
  type?: "default" | "error" | "success";
}

export const UploadMessage = styled.p<ITypeMessageColor>`
  display: flex;
  color: ${(props) => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export const Container = styled.ul`
  /* margin-top: 20px; */
  @media(max-width:768px){
    padding: 0 20px;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  div{
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;

      .btnExcluir{ 
        border: 0;
        width: 25px;
        height: 25px;
        border-radius: 5px;
        background: #FF715B;
        color: #fff;
        margin-left: 5px;
        cursor: pointer;
      }
    }
    textarea{
      height: 120px;
      width: 250px;
      border: "solid 2px #CED4DA";
      margin-top: 25px;
      @media(max-width:768px){
        width: 130px;
      }
    }
  }
`;

interface PreviewProps {
  src?: string;
}

export const Preview = styled.div<PreviewProps>`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size:100%;
  background-position: 50% 50%;
  margin-right: 10px;
  @media(max-width:768px){
    width: 50%;
  }
  
`;
