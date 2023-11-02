import React, { SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./TermsModal.module.scss";
import {
	ButtonContainer,
	ModalBackground,
	ModalContainer,
	ScrollContainer,
} from "./styles";
import {
	Bold32Black,
	Regular16Gray,
} from "../../../../../../components/Text/Text";
import { WebButton } from "../../../../../../components/Button/WebButton";

interface TermsModalProps {
	setShowModal: React.Dispatch<SetStateAction<boolean>>;
	title: string | undefined;
	content: string | undefined;
}

export const TermsModal: React.FC<TermsModalProps> = ({
	setShowModal,
	title,
	content,
}) => {
	const closeModal = () => {
		setShowModal(false);
		document.body.style.overflow = "scroll";
	};

	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (event: any) => {
			const target = event.target as HTMLInputElement;
			if (modalRef.current && !modalRef.current.contains(target)) {
				setShowModal(false);
				document.body.style.overflow = "scroll";
			}
		};

		document.addEventListener("mousedown", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	return (
		<ModalBackground>
			<ModalContainer>
				<Bold32Black>{title}</Bold32Black>
				<ScrollContainer>
					{/* <p> */}
					{content?.split("\n").map((line, index) => (
						<Regular16Gray key={index}>{line}</Regular16Gray>
					))}
					{/* </p> */}
				</ScrollContainer>
				<ButtonContainer>
					<WebButton
						color="red"
						fontSize={20}
						width={308}
						onClick={closeModal}
						verticalPadding={18}
					>
						확인
					</WebButton>
				</ButtonContainer>
			</ModalContainer>
		</ModalBackground>
	);
};
