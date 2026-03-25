<?php

namespace Database\Seeders;

use App\Models\Doctor;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        Doctor::insert([
            [
                'nombre'         => 'Dr. Juan David tirado',
                'especialidad'   => 'Cardiologo',
                'horario_inicio' => '08:00:00',
                'horario_fin'    => '18:00:00',
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
            [
                'nombre'         => 'Dra. Yanely Sanchez Lopez',
                'especialidad'   => 'Anestesiolodia',
                'horario_inicio' => '08:00:00',
                'horario_fin'    => '18:00:00',
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
            [
                'nombre'         => 'Dr. Javier Osvaldo Losoya Osornio',
                'especialidad'   => 'Pediatría',
                'horario_inicio' => '08:00:00',
                'horario_fin'    => '18:00:00',
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
        ]);
    }
}