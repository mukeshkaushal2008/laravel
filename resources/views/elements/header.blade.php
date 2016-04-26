

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Cover</a>
    </div>
    <div class="nav navbar-nav navbar-right">
        <li><a href="#">Home</a></li>
        <li><a href="#">Tasks</a></li>
        <?php if(!empty(Auth::user()->id)){?>
         <li><a href="{{url()}}/users/">Hi, {{Auth::user()->name}}</a></li>
         <li><a href="{{url()}}/auth/logout">Logout</a></li>
        <?php }else{?>
          <li><a href="{{url()}}/auth/login">Login</a></li>
        <?php }?>
    </div>
  </div>
</nav>