import supabase from "../supabase-client";

export type History = {
  id: number;
  holiday_name: string;
  holiday_date: string;
  days_until: number;
  created_at: string;
};

export const queryHistories = async (): Promise<Array<History>> => {
  console.info("Query histories");

  try {
    const { data: histories, error } = await supabase
      .from("DateCalculation")
      .select("*");

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Error while getting list of history!");
    }

    if (!histories || histories.length === 0) {
      return [];
    }

    return histories;
  } catch (error) {
    console.error("Error query history list", error);
    throw new Error("Failed to get history list");
  }
};
