<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="description" content="ServicePro">
        <meta name="author" content="Cris del Valle">

        <title>Octomar Inventory</title>

        <!-- Fav and touch icons -->
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="{{ asset('assets/ico/apple-touch-icon-144-precomposed.png') }}">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="{{ asset('assets/ico/apple-touch-icon-114-precomposed.png') }}">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="{{ asset('assets/ico/apple-touch-icon-72-precomposed.png') }}">
        <link rel="apple-touch-icon-precomposed" href="{{ asset('assets/ico/apple-touch-icon-57-precomposed.png') }}">
        <link rel="shortcut icon" href="{{ asset('assets/ico/favicon.png') }}">

        <!-- CSS -->
        <link href="{{ asset('components/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet" />
        <link href="{{ asset('components/angular-loading-bar/build/loading-bar.min.css') }}" rel="stylesheet" />
        <link href="{{ asset('components/angular-material/angular-material.min.css') }}" rel="stylesheet" />

        @yield('styles')

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>

        <div id="wrapper">

            @yield('content_container')

        </div>

        <!-- JavaScript -->
        <script type="text/javascript">

         var BASE_URL = '{{ asset('/') }}';

        </script>
        <script src="{{ asset('components/jquery/dist/jquery.min.js') }}"></script>
        <script src="{{ asset('components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
        <script src="{{ asset('components/angular/angular.min.js') }}"></script>
        <script src="{{ asset('components/angular-resource/angular-resource.min.js') }}"></script>
        <script src="{{ asset('components/angular-ui-router/release/angular-ui-router.min.js') }}"></script>
        <script src="{{ asset('components/angular-aria/angular-aria.min.js') }}"></script>
        <script src="{{ asset('components/angular-animate/angular-animate.min.js') }}"></script>
        <script src="{{ asset('components/angular-material/angular-material.min.js') }}"></script>
        <script src="{{ asset('components/angular-loading-bar/build/loading-bar.min.js') }}"></script>
        <script src="{{ asset('components/angular-ui-date/dist/date.js') }}"></script>

        <script src="{{ asset('js/inventory.min.js') }}"></script>
        @yield('scripts')

    </body>

</html>
