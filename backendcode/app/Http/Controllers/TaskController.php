<?php
namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'taskName' => 'required',
            'details' => 'required',
            'assignedTo' => 'required|array',
        ]);
        $assignedTo = json_encode($request->input('assignedTo'));
        $task = Task::create([
            'taskName' => $request->input('taskName'),
            'details' => $request->input('details'),
            'assignedTo' => $assignedTo,
        ]);

        return response()->json(['message' => 'Task added successfully', 'task' => $task], 201);
    }

    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'taskName' => 'required',
            'details' => 'required',
            'assignedTo' => 'required|array', // Ensure assignedTo is an array
        ]);

  
        $assignedTo = json_encode($request->input('assignedTo'));

        $task = Task::findOrFail($id);
        $task->update([
            'taskName' => $request->input('taskName'),
            'details' => $request->input('details'),
            'assignedTo' => $assignedTo,
        ]);

        return response()->json(['message' => 'Task updated successfully', 'task' => $task]);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
