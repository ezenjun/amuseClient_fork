import Header from "./components/Headers/Header";
import Footer from "./components/Footers/Footer";
import { IProps } from "./Interfaces/PropsInterfaces";
import styled from "@emotion/styled";

const MainComponent = ({ children }: IProps) => {
	return (
		<MainComponentStyle>
			<Header />
			{children}
			{/* <Footer /> */}
		</MainComponentStyle>
	);
};
export default MainComponent;

export const MainComponentStyle = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;
