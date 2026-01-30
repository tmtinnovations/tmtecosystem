<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SystemLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'level',
        'module',
        'message',
        'context',
        'ip_address',
        'user_id',
        'student_id',
    ];

    protected $casts = [
        'context' => 'array',
    ];

    /**
     * Get the user associated with this log.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the student associated with this log.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Scope for filtering by level.
     */
    public function scopeByLevel($query, string $level)
    {
        return $query->where('level', $level);
    }

    /**
     * Scope for filtering by module.
     */
    public function scopeByModule($query, string $module)
    {
        return $query->where('module', $module);
    }

    /**
     * Scope for errors only.
     */
    public function scopeErrors($query)
    {
        return $query->where('level', 'ERROR');
    }

    /**
     * Scope for warnings only.
     */
    public function scopeWarnings($query)
    {
        return $query->where('level', 'WARNING');
    }
}
