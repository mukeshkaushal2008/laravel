<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersComments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
         Schema::create('user_comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->text('comments');
            $table->integer('status');
            $table->bigInteger('created',20);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('user_comments');
    }
}
