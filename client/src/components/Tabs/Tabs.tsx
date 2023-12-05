import React from "react";
import { TabsContainer } from "./styles";
import Tab from "./Tab";

interface TabsProps {
	gap: number;
	tabList: string[];
	activeTab: string;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs = ({ gap, tabList, activeTab, setActiveTab }: TabsProps) => {
	return (
		<TabsContainer gap={gap}>
			{tabList.map((tab) => {
				return (
					<Tab
						isActive={activeTab === tab}
						onClick={() => setActiveTab(tab)}
					>
						<span>{tab}</span>
					</Tab>
				);
			})}
		</TabsContainer>
	);
};

export default Tabs;
