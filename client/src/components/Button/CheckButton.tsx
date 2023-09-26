import React from "react";
import { ReactComponent as CheckOn } from "../../assets/Icons/Radio/radio_check_on.svg";
import { ReactComponent as CheckOff } from "../../assets/Icons/Radio/radio_check_off.svg";
import { CheckButtonProps } from "../../Interfaces/PropsInterfaces";

const CheckButton = ({ isActive, onClick }: CheckButtonProps) => {
	return (
		<>
			{isActive ? (
				<CheckOn
					onClick={onClick}
					style={{ cursor: "pointer" }}
				></CheckOn>
			) : (
				<CheckOff
					onClick={onClick}
					style={{ cursor: "pointer" }}
				></CheckOff>
			)}
		</>
	);
};

export default CheckButton;
