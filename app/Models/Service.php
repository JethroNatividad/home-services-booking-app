<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'description', 'price', 'images', 'category_id'];

    protected $casts = [
        'images' => 'array',
    ];

    protected $appends = ['rating', 'review_count'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function ratings()
    {
        return $this->hasMany(ServiceRating::class);
    }

    public function getRatingAttribute()
    {
        return number_format($this->ratings->avg('rating') ?: 0, 2);
    }

    public function getReviewCountAttribute()
    {
        return $this->ratings->count();
    }
}
