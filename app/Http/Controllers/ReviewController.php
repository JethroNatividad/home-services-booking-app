<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\ServiceRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Booking $booking): Response
    {
        //
        return Inertia::render('Service/Review/Create', [
            'booking' => $booking->load('service'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'required|string',
        ]);

        $booking = Booking::find($validated['booking_id']);

        ServiceRating::create([
            'booking_id' => $validated['booking_id'],
            'user_id' => $request->user()->id,
            'rating' => $validated['rating'],
            'review' => $validated['review'],
            'service_id' => $booking->service_id,
        ]);

        return Redirect::route('customer.bookings.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceRating $serviceRating)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceRating $serviceRating)
    {
        return Inertia::render('Service/Review/Edit', [
            'review' => $serviceRating->load('service'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceRating $serviceRating)
    {
        $validated = $request->validate([
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'required|string',
        ]);

        $serviceRating->update($validated);

        return Redirect::route('customer.bookings.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRating $serviceRating)
    {
        //
    }
}
