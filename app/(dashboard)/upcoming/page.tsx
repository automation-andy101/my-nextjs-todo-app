import UpcomingClient from '@/components/upcoming-client';
import { getUpcomingTodos, getUpcomingTodosBetweenDays } from '@/lib/actions/todo';

type PageProps = {
  searchParams?: {
    start?: string;
  }
}
export default async function Page({ searchParams }: PageProps) {

  const startParam  = searchParams?.start;

  function getStartOfWeek(date: Date) {
    const d = new Date(date);
    const day = d.getDay(); // Sunday = 0
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);

    return d;
  }

  const baseDate = startParam
    ? new Date(startParam + "T00:00:00")
    : new Date();

  const startDate = getStartOfWeek(baseDate);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  const todos = await getUpcomingTodosBetweenDays(startDate, endDate);

  return <UpcomingClient groupedTodos={todos} />;


}
