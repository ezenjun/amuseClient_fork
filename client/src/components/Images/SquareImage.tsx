import React from "react";
import styled from "@emotion/styled";
import { SquareImageProps } from "../../interfaces/PropsInterfaces";
import { Common } from "../../styles";

const SquareImage = ({ size, imgUrl, borderRadius }: SquareImageProps) => {
  return <SquareImg size={size} imgUrl={imgUrl} borderRadius={borderRadius} />;
};

export default SquareImage;

export const SquareImg = styled.div<{
  size: number;
  imgUrl: string;
  borderRadius: number;
}>`
  flex-shrink: 0;
  width: ${(props) => props.size * 0.0625}rem;
  height: ${(props) => props.size * 0.0625}rem;
  border-radius: ${(props) => props.borderRadius * 0.0625}rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
  background-color: ${Common.colors.gray};
`;
