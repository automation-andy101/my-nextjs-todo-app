import UpcomingClient from '@/components/upcoming-client';
import { getUpcomingTodos, getUpcomingTodosBetweenDays } from '@/lib/actions/todo';

type PageProps = {
  searchParams: Promise<{
    start?: string;
  }>;
}
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const startParam = params.start;
  console.log("Andy - " + startParam);

  function getStartOfWeek(date: Date) {
    console.log("Andy 1 - " + date);
    const d = new Date(date);
    const day = d.getDay(); // Sunday = 0
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);

    console.log("Andy 2 - " + d);

    return d;
  }

  const baseDate = startParam
    ? new Date(startParam + "T00:00:00")
    : new Date();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDate = getStartOfWeek(baseDate);

  const isCurrentWeek =
    today >= startDate &&
    today <= new Date(startDate.getTime() + 6 * 86400000);

  if (isCurrentWeek) {
    startDate = today;
    startDate.setDate(startDate.getDate() + 1);
  }

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  const todos = await getUpcomingTodosBetweenDays(startDate, endDate);

  return <UpcomingClient groupedTodos={todos} />;

}
