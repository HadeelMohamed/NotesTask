<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('notes', function (Blueprint $table) {
       $table->increments('id');
       $table->string('title');
       $table->text('description');
       $table->integer('user_id')->unsigned();
       $table->foreign('user_id')->references('id')->on('users')->onUpdate('RESTRICT')->onDelete('RESTRICT');
       $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notes');
        $table->dropForeign('lists_user_id_foreign');
        $table->dropIndex('lists_user_id_index');
        $table->dropColumn('user_id');
    }
}
