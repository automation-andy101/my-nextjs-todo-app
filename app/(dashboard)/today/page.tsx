"use client"

import { useEffect, useState } from 'react';
import { CircleCheck, Circle } from 'lucide-react';

const page = () => {
  const [tasks, setTasks] = useState([
    { text: "Go to gym", completed: false },
    { text: "Finish report", completed: false },
    { text: "Call client", completed: false }
  ]);

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // useEffect(() => {
    
  // }, [])

  return (
    <div className="min-h-screen bg-white mt-6">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Today</h1>

          <div className="flex flex-row items-center gap-2 mt-4">
            <CircleCheck className="w-4 h-4 text-gray-600" />
            <p className="text-gray-600">{tasks.length} tasks</p>
          </div>
        </div>

        {/* Date */}
        <div className="mb-6 mt-10">
          <h2 className="text-xl font-semibold text-black">
            {today}
          </h2>

          {/* Divider line */}
          <div className="border-b-2 border-black mt-2 mb-6 w-[280%]"></div>

          {/* Tasks list */}
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div
                key={index}
                onClick={() => toggleTask(index)}
                className="flex items-center gap-3 cursor-pointer group"
              >

                {/* Animated Circle */}
                <div className="w-6 h-6 flex items-center justify-center">
                  {task.completed ? (
                    <CircleCheck className="w-6 h-6 text-green-500 transition-all duration-300 scale-100" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:scale-110" />
                  )}
                </div>

                {/* Task text */}
                <p
                  className={`transition-all duration-300 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {task.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page