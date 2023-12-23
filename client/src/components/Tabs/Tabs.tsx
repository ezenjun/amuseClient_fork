import React from "react";
import { TabsContainer } from "./styles";
import Tab from "./Tab";

interface TabsProps {
	gap: number;
	tabList: string[];
	activeTab: string;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
	width?: number | string;
	wrap?: boolean;
}

const Tabs = ({
	gap,
	tabList,
	activeTab,
	setActiveTab,
	width,
	wrap,
}: TabsProps) => {
	return (
		<TabsContainer gap={gap} wrap={wrap}>
			{tabList.map((tab) => {
				return (
					<Tab
						isActive={tab.includes(activeTab)}
						onClick={() => setActiveTab(tab)}
						width={width}
					>
						<span>{tab}</span>
					</Tab>
				);
			})}
		</TabsContainer>
	);
};

export default Tabs;
