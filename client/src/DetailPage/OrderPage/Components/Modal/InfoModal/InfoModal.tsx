import React, {
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInfoContext } from "../../../../Contexts/InfoContext";
import styles from "./InfoModal.module.scss";

interface Props {
  setInfoModal: React.Dispatch<SetStateAction<boolean>>;
}

export const InfoModal: React.FC<Props> = ({ setInfoModal }) => {
  const { name, setName, email, setEmail, phone, setPhone } = useInfoContext();
  const [localName, setLocalName] = useState<string>(name || "");
  const [localEmail, setLocalEmail] = useState<string>(email || "");
  const [localPhone, setLocalPhone] = useState<string>(phone || "");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    console.log("imporModal");
    e.preventDefault();
    setName(localName);
    setEmail(localEmail);
    setPhone(localPhone);
    setInfoModal(false);
    document.body.style.overflow = "scroll";
  };

  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      const target = event.target as HTMLInputElement;
      if (modalRef.current && !modalRef.current.contains(target)) {
        setInfoModal(false);
        document.body.style.overflow = "scroll";
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="modal">
      <div className={styles.modalContent}>
        <form
          className={styles.container}
          ref={modalRef}
          id="userInfo"
          onSubmit={(e) => {
            console.log("infoModal");
            e.preventDefault();
          }}
        >
          <ul className={styles.info}>
            <li>
              <span>예약자 이름</span>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
              ></input>
            </li>
            <li>
              <span>이메일 주소</span>
              <input
                type="email"
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
              ></input>
            </li>
            <li>
              <span>휴대폰 번호</span>
              <input
                type="text"
                placeholder=" -를 제외하고 입력해주세요. "
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
              ></input>
            </li>
          </ul>
          <button type="submit" form="userInfo">
            close
          </button>
        </form>
      </div>
    </div>
  );
};
