<!doctype html>
<html lang="en">
<head>
@include('elements.head')
<body>
@include('elements.header')
<main>
    <div class="container">
        @yield('content')
    </div>
</main>
@include('elements.footer')

</body>
</html>