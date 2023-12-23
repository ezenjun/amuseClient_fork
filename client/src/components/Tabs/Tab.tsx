import React from "react";
import { TabContainer } from "./styles";

interface TabProps {
	isActive: boolean;
	onClick: () => void;
	children: any;
	width?: number | string;
}

const Tab = ({ isActive, onClick, children, width }: TabProps) => {
	return (
		<TabContainer isActive={isActive} onClick={onClick} width={width}>
			{children}
		</TabContainer>
	);
};

export default Tab;
