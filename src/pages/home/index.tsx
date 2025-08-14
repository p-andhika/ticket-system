import { useState, type FormEvent } from "react";
import { format, differenceInDays, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { holidaysQueryOption } from "@/libs/redaxios/queryOptions/holidays";
import { historiesQueryOption } from "@/libs/supabase/queryOptions/histories";
import type { Result } from "@/types";
import supabase from "@/libs/supabase/supabase-client";
import { Button } from "@/components/ui/button";
import { SelectNative } from "@/components/ui/select-native";

function Home() {
  const { data: holidays, isFetching: isFetchingHolidays } =
    useQuery(holidaysQueryOption);
  const {
    data: histories,
    isFetching: isFetchingHistories,
    refetch: refetchHistory,
  } = useQuery(historiesQueryOption);

  console.log({ holidays, histories });

  const [selectedHoliday, setSelectedHoliday] = useState("");
  const [result, setResult] = useState<Result | null>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedHoliday) return;

    const holiday = holidays?.find((h) => h.date === selectedHoliday);
    if (!holiday) return;

    const today = new Date();
    const holidayDate = parseISO(holiday.date);
    const daysUntil = differenceInDays(holidayDate, today);

    setResult({
      name: holiday.name,
      date: holiday.date,
      daysUntil,
    });

    try {
      const { error } = await supabase.from("DateCalculation").insert({
        holiday_name: holiday.name,
        holiday_date: holiday.date,
        days_until: daysUntil,
      });

      if (error) throw Error;

      refetchHistory();
    } catch (error) {
      console.error(error);
    }
  };

  const getResultText = (): string => {
    if (!result) return "";

    if (result.daysUntil === 0) {
      return `${result.name} is today!`;
    } else if (result.daysUntil < 0) {
      return `${result.name} was ${Math.abs(result.daysUntil)} days ago.`;
    } else {
      return `There are ${result.daysUntil} days until ${result.name}.`;
    }
  };

  return (
    <div className="py-4">
      <h1 className="mb-4">Days Until Holiday Calculator</h1>

      <div className="mb-4">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 w-2xs">
              <label htmlFor="holidaySelect">Select a Holiday:</label>
              <SelectNative
                id="holidaySelect"
                value={selectedHoliday}
                onChange={(e) => setSelectedHoliday(e.target.value)}
                disabled={isFetchingHolidays}
                required
              >
                <option value="" disabled>
                  Select a holiday
                </option>
                {holidays?.map((holiday) => (
                  <option key={holiday.date} value={holiday.date}>
                    {holiday.name}
                  </option>
                ))}
              </SelectNative>
            </div>
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={isFetchingHistories}
            >
              {isFetchingHistories ? "Loading..." : "Calculate"}
            </Button>
          </form>
        </div>
      </div>

      {result && <div className="alert alert-info mb-4">{getResultText()}</div>}

      <hr className="mb-4" />

      <h2>Calculation History</h2>

      <div>
        {histories?.length === 0 ? (
          <p>No calculations yet.</p>
        ) : (
          <ul>
            {histories?.map((item) => (
              <li key={item.id}>
                <h5 className="mb-1">{item.holiday_name}</h5>
                <p className="mb-1">
                  {format(parseISO(item.holiday_date), "MMMM d, yyyy")} -
                  {item.days_until === 0
                    ? " is today"
                    : item.days_until < 0
                      ? ` was ${Math.abs(item.days_until)} days ago`
                      : ` in ${item.days_until} days`}
                </p>
                <small className="text-muted">
                  Calculated on{" "}
                  {format(new Date(item.created_at), "MMM d, yyyy h:mm a")}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
