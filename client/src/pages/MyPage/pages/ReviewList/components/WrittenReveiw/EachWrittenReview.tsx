import React, { useEffect, useState } from "react";

import { ReviewData } from "../../../../../../Types/DataTypes";
import EachWrittenReviewWeb from "./EachWrittenReviewWeb";
import EachWrittenReviewMobile from "./EachWrittenReviewMobile";

type Props = {
	data: ReviewData;
};

const EachWrittenReview = ({ data }: Props) => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		window.removeEventListener("resize", handleResize);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [window.innerWidth, screenWidth]);

	if (screenWidth > 768) {
		return <EachWrittenReviewWeb data={data} />;
	} else {
		return <EachWrittenReviewMobile data={data} />;
	}
};

export default EachWrittenReview;
