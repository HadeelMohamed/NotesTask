<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Hash;
use App\User;
use Auth;

class AuthController extends Controller
{
  
   public function login(Request $request){ 
        if(Auth::attempt(['username' => $request->username, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->accessToken;



          return \Response::json(['user' =>$user,'token'=> $success['token']]);
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }
   

        public function register(Request $request)
    {

      try {
         $user = User::create([
 'name' => $request->firstName,
 'email' =>$request->email,
 'username'=>$request->username,
 'password' => Hash::make($request->password),
 ]);

        $success['token'] =  $user->createToken('MyApp')->accessToken; 



          return \Response::json(['user' =>$user,'token'=> $success['token']]);

      	
      } catch (Exception $e) {
      	        return Response::json(['errors' => 'Bad Request'], 404);

      	
      }
      
    }

    public function logout (Request $request) {

    $token = $request->user()->token();
    $token->revoke();

    $response = 'You have been succesfully logged out!';
    return response($response, 200);

}
}
