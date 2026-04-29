import { searchTodos } from "@/lib/actions/todo";

export default async function SearchPage({
  searchParams
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query || "";

  const todos = query ? await searchTodos(query) : [];

  return (
    <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">
            Results for "{query}"
        </h1>

        <div className="space-y-2">
            {todos.map((todo: any) => (
                <div key={todo._id}>
                    {todo.title}
                </div>
            ))}
        </div>
    </div>
  );
}

