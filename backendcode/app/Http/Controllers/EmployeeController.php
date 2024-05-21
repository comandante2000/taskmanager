<?php

namespace App\Http\Controllers;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function getEmployees()
    {
        // Fetch all employees
        $employees = Employee::all();
        
        // Return the data as a JSON response
        return response()->json($employees);
    }
}
