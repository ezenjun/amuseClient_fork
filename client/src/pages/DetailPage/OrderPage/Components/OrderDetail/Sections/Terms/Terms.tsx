import { useEffect, useState } from "react";
import { TermsModal } from "../../../Modal/TermsModal";
import { TermsBox, TermsContainer, TermsRight, TermsRow } from "./styles";
import { SubHeader } from "../../../../styles";
import CheckButton from "../../../../../../../components/Button/CheckButton";
import { Regular16DarkGray } from "../../../../../../../components/Text/Text";
import RightArrow from "../../../../../../../components/RightArrow";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../../../../Recoil/OrderAtomState";
import { Term } from "../../../../../../../Interfaces/DataInterfaces";
import { ReactComponent as ArrowDown } from "../../../../../../../assets/Icons/Arrow/arrow_down_24.svg";
import { ReactComponent as ArrowUp } from "../../../../../../../assets/Icons/Arrow/arrow_up_24.svg";

export const Terms = () => {
	const [showTerms, setShowTerms] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [termsList, setTermsList] = useState<Term[]>([]);
	const [termChecked, setTermChecked] = useState<boolean[]>([
		false,
		false,
		false,
		false,
	]);
	const paymentData = useRecoilValue(PaymentDataState);

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

	const onClickShowMore = (termName: string) => {
		alert(termName);
	};

	return (
		<TermsContainer>
			<TermsRight>
				<SubHeader>약관 안내</SubHeader>
				{showTerms ? (
					<ArrowDown
						onClick={() => setShowTerms(!showTerms)}
					></ArrowDown>
				) : (
					<ArrowUp onClick={() => setShowTerms(!showTerms)}></ArrowUp>
				)}
			</TermsRight>
			{showTerms && (
				<>
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
				</>
			)}

			{showModal && <TermsModal setShowModal={setShowModal} />}
		</TermsContainer>
	);
};
