<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageVolume extends Model
{
    use HasFactory;

    protected $fillable = [
        'today_count',
        'week_count',
        'trend',
        'is_peak_season',
        'recorded_date',
    ];

    protected $casts = [
        'today_count' => 'integer',
        'week_count' => 'integer',
        'is_peak_season' => 'boolean',
        'recorded_date' => 'date',
    ];

    /**
     * Scope for filtering by trend.
     */
    public function scopeByTrend($query, string $trend)
    {
        return $query->where('trend', $trend);
    }

    /**
     * Scope for peak season records.
     */
    public function scopePeakSeason($query)
    {
        return $query->where('is_peak_season', true);
    }

    /**
     * Scope for filtering by date range.
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('recorded_date', [$startDate, $endDate]);
    }

    /**
     * Get the latest record.
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('recorded_date', 'desc');
    }
}
