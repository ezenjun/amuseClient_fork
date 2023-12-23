import { useEffect, useState } from "react";
import { TermsModal } from "../../../Modal/TermsModal";
import { TermsBox, TermsContainer, TermsRight, TermsRow } from "./styles";
import { SubHeader } from "../../../../styles";
import CheckButton from "../../../../../../../components/Button/CheckButton";
import { Regular16DarkGray } from "../../../../../../../components/Text/Text";
import RightArrow from "../../../../../../../components/RightArrow";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../../../../Recoil/OrderAtomState";
import { Term } from "../../../../../../../Interfaces/DataInterfaces";
import { ReactComponent as ArrowDown } from "../../../../../../../assets/Icons/Arrow/arrow_down_24.svg";
import { ReactComponent as ArrowUp } from "../../../../../../../assets/Icons/Arrow/arrow_up_24.svg";

export const Terms = () => {
	const [showTerms, setShowTerms] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [termsList, setTermsList] = useState<Term[]>([]);
	const [paymentData, setPaymentData] = useRecoilState(PaymentDataState);
	const [selectedTerm, setSelectedTerm] = useState<Term>();

	const handleTermCheckboxChange = (index: number) => {
		switch (index) {
			case 0:
				setPaymentData((prevData) => ({
					...prevData,
					termsAgreement: {
						...prevData.termsAgreement,
						privacyCollection:
							!prevData.termsAgreement.privacyCollection,
					},
				}));
				break;
			case 1:
				setPaymentData((prevData) => ({
					...prevData,
					termsAgreement: {
						...prevData.termsAgreement,
						privacyToThirdParty:
							!prevData.termsAgreement.privacyToThirdParty,
					},
				}));
				break;
			case 2:
				setPaymentData((prevData) => ({
					...prevData,
					termsAgreement: {
						...prevData.termsAgreement,
						ageOver14: !prevData.termsAgreement.ageOver14,
					},
				}));
				break;
			case 3:
				setPaymentData((prevData) => ({
					...prevData,
					termsAgreement: {
						...prevData.termsAgreement,
						stayRule: !prevData.termsAgreement.stayRule,
					},
				}));
				break;
		}
	};
	const handleAgreeAll = () => {
		const allTermsAgreed = Object.values(paymentData.termsAgreement).every(
			(term) => term
		);

		if (allTermsAgreed) {
			// If all terms are already agreed, set all of them to false
			const updatedTermsAgreement = {
				privacyCollection: false,
				privacyToThirdParty: false,
				ageOver14: false,
				stayRule: false,
			};

			setPaymentData((prevData) => ({
				...prevData,
				termsAgreement: updatedTermsAgreement,
			}));
		} else {
			// If not all terms are agreed, set all of them to true
			const updatedTermsAgreement = {
				privacyCollection: true,
				privacyToThirdParty: true,
				ageOver14: true,
				stayRule: true,
			};

			setPaymentData((prevData) => ({
				...prevData,
				termsAgreement: updatedTermsAgreement,
			}));
		}
	};

	const [cookies] = useCookies(["__jwtkid__"]);
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

	const onClickShowMore = (term: Term) => {
		setShowModal(true);
		setSelectedTerm(term);
	};

	return (
		<TermsContainer>
			<TermsRight>
				<SubHeader>약관 안내</SubHeader>
				{showTerms ? (
					<ArrowDown
						onClick={() => setShowTerms(!showTerms)}
						style={{ cursor: "pointer" }}
					></ArrowDown>
				) : (
					<ArrowUp
						onClick={() => setShowTerms(!showTerms)}
						style={{ cursor: "pointer" }}
					></ArrowUp>
				)}
			</TermsRight>
			{showTerms && (
				<>
					<TermsRow>
						<CheckButton
							isActive={Object.values(
								paymentData.termsAgreement
							).every((term) => term)}
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
										isActive={
											Object.values(
												paymentData.termsAgreement
											)[index]
										}
										onClick={() =>
											handleTermCheckboxChange(index)
										}
									></CheckButton>
									<TermsRight>
										<Regular16DarkGray
											onClick={() =>
												handleTermCheckboxChange(index)
											}
										>
											{term.title}
											{term.mandatory && " (필수)"}
										</Regular16DarkGray>
										<RightArrow
											onClick={() =>
												onClickShowMore(term)
											}
										></RightArrow>
									</TermsRight>
								</TermsRow>
							))}
					</TermsBox>
				</>
			)}

			{showModal && (
				<TermsModal
					setShowModal={setShowModal}
					title={selectedTerm?.title}
					content={selectedTerm?.content}
				/>
			)}
		</TermsContainer>
	);
};
