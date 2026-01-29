<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DiscordRole extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'discord_user_id',
        'discord_handle',
        'target_role',
        'sync_status',
        'last_sync_at',
        'error_message',
        'retry_count',
    ];

    protected $casts = [
        'last_sync_at' => 'datetime',
        'retry_count' => 'integer',
    ];

    /**
     * Get the student associated with this discord role.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Scope for filtering by sync status.
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('sync_status', $status);
    }

    /**
     * Scope for failed syncs.
     */
    public function scopeFailed($query)
    {
        return $query->where('sync_status', 'Failed');
    }

    /**
     * Scope for pending syncs.
     */
    public function scopePending($query)
    {
        return $query->where('sync_status', 'Pending');
    }
}
