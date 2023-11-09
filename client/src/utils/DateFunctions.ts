export const formatDate = (date: Date) => {
	const months = [
		"01",
		"02",
		"03",
		"04",
		"05",
		"06",
		"07",
		"08",
		"09",
		"10",
		"11",
		"12",
	];

	const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

	const year = String(date.getFullYear()).slice(-2);
	const month = months[date.getMonth()];
	const day = String(date.getDate()).padStart(2, "0");
	const dayOfWeek = daysOfWeek[date.getDay()];

	return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};

export const calculateNightStay = (
	startDate: string,
	endDate: string
): string => {
	const start = new Date(startDate);
	const end = new Date(endDate);

	// Calculate the time difference in milliseconds
	const timeDiff = Math.abs(end.getTime() - start.getTime());

	// Convert to days
	const nights = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

	// Calculate remaining days
	const remainingDays = nights % 30; // Assuming a month has 30 days

	return `${nights}박 ${remainingDays}일`;
};
