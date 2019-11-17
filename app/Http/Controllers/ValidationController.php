<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class ValidationController extends Controller
{
    //
      public function checkEmailUser( Request $request){

$user= User::where('email',$request->email)->count();


      if($user <= 0)
      {
          return \Response::json(true);


      }
      else
      {
          return \Response::json(false);

      }

  }
        public function checkUsername( Request $request){

$user= User::where('email',$request->username)->count();


      if($user <= 0)
      {
          return \Response::json(true);


      }
      else
      {
          return \Response::json(false);

      }

  }
}
