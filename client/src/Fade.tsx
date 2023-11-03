import React from "react";
import { Transition } from "react-transition-group";
import { IProps } from "./Interfaces/PropsInterfaces";

const duration = 200;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: { [key: string]: any } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Fade = ({ children }: IProps) => {
  const [inProp, setInProp] = React.useState(false);

  React.useEffect(() => {
    setInProp(true);
    return () => setInProp(false);
  }, []);

  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export default Fade;
