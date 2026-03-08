<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = ['nombre', 'especialidad', 'horario_inicio', 'horario_fin'];

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}