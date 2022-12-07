<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;
use TheSeer\Tokenizer\Exception;

class Customers extends Controller
{

    public function validationCustomer($checkdocument)
    {

        $checkstr = '';
        if ($checkdocument == true) {
            $checkstr = 'required|min:11|max:14|unique:customers,document';
        }

        request()->validate([
            'document' => $checkstr,
            'name' => 'required|min:4',
            'email' => 'email:rfc',
            'phonenumber' => 'required|max:11|min:11',
            'address' => 'required'
        ]);
    }

    public function read()
    {
        try {
            $clients = DB::table('customers')->get();
            return response()->json([
                "status" => 200,
                "message" => 'Customer data retrive with success!',
                "data" => $clients
            ], 200);
        } catch (Exception $e) {
            return response($e->getMessage(), 400);
        }
    }

    public function create()
    {
        $dataCustomer = request()->collect();

        //VALIDATE EXPECTED DATA
        $this->validationCustomer(true);

        // TRY INSERT DATA ON DATABASE
        try {
            DB::table('customers')->insert([
                "document" => $dataCustomer['document'],
                "name" => $dataCustomer['name'],
                "email" => $dataCustomer['email'],
                "phonenumber" => $dataCustomer['phonenumber'],
                "address" => $dataCustomer['address']
            ]);
            return response()->json([
                "status" => 200,
                "validation" => $this,
                "message" => 'New customer has been created with success!',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "status" => 400,
                "validation" => $this,
                "error" => $e->getMessage(),
                "datarequest" => $dataCustomer
            ], 400);
        }
    }


    public function update(Request $request, $id)
    {
        $dataCustomer = $request->collect();

        //VALIDATE EXPECTED DATA
        $this->validationCustomer(false);

        // TRY UPDATE RECORD CUSTOMER
        try {
            $affected = DB::table('customers')
                ->where('id', $id)
                ->update([
                    "name" => $dataCustomer['name'],
                    "email" => $dataCustomer['email'],
                    "phonenumber" => $dataCustomer['phonenumber'],
                    "address" => $dataCustomer['address']
                ]);

            return response()->json([
                "status" => 200,
                "message" => "The customer has been updated with success!",
                "affected" => $affected,
            ]);

        } catch (Exception $e) {
            return response()->json([
                "status" => 400,
                "error" => $e->getMessage(),
            ], 400);
        }
    }

    public function delete(Request $request, $id)
    {
        try {
            $deleted = DB::table('customers')->where('id', $id)->delete();
            return response()->json([
               "status" => 200,
               "message" => 'The ID '.$id.' has been deleted with success',
               "affected" => $deleted, 
            ]);
        } catch (Exception $e) {
            return response()->json([
                "status" => 400,
                "error" => $e->getMessage(),
            ], 400);
        }
    }


}