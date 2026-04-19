import UpcomingClient from '@/components/upcoming-client';
import { getUpcomingTodos } from '@/lib/actions/todo';

export default async function Page() {
  
  const todos = await getUpcomingTodos();

  return (
    <UpcomingClient groupedTodos={todos} />
  );
}
