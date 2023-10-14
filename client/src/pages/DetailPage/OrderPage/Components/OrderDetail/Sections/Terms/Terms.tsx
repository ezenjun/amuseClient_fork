import { useEffect, useState } from "react";
import { CommonHeader } from "../../../CommonHeader";
import { TermsModal } from "../../../Modal/TermsModal";
import styles from "./Terms.module.scss";
import { TermsProps } from "../../../../../../../Interfaces/PropsInterfaces";
import { TermsBox, TermsContainer, TermsRight, TermsRow } from "./styles";
import { SubHeader } from "../../../../styles";
import CheckButton from "../../../../../../../components/Button/CheckButton";
import { Regular16DarkGray } from "../../../../../../../components/Text/Text";
import RightArrow from "../../../../../../../components/RightArrow";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../../../../Recoil/OrderAtomState";
import {
	Term,
	TermsInterface,
} from "../../../../../../../Interfaces/DataInterfaces";

export const Terms = () => {
	const [showModal, setShowModal] = useState(false);
	const [termsList, setTermsList] = useState<Term[]>([]);
	const [termChecked, setTermChecked] = useState<boolean[]>([
		false,
		false,
		false,
		false,
	]);
	const paymentData = useRecoilValue(PaymentDataState);
	console.log("termChecked", termChecked);
	const [personalInformation, setPersonalInformation] =
		useState<boolean>(false);
	const [thirdPartyDisclosure, setThirdPartyDisclosure] =
		useState<boolean>(false);
	const [ageQualification, setAgeQualification] = useState<boolean>(false);
	const [cancelRefund, setCancelRefund] = useState<boolean>(false);

	const handleTermCheckboxChange = (index: number) => {
		setTermChecked((prevTermChecked) => {
			const newTermChecked = [...prevTermChecked];
			newTermChecked[index] = !newTermChecked[index];
			return newTermChecked;
		});
	};

	const handleAgreeAll = () => {
		setTermChecked((prevTermChecked) =>
			prevTermChecked.map(() => !prevTermChecked[0])
		);
	};

	const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);
	const getTerms = async () => {
		const token = cookies.__jwtkid__;
		if (token) {
			axios
				.get(
					`${process.env.REACT_APP_AMUSE_API}/test/api/terms-of-service-info-type?type=${paymentData.itemType}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `${token}`,
						},
					}
				)
				.then((response) => {
					const data = response.data.data;
					setTermsList(data.content);
					console.log(data.content);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	useEffect(() => {
		getTerms();
	}, []);

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
					isActive={termChecked.every((term) => term)}
					onClick={handleAgreeAll}
				></CheckButton>
				<Regular16DarkGray onClick={handleAgreeAll}>
					전체 약관 동의
				</Regular16DarkGray>
			</TermsRow>
			<TermsBox>
				{termsList &&
					termsList.map((term, index) => (
						<TermsRow key={term.id}>
							<CheckButton
								isActive={termChecked[index]}
								onClick={() => handleTermCheckboxChange(index)}
							></CheckButton>
							<TermsRight>
								<Regular16DarkGray
									onClick={() =>
										handleTermCheckboxChange(index)
									}
								>
									{term.title}
								</Regular16DarkGray>
								<RightArrow
									onClick={() =>
										onClickShowMore("personalInfo")
									}
								></RightArrow>
							</TermsRight>
						</TermsRow>
					))}
			</TermsBox>
			{showModal && <TermsModal setShowModal={setShowModal} />}
		</TermsContainer>
	);
};
