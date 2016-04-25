<!-- resources/views/auth/login.blade.php -->

@extends('layouts.master')

@section('content')


<form class="form-horizontal" method="post" action="/auth/login">
    @if (count($errors) > 0)
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

    
    {!! csrf_field() !!}
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-3">
        <input type="email" class="form-control" id="inputEmail3" placeholder="Email" name="email" value="{{ old('email')}}">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-3">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password"  name="password" value="{{ old('password') ?  old('password') : '' }}">
    </div>
  </div>
    
<div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label"></label>
    <div class="col-sm-3">
       <input type="checkbox" name="remember"> Remember Me
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">Update</button>
    </div>
  </div>
</form>
@stop

