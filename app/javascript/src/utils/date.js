import dayjs from "dayjs";

export const monthDateFormatter = date => dayjs(date).format("MMM D, YYYY");
