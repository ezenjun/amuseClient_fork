import React from "react";
import { ScrollContainer } from "../styles";
import { AdditionalInfoModalProps } from "../../../Interfaces/PropsInterfaces";

const CancelPolicyModal = ({ content }: AdditionalInfoModalProps) => {
	return (
		<ScrollContainer>
			{content.split("\n").map((line, index) => (
				<p key={index}>{line}</p>
			))}
		</ScrollContainer>
	);
};

export default CancelPolicyModal;
