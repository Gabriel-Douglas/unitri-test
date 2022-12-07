<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Customers;
use Carbon\Traits\ToStringFormat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use PhpParser\Node\Stmt\TryCatch;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class,'login']);

Route::group(['middleware'=>'api'],function(){
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});


Route::post('customer', [Customers::class,'create']); //OK
Route::get('customers', [Customers::class,'read']); //OK
Route::post('customer/{id}', [Customers::class,'update']);
Route::delete('customer/{id}', [Customers::class,'delete']);

