@extends('layouts.master')

@section('content')
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
    <?php // echo Form::token();?>
   


<div class="container">
  <h2>Manage users</h2>
   <div class="form-group">
    
       <button type="submit" class="btn btn-primary" onclick="window.location.href='<?php url();?>/users/create'">Add user</button>
  
  </div>
  <?php //dd($resultset);?>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Acgion</th>
      </tr>
    </thead>
    <tbody>
        <?php
        
       
        if(count($resultset) > 0){
            foreach ($resultset as $key => $value) {
           
        ?>
      <tr>
        <td><?php echo $value['name'];?></td>
        <td><?php echo $value['email'];?></td>
        <td>
            <a href="<?php url();?>/users/edit/<?php echo $value['id']; ?>">Edit</a>
           <a href="<?php url();?>/users/show/<?php echo $value['id']; ?>">View</a>
            <a href="<?php url();?>/users/destroy/<?php echo $value['id']; ?>">Delete</a>
        </td>
      </tr>
            <?php }}else{?>
       <tr colspan="3">
        <td>No record found</td>
      </tr>
        <?php }?>
    </tbody>
  </table>
  <div class="pagination"> {!! $resultset->appends(['sort' => 'name'])->render() !!}</div>
<!--  {!! $resultset->fragment('foo')->render() !!}-->
</div>
  @stop