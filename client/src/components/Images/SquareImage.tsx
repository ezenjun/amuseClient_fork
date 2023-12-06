import React from "react";
import styled from "@emotion/styled";
import { SquareImageProps } from "../../Interfaces/PropsInterfaces";
import { Common } from "../../styles";

const SquareImage = ({
	size,
	imgUrl,
	borderRadius,
	children,
}: SquareImageProps) => {
	return (
		<SquareImg size={size} imgUrl={imgUrl} borderRadius={borderRadius}>
			{children}
		</SquareImg>
	);
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
	position: relative;
`;
