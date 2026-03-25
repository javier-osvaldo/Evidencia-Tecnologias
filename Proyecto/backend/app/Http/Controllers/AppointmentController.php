<?php

namespace App\Http\Controllers;
//Modelos que importara el controlador
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // Horarios disponibles por doctor y fecha
    public function horarios(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'fecha'     => 'required|date|after_or_equal:today',
        ]);

        // Todos los horarios del día 08:00 a 18:00 cada hora
        $todos = [];
        for ($h = 8; $h <= 18; $h++) {
            $todos[] = sprintf('%02d:00', $h);
        }

        // Horarios ya ocupados ese día con ese doctor
        $ocupados = Appointment::where('doctor_id', $request->doctor_id)
            ->where('fecha', $request->fecha)
            ->whereIn('estado', ['pendiente', 'atendida'])
            ->pluck('hora')
            ->map(fn($h) => substr($h, 0, 5))
            ->toArray();

        // Construir lista con disponibilidad
        $horarios = array_map(fn($h) => [
            'hora'       => $h,
            'disponible' => !in_array($h, $ocupados),
        ], $todos);

        return response()->json($horarios);
    }

    // Crear una cita
    public function store(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'fecha'     => 'required|date|after_or_equal:today',
            'hora'      => 'required',
            'motivo'    => 'nullable|string|max:255',
        ]);

        // Verificar que el horario sigue disponible
        $ocupado = Appointment::where('doctor_id', $request->doctor_id)
            ->where('fecha', $request->fecha)
            ->where('hora', $request->hora)
            ->whereIn('estado', ['pendiente', 'atendida'])
            ->exists();

        if ($ocupado) {
            return response()->json([
                'mensaje' => 'Ese horario ya no está disponible',
            ], 409);
        }

        // Obtener o crear el paciente ligado al usuario
        $paciente = $request->user()->patient;

        if (!$paciente) {
            return response()->json([
                'mensaje' => 'El usuario no tiene perfil de paciente',
            ], 422);
        }

        $cita = Appointment::create([
            'patient_id' => $paciente->id,
            'doctor_id'  => $request->doctor_id,
            'fecha'      => $request->fecha,
            'hora'       => $request->hora,
            'estado'     => 'pendiente',
            'motivo'     => $request->motivo,
        ]);

        return response()->json([
            'mensaje' => 'Cita agendada exitosamente',
            'cita'    => $cita,
        ], 201);
    }

    // Ver citas del paciente autenticado
    public function misCitas(Request $request)
    {
        $paciente = $request->user()->patient;

        if (!$paciente) {
            return response()->json(['citas' => []]);
        }

        $citas = Appointment::with('doctor')
            ->where('patient_id', $paciente->id)
            ->orderBy('fecha')
            ->orderBy('hora')
            ->get();

        return response()->json(['citas' => $citas]);
    }

    // Cancelar cita (paciente)
    public function cancelar(Request $request, $id)
    {
        $paciente = $request->user()->patient;
        $cita = Appointment::where('id', $id)
            ->where('patient_id', $paciente->id)
            ->where('estado', 'pendiente')
            ->firstOrFail();

        $cita->update(['estado' => 'cancelada']);

        return response()->json(['mensaje' => 'Cita cancelada']);
    }

    // Ver todas las citas (solo doctor/admin)
    public function todasLasCitas(Request $request)
    {
        if ($request->user()->role !== 'doctor') {
            return response()->json(['mensaje' => 'No autorizado'], 403);
        }

        $citas = Appointment::with(['patient.user', 'doctor'])
            ->orderBy('fecha')
            ->orderBy('hora')
            ->get();

        return response()->json(['citas' => $citas]);
    }

    // Cambiar estado de cita (solo doctor/admin)
    public function cambiarEstado(Request $request, $id)
    {
        if ($request->user()->role !== 'doctor') {
            return response()->json(['mensaje' => 'No autorizado'], 403);
        }

        $request->validate([
            'estado' => 'required|in:pendiente,atendida,cancelada',
        ]);

        $cita = Appointment::findOrFail($id);
        $cita->update(['estado' => $request->estado]);

        return response()->json(['mensaje' => 'Estado actualizado', 'cita' => $cita]);
    }
}