import axios from "redaxios";

export type Holiday = {
  date: string;
  name: string;
};

export const fetchHolidays = async (): Promise<Array<Holiday>> => {
  console.info("Fetching posts");

  try {
    const response = await axios.get<Array<Holiday>>(
      "https://date.nager.at/api/v3/publicholidays/2025/US",
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw new Error("Failed to fetch holidays!");
  }
};
