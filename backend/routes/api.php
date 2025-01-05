<?php

use App\Http\Controllers\PostController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return UserResource::make($request->user());
    });
    Route::apiResource('posts', PostController::class);
});
