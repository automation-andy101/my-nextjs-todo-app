import SearchClient from "@/components/search-client";
import { searchTodos } from "@/lib/actions/todo";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ query?: string }>;
}) {

  
  const params = await searchParams;
  const rawQuery = params.query;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery || "";

  const todos = query ? await searchTodos(query) : {};

  return <SearchClient groupedTodos={todos} searchTerm={query} />
}

