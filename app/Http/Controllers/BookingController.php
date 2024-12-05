<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function customerIndex(Request $request): Response
    {
        $bookings = Booking::where('user_id', $request->user()->id)->with('service.user')->orderBy('updated_at', 'desc')->get();

        return inertia('Customer/Bookings', [
            'bookings' => $bookings,
        ]);
    }

    public function cancel(Booking $booking)
    {
        $booking->update(['status' => 'canceled']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        // Parse the date and time using Carbon
        $datetime = Carbon::parse($request->date)->setTimeFromTimeString($request->time);

        Booking::create([
            'service_id' => $request->service_id,
            'user_id' => $request->user()->id,
            'datetime' => $datetime,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        //
    }
}
