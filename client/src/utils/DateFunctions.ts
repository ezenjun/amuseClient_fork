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

	return `${year}년 ${month}월 ${day}일(${dayOfWeek})`;
};
