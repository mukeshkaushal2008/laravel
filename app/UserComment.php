<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserComment extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
