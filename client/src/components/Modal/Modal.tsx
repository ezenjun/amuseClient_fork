import React, { SetStateAction, useEffect, useRef } from "react";
import {
	ModalBackground,
	ModalContainer,
	ModalHeader,
	ScrollContainer,
} from "./styles";
import { Bold32Black } from "../Text/Text";
import { ReactComponent as Close } from "../../assets/Icons/Close/Close_24.svg";

interface ModalProps {
	setShowModal: React.Dispatch<SetStateAction<boolean>>;
	title: string | undefined;
	children?: any;
}

export const Modal: React.FC<ModalProps> = ({
	setShowModal,
	title,
	children,
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
				<ModalHeader>
					<Bold32Black>{title}</Bold32Black>
					<Close onClick={closeModal}></Close>
				</ModalHeader>
				{children}
			</ModalContainer>
		</ModalBackground>
	);
};
