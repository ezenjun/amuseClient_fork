import { IProps } from "./Interfaces/PropsInterfaces";
<<<<<<< HEAD
import styled from "@emotion/styled";

const MainComponent = ({ children }: IProps) => {
	return (
		<MainComponentStyle>
			<Header />
			{children}
			{/* <Footer /> */}
		</MainComponentStyle>
	);
=======
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";

const MainComponent = ({ children }: IProps) => {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
>>>>>>> 2666ef4109603ae999c3b1d82a4081e3ffb3df48
};
export default MainComponent;

export const MainComponentStyle = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;
