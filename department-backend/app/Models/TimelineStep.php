<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TimelineStep extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'label',
        'status',
        'timestamp_label',
        'sort_order',
    ];

    /**
     * Get the student that owns the timeline step.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
