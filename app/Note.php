<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    //
        protected $fillable = ['title', 'description','user_id'];

           public function productsofbusiness()
    {
        return $this->belongsTo('App\User','user_id');
    }
        

}
