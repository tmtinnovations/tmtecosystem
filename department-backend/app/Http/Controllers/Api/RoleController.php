<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DiscordRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    /**
     * Get all discord roles
     */
    public function index()
    {
        $roles = DiscordRole::orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $roles
        ]);
    }

    /**
     * Store a new role
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:discord_roles,name',
            'discord_id' => 'required|string|unique:discord_roles,discord_id',
            'color' => 'nullable|string|max:7',
            'description' => 'nullable|string'
        ]);

        $role = DiscordRole::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Role created successfully',
            'data' => $role
        ], 201);
    }

    /**
     * Update a role
     */
    public function update(Request $request, $id)
    {
        $role = DiscordRole::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:discord_roles,name,' . $id,
            'discord_id' => 'sometimes|string|unique:discord_roles,discord_id,' . $id,
            'color' => 'nullable|string|max:7',
            'description' => 'nullable|string'
        ]);

        $role->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'data' => $role
        ]);
    }

    /**
     * Delete a role
     */
    public function destroy($id)
    {
        $role = DiscordRole::findOrFail($id);
        $role->delete();

        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully'
        ]);
    }

    /**
     * Get all users
     */
    public function getUsers()
    {
        $users = User::all();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    /**
     * Update user role
     */
    public function updateUserRole(Request $request, $userId)
    {
        $validated = $request->validate([
            'role' => 'required|string|in:admin,moderator,user'
        ]);

        $user = User::findOrFail($userId);
        $user->role = $validated['role'];
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User role updated successfully',
            'data' => $user
        ]);
    }
}
