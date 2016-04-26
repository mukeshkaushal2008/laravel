@extends('layouts.master')

@section('content')

<?php //dd($errors);?>
<form class="form-horizontal" method="post" action="<?php echo url();?>/users/addUser">
    @if (count($errors) > 0)
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
    <div class="flash-message">
    @foreach (['error','danger', 'warning', 'success', 'info'] as $msg)
      @if(Session::has($msg))
      <p class="alert alert-{{ $msg == 'error' ? 'danger' : $msg }}">{{ Session::get($msg) }} <a href="javascript:void(0);" class="close" data-dismiss="alert" aria-label="close">&times;</a></p>
      @endif
    @endforeach
  </div> <!-- end .flash-message -->
    <?php 
    
    //dd(old());
    echo Form::token();
    
    ?>
  {!! Form::hidden('id',isset($resultset->id) ? $resultset->id : '') !!}
    <div class="form-group">
    <label for="inputName3" class="col-sm-2 control-label">Name</label>
    <div class="col-sm-3">
        <input type="text" class="form-control" id="inputName3" placeholder="Name" name="name" value="{{ old('name') ? old('name') : isset($resultset->name) ? $resultset->name : '' }}">
    </div>
  </div>
    
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-3">
        <input type="email" class="form-control" id="inputEmail3" placeholder="Email" name="email" value="{{ old('email') ? old('email') :  isset($resultset->email) ? $resultset->email : ""}}">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-3">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password"  name="password" value="{{ old('password') ?  old('password') : '' }}">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">Update</button>
    </div>
  </div>
</form>
@stop

