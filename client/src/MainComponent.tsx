import { IProps } from "./Interfaces/PropsInterfaces";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import styled from "@emotion/styled";

const MainComponent = ({ children }: IProps) => {
	return (
		<MainComponentStyle>
			<Header />
			{children}
			<Footer />
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
