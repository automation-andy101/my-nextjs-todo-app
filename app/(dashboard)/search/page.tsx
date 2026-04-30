import { searchTodos } from "@/lib/actions/todo";
import { isToday, formatDate } from "@/lib/utils/date";
import { Fragment, useState, useTransition } from "react";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPending, startTransition] = useTransition();
  const [selectedAddDate, setSelectedAddDate] = useState<Date | null>(null);
  
  const params = await searchParams;
  const query = params.query || "";

  const todos = query ? await searchTodos(query) : [];

  const handleDetailsOpen = (todo: any) => {
      setSelectedTodo(todo);
      requestAnimationFrame(() => {
          setIsDetailsOpen(true);
      });
  };

  return (
    <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">
            Results for "{query}"
        </h1>

        {/* Date */}
          <div className="mb-6 mt-6">

              {/* Tasks list */}
              <div className="space-y-3">
                  {Object.entries(todos)
                      .filter(([date]) => !isToday(date))
                      .map(([date, todos]) => (
                          <Fragment key={date}>
                              <div key={date} className="mb-4">
                                  {/* Date heading */}
                                  <h2 className="text-xl font-semibold text-black mb-2">
                                      {formatDate(date)}
                                  </h2>
                                  
                                  {/* Divider line */}
                                  <div className="border-b-2 border-black mt-2 mb-6 w-[140%]"></div> 

                                  <div className="space-y-3">
                                      {todos.map((todo: any) => (
                                          <div
                                              key={todo._id}
                                              onClick={() => handleDetailsOpen(todo)}
                                              className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 rounded px-2 py-1"
                                          >
                                              <div
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleToggleComplete(todo);
                                                  }}
                                                  className={`w-6 h-6 flex items-center justify-center ${
                                                      isPending ? "opacity-50 pointer-events-none" : "cursor-pointer"
                                                  }`}
                                              >
                                                  {todo.completed ? (
                                                      <CircleCheck className="w-6 h-6 text-green-500" />
                                                      ) : (
                                                      <Circle className="w-6 h-6 text-gray-400 group-hover:scale-110" />
                                                      )
                                                  }
                                              </div>

                                              <p
                                                  className={`transition-all duration-300 ${
                                                  todo.completed
                                                      ? "line-through text-gray-400"
                                                      : "text-gray-700"
                                                  }`}
                                              >
                                                  {todo.title}
                                              </p>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                              <Button 
                                  variant="ghost"
                                  onClick={() => {
                                      setSelectedAddDate(new Date(date));
                                      setIsAddTaskOpen(true);
                                  }}
                                  className="text-red-500 font-semibold justify-start w-full cursor-pointer mb-8"    
                              >
                                  <CirclePlus size={18} />
                                  <span>Add task</span>
                              </Button>
                          </Fragment>
                  ))} 
              </div>
          </div>
        </div>
    </div>
  );
}

