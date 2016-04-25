@extends('layouts.master')

@section('content')

<?php //dd($errors);?>

<div class="container">
  <h2>Manage users</h2>
   <div class="form-group">
    
       <button type="submit" class="btn btn-primary" onclick="window.location.href='<?php url();?>/users'">Manage user</button>
  
  </div>
  <?php //dd($resultset);?>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      
      </tr>
    </thead>
    <tbody>
       
       
      <tr>
        <td> <?php
       echo $resultset->name;
       ?></td>
        <td> <?php
       echo $resultset->email;
       ?></td>
        
      </tr>
       
    </tbody>
  </table>
  
</div>
@stop

