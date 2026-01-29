<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'name',
        'email',
        'discord_handle',
        'program_id',
        'payment_status',
        'onboarding_status',
        'discord_role_assigned',
        'joined_date',
        'due_date',
        'last_reminder_sent',
    ];

    protected $casts = [
        'discord_role_assigned' => 'boolean',
        'joined_date' => 'date',
        'due_date' => 'date',
        'last_reminder_sent' => 'datetime',
    ];

    /**
     * Boot function to auto-generate UUID.
     */
    protected static function booted(): void
    {
        static::creating(function (Student $student) {
            if (empty($student->uuid)) {
                $student->uuid = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the program the student is enrolled in.
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Get the timeline steps for the student.
     */
    public function timelineSteps(): HasMany
    {
        return $this->hasMany(TimelineStep::class)->orderBy('sort_order');
    }

    /**
     * Get all transactions for the student.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Get the discord role assignment for the student.
     */
    public function discordRole(): HasOne
    {
        return $this->hasOne(DiscordRole::class);
    }

    /**
     * Scope for filtering by payment status.
     */
    public function scopeByPaymentStatus($query, string $status)
    {
        return $query->where('payment_status', $status);
    }

    /**
     * Scope for filtering by onboarding status.
     */
    public function scopeByOnboardingStatus($query, string $status)
    {
        return $query->where('onboarding_status', $status);
    }

    /**
     * Scope for students with overdue payments.
     */
    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now()->toDateString());
    }

    /**
     * Scope for students with payments due soon (within days).
     */
    public function scopeDueSoon($query, int $days = 7)
    {
        return $query->whereBetween('due_date', [now()->toDateString(), now()->addDays($days)->toDateString()]);
    }

    /**
     * Check if student payment is overdue.
     */
    public function isOverdue(): bool
    {
        return $this->due_date < now()->toDateString();
    }

    /**
     * Check if student payment is due soon.
     */
    public function isDueSoon(int $days = 7): bool
    {
        return $this->due_date >= now()->toDateString() 
            && $this->due_date <= now()->addDays($days)->toDateString();
    }
}
