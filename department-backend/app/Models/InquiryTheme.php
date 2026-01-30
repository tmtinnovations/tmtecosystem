<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InquiryTheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'description',
        'icon',
        'occurrence_count',
        'is_active',
    ];

    protected $casts = [
        'occurrence_count' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Scope for active themes.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for filtering by category.
     */
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope for ordering by occurrence count.
     */
    public function scopeMostCommon($query)
    {
        return $query->orderBy('occurrence_count', 'desc');
    }

    /**
     * Increment the occurrence count.
     */
    public function incrementCount(): void
    {
        $this->increment('occurrence_count');
    }
}
