import { format, isSameDay, parseISO, parse } from "date-fns";
import { DateRange } from "react-day-picker";
import { TicketData } from "../../../../../../../interfaces/DataInterfaces";

// date format change
function getSelectedPriceIndex(
  ticket: TicketData,
  range: DateRange | undefined
): number {
  return ticket.priceList.findIndex((priceItem) => {
    function getMonthNumber(monthString: string) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months.findIndex((month) => month === monthString);
    }
    const parts = priceItem.startDate.split(" ");
    const month = getMonthNumber(parts[1]);
    const day = parseInt(parts[2]);
    const year = parseInt(parts[5]);
    const date = new Date(year, month, day);

    const formattedDate = format(date, "yyyy-MM-dd");
    return range?.from && isSameDay(parseISO(formattedDate), range.from);
  });
}

export default getSelectedPriceIndex;
