<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Admin can see all services, service_provider can see only their own
        if (Auth::user()->role === 'admin') {
            $services = Service::all();
        } else {
            $services = Service::where('user_id', Auth::id())->get();
        }

        return response()->json($services);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Only service_provider can create services
        if (Auth::user()->role !== 'service_provider') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json(['message' => 'Create service form']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Only service_provider can store services
        if (Auth::user()->role !== 'service_provider') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'images' => 'nullable|array',
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['user_id'] = Auth::id();

        $service = Service::create($validated);

        return response()->json($service, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service): Response
    {
        return Inertia::render('Service/Show', [
            'service' => $service->load(['user', 'category', 'ratings']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        // Only service_provider can edit their own services
        if (Auth::user()->role !== 'admin' && $service->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json(['message' => 'Edit service form', 'service' => $service]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        // Only service_provider can update their own services
        if (Auth::user()->role !== 'admin' && $service->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'images' => 'nullable|array',
            'category_id' => 'required|exists:categories,id',
        ]);

        $service->update($validated);

        return response()->json($service);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        // Only service_provider can delete their own services
        if (Auth::user()->role !== 'admin' && $service->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $service->delete();

        return response()->json(['message' => 'Service deleted successfully']);
    }
}
