<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Note;
use Auth;

class NoteController extends Controller
{
   public function index()
    {
      $note = Note::where('user_id',Auth::user()->id)->paginate(5);

     return response()->json($note, 201);
    }
	
    public function store(Request $request)
    {
      
      $note = new Note([
        'title' => $request->title,
        'description' => $request->description,
        'user_id'=>Auth::user()->id,
      ]);

      $note->save();

      return response()->json(true, 201);
    }
     public function delete($id)
    {
      $note = Note::find($id);

      $note->delete();

       return response()->json(true, 201);
    }

        public function update($id, Request $request)
    {

      $note = Note::find($id);

      $note->update($request->all());

       return response()->json(true, 201);
    }

}
