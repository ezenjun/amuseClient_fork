import { IProps } from "./Interfaces/PropsInterfaces";
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
};
export default MainComponent;
