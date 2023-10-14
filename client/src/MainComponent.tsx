import Header from "./components/Headers/Header";
import Footer from "./components/Footers/Footer";
import { IProps } from "./Interfaces/PropsInterfaces";

const MainComponent = ({ children }: IProps) => {
	return (
		<div>
			<Header />
			{children}
			{/* <Footer /> */}
		</div>
	);
};
export default MainComponent;
