import { useState } from "react";
import { CommonHeader } from "../../../CommonHeader";
import { TermsModal } from "../../../Modal/TermsModal";
import styles from "./Terms.module.scss";
import { TermsProps } from "../../../../../../Interfaces/PropsInterfaces";
import { TermsBox, TermsContainer, TermsRight, TermsRow } from "./styles";
import { SubHeader } from "../../../../styles";
import CheckButton from "../../../../../../components/Button/CheckButton";
import { Regular16DarkGray } from "../../../../../../components/Text/Text";
import RightArrow from "../../../../../../components/RightArrow";

export const Terms = () => {
	const [showModal, setShowModal] = useState(false);
	const [personalInformation, setPersonalInformation] =
		useState<boolean>(false);
	const [thirdPartyDisclosure, setThirdPartyDisclosure] =
		useState<boolean>(false);
	const [ageQualification, setAgeQualification] = useState<boolean>(false);
	const [cancelRefund, setCancelRefund] = useState<boolean>(false);

	const handleImageClick = () => {
		setShowModal(true);
		document.body.style.overflow = "hidden";
	};

	const onClickAcceptAll = () => {
		if (
			!personalInformation ||
			!thirdPartyDisclosure ||
			!ageQualification ||
			!cancelRefund
		) {
			setPersonalInformation(true);
			setThirdPartyDisclosure(true);
			setAgeQualification(true);
			setCancelRefund(true);
		} else {
			setPersonalInformation(false);
			setThirdPartyDisclosure(false);
			setAgeQualification(false);
			setCancelRefund(false);
		}
	};

	const onClickEachSate = (
		originalState: boolean,
		setState: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		setState(!originalState);
	};

	const onClickShowMore = (termName: string) => {
		alert(termName);
	};

	return (
		<TermsContainer>
			<SubHeader>약관 안내</SubHeader>
			<TermsRow>
				<CheckButton
					isActive={
						personalInformation &&
						thirdPartyDisclosure &&
						ageQualification &&
						cancelRefund
					}
					onClick={onClickAcceptAll}
				></CheckButton>
				<Regular16DarkGray onClick={onClickAcceptAll}>
					전체 약관 동의
				</Regular16DarkGray>
			</TermsRow>
			<TermsBox>
				<TermsRow>
					<CheckButton
						isActive={personalInformation}
						onClick={() =>
							onClickEachSate(
								personalInformation,
								setPersonalInformation
							)
						}
					></CheckButton>
					<TermsRight>
						<Regular16DarkGray
							onClick={() =>
								onClickEachSate(
									personalInformation,
									setPersonalInformation
								)
							}
						>
							개인정보 수집 및 이용동의 (필수)
						</Regular16DarkGray>
						<RightArrow
							onClick={() => onClickShowMore("personalInfo")}
						></RightArrow>
					</TermsRight>
				</TermsRow>
				<TermsRow>
					<CheckButton
						isActive={thirdPartyDisclosure}
						onClick={() =>
							onClickEachSate(
								thirdPartyDisclosure,
								setThirdPartyDisclosure
							)
						}
					></CheckButton>
					<TermsRight>
						<Regular16DarkGray
							onClick={() =>
								onClickEachSate(
									thirdPartyDisclosure,
									setThirdPartyDisclosure
								)
							}
						>
							개인정보 제 3자 제공 (필수)
						</Regular16DarkGray>
						<RightArrow
							onClick={() =>
								onClickShowMore("thirdPartyDisclosure")
							}
						></RightArrow>
					</TermsRight>
				</TermsRow>
				<TermsRow>
					<CheckButton
						isActive={ageQualification}
						onClick={() =>
							onClickEachSate(
								ageQualification,
								setAgeQualification
							)
						}
					></CheckButton>
					<TermsRight>
						<Regular16DarkGray
							onClick={() =>
								onClickEachSate(
									ageQualification,
									setAgeQualification
								)
							}
						>
							만 14세 이상 확인 (필수)
						</Regular16DarkGray>
						<RightArrow
							onClick={() => onClickShowMore("ageQualification")}
						></RightArrow>
					</TermsRight>
				</TermsRow>
				<TermsRow>
					<CheckButton
						isActive={cancelRefund}
						onClick={() =>
							onClickEachSate(cancelRefund, setCancelRefund)
						}
					></CheckButton>
					<TermsRight>
						<Regular16DarkGray
							onClick={() =>
								onClickEachSate(cancelRefund, setCancelRefund)
							}
						>
							숙소 이용규칙 <br />및 취소/환불 규정 (필수)
						</Regular16DarkGray>
						<RightArrow
							onClick={() => onClickShowMore("cancelRefund")}
						></RightArrow>
					</TermsRight>
				</TermsRow>
			</TermsBox>
			{showModal && <TermsModal setShowModal={setShowModal} />}
		</TermsContainer>
	);
};
