import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
