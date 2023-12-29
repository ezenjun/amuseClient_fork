import React from "react";
import { ScrollContainer } from "../styles";
import { AdditionalInfoModalProps } from "../../../Interfaces/PropsInterfaces";

const CancelPolicyModal = ({ content }: AdditionalInfoModalProps) => {
	return (
		<ScrollContainer>
			{content.split("\n").map((line, index) => (
				<span key={index}>{line}</span>
			))}
		</ScrollContainer>
	);
};

export default CancelPolicyModal;
