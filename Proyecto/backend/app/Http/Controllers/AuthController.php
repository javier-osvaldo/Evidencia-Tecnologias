<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Registro de nuevo usuario
public function register(Request $request)
{
    $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email|unique:users',
        'password' => 'required|min:6',
    ]);

    $user = User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // Crear perfil de paciente automáticamente
    $user->patient()->create([
        'fecha_nacimiento' => '2000-01-01',
        'sexo'             => 'M',
        'tipo_sangre'      => null,
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'mensaje' => 'Registro exitoso',
        'token'   => $token,
        'user'    => $user,
    ], 201);
}
    // Inicio de sesión
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'mensaje' => 'Credenciales incorrectas',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'mensaje' => 'Inicio de sesión exitoso',
            'token'   => $token,
            'user'    => $user,
        ]);
    }

    // Cerrar sesión
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'mensaje' => 'Sesión cerrada',
        ]);
    }

    // Obtener usuario autenticado
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}