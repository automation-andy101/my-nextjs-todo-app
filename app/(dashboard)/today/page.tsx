import { getTodaysTodos } from '@/lib/actions/todo';
import TodayClient from '@/components/today-client';

export default async function Page() {
  
  const todos = await getTodaysTodos();

  return (
    <TodayClient todos={todos} />
  );
}
