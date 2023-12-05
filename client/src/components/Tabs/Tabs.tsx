import React, { useState } from "react";
import { TabsContainer } from "./styles";
import Tab from "./Tab";

interface TabsProps {
	gap: number;
	tabList: string[];
}

const Tabs = ({ gap, tabList }: TabsProps) => {
	const [isActive, setIsActive] = useState("전체");
	return (
		<TabsContainer gap={gap}>
			{tabList.map((tab) => {
				return (
					<Tab
						isActive={isActive === tab}
						onClick={() => setIsActive(tab)}
					>
						<span>{tab}</span>
					</Tab>
				);
			})}
		</TabsContainer>
	);
};

export default Tabs;
