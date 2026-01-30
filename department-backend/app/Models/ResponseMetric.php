<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResponseMetric extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'value',
        'trend',
        'delta',
        'is_time',
        'recorded_date',
    ];

    protected $casts = [
        'is_time' => 'boolean',
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
     * Scope for improved metrics.
     */
    public function scopeImproved($query)
    {
        return $query->where('trend', 'improved');
    }

    /**
     * Scope for dropped metrics.
     */
    public function scopeDropped($query)
    {
        return $query->where('trend', 'dropped');
    }

    /**
     * Scope for filtering by date range.
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('recorded_date', [$startDate, $endDate]);
    }

    /**
     * Get the latest record for each label.
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('recorded_date', 'desc');
    }
}
