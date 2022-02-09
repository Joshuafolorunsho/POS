import dayjs from "dayjs";

export const lastMonth = dayjs().subtract(1, "month");
export const today = dayjs();