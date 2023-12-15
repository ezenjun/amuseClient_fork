import React, { useEffect, useState } from "react";

import EachUnwrittenReviewWeb from "./EachUnwrittenReviewWeb";
import EachUnwrittenReviewTablet from "./EachUnwrittenReviewTablet";
import EachUnwrittenReviewMobile from "./EachUnwrittenReviewMobile";
import { ReviewData, WrittenReview } from "../../../../../../Types/DataTypes";

type Props = {
	data: ReviewData;
};

const EachUnwrittenReview = ({ data }: Props) => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		window.removeEventListener("resize", handleResize);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [window.innerWidth, screenWidth]);

	if (screenWidth > 1024) {
		return <EachUnwrittenReviewWeb data={data} />;
	} else if (screenWidth <= 1024 && screenWidth > 768) {
		return <EachUnwrittenReviewTablet data={data} />;
	} else {
		return <EachUnwrittenReviewMobile data={data} />;
	}
};

export default EachUnwrittenReview;
