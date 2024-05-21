<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
    
        // Check if the user is the admin
        if ($credentials['username'] === 'admin' && $credentials['password'] === 'admin') {
            // Authentication successful
            return response()->json(['message' => 'Login successful'], 200);
        }
        // Check if the user exists by email or username
        $user = User::where('email', $credentials['username'])
                    ->orWhere('username', $credentials['username'])
                    ->first();
    
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            // Authentication failed
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        // Authentication successful for regular user
        return response()->json(['message' => 'Login successful'], 200);
    }

    public function register(Request $request)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'email' => 'required|email|unique:users',
            'username' => 'required|unique:users',
            'password' => 'required|min:6',
        ]);

        // Create new user
        $user = new User();
        $user->email = $request->email;
        $user->username = $request->username;
        $user->password = Hash::make($request->password); // Hash password
        // Add more fields as needed for registration

        // Save user to database
        $user->save();

        // Return success response
        return response()->json(['message' => 'Registration successful'], 200);
    }
}


