<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
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
    public function create(): Response
    {
        // Only service_provider can create services
        if (Auth::user()->role !== 'service_provider') {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Service/Create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Only service_provider can store services
        if (Auth::user()->role !== 'service_provider') {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'images' => 'required|array|min:1',
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['user_id'] = Auth::id();

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('services', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }

        $validated['images'] = $imagePaths;

        $service = Service::create($validated);

        // redirect to the service show page
        return Redirect::route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service): Response
    {
        return Inertia::render('Service/Show', [
            'service' => $service->load(['user', 'category', 'ratings.user']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        // Only service_provider can edit their own services
        if (Auth::user()->role !== 'admin' && $service->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Service/Edit', [
            'service' => $service->load('category'),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        // Only service_provider can update their own services
        if (Auth::user()->role !== 'admin' && $service->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'images' => 'nullable|array|min:1',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'category_id' => 'required|exists:categories,id',
        ]);

        $imagePaths = $service->images;
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('services', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }

        $validated['images'] = $imagePaths;

        $service->update($validated);

        return Redirect::route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        // Only service_provider can delete their own services
        if (Auth::user()->role !== 'admin' && $service->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $service->delete();

        return Redirect::route('dashboard');
    }
}
