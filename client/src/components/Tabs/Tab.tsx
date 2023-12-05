import React from "react";
import { TabContainer } from "./styles";

interface TabProps {
	isActive: boolean;
	onClick: () => void;
	children: any;
}

const Tab = ({ isActive, onClick, children }: TabProps) => {
	return (
		<TabContainer isActive={isActive} onClick={onClick}>
			{children}
		</TabContainer>
	);
};

export default Tab;
