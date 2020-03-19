<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>BioReactor</title>
    <link rel="shortcut icon" href="{{ url('images/favicon.ico') }}" />

    <!-- Url stylesheets -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet"
        type="text/css">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.0-alpha14/css/tempusdominus-bootstrap-4.min.css" />
    @if(isset($cssFilesExternal) && is_array($cssFilesExternal))
    @foreach ($cssFilesExternal as $file)
    <link rel="stylesheet" type="text/css" href="{{{ $file }}}">
    @endforeach
    @endif
    <!-- /Url stylesheets -->

    <!-- Global stylesheets -->
    <link href="{{ asset('icons/icomoon/styles.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('icons/fontawesome/styles.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('icons/material/icons.css') }}" rel="stylesheet" type="text/css">

    <link href="{{ asset('css/core/material/bootstrap.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/core/material/bootstrap_limitless.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/core/material/layout.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/core/material/components.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/core/material/colors.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/core/custom.css') }}" rel="stylesheet" type="text/css">

    @if(isset($cssFiles) && is_array($cssFiles))
    @foreach ($cssFiles as $file)
    <link rel="stylesheet" type="text/css" href="{{ mix($file) }}">
    @endforeach
    @endif
    <!-- /global stylesheets -->
</head>

<body>


    <body>

        <!-- Main navbar -->
        <div class="navbar navbar-expand-md navbar-light navbar-static">
    
            <!-- Header with logos -->
            <div class="navbar-header navbar-dark d-none d-md-flex align-items-md-center">
                <div class="navbar-brand navbar-brand-md">
                    <a href="index.html" class="d-inline-block">
                        <img src="../../images/logo_light.png" alt="">
                    </a>
                </div>
                
                <div class="navbar-brand navbar-brand-xs">
                    <a href="index.html" class="d-inline-block">
                        <img src="../../images/logo_icon_light.png" alt="">
                    </a>
                </div>
            </div>
            <!-- /header with logos -->
        
    
            <!-- Mobile controls -->
            <div class="d-flex flex-1 d-md-none">
                <div class="navbar-brand mr-auto">
                    <a href="index.html" class="d-inline-block">
                        <img src="../../images/logo_dark.png" alt="">
                    </a>
                </div>	
    
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                    <i class="icon-tree5"></i>
                </button>
    
                <button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
                    <i class="icon-paragraph-justify3"></i>
                </button>
            </div>
            <!-- /mobile controls -->
    
    
            <!-- Navbar content -->
            <div class="collapse navbar-collapse" id="navbar-mobile">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
                            <i class="icon-paragraph-justify3"></i>
                        </a>
                    </li>
                </ul>
    
                <span class="navbar-text ml-md-3 mr-md-auto">
                </span>
    
                <ul class="navbar-nav">
                    <li class="nav-item dropdown dropdown-user">
                        <a href="#" class="navbar-nav-link dropdown-toggle" data-toggle="dropdown">
                            <img src="../../images/placeholders/placeholder.jpg" class="rounded-circle" alt="">
                            <span>{{Session::get('userInfo.username', '')}}</span>
                        </a>
    
                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="#" class="dropdown-item"><i class="icon-user-plus"></i> My profile</a>
                            <div class="dropdown-divider"></div>
                            <a href="/session/logout" class="dropdown-item"><i class="icon-switch2"></i> Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- /navbar content -->
            
        </div>
        <!-- /main navbar -->
    
                        
        <!-- Page content -->
        <div class="page-content">
    
            <!-- Main sidebar -->
            <div class="sidebar sidebar-dark sidebar-main sidebar-expand-md">
    
                <!-- Sidebar mobile toggler -->
                <div class="sidebar-mobile-toggler text-center">
                    <a href="#" class="sidebar-mobile-main-toggle">
                        <i class="icon-arrow-left8"></i>
                    </a>
                    Navigation
                    <a href="#" class="sidebar-mobile-expand">
                        <i class="icon-screen-full"></i>
                        <i class="icon-screen-normal"></i>
                    </a>
                </div>
                <!-- /sidebar mobile toggler -->
    
    
                <!-- Sidebar content -->
                <div class="sidebar-content">
                    
                    <!-- User menu -->
                    <div class="sidebar-user-material">
                        <div class="sidebar-user-material-body">
                            <div class="card-body text-center">
                                <a href="#">
                                    <img src="../../images/placeholders/placeholder.jpg" class="img-fluid rounded-circle shadow-1 mb-3" width="80" height="80" alt="">
                                </a>
                                <h6 class="mb-0 text-white text-shadow-dark">{{Session::get('userInfo.username', '')}}</h6>
                                <span class="font-size-sm text-white text-shadow-dark">Bio Reactor ITESO</span>
                            </div>
                                                        
                            <div class="sidebar-user-material-footer">
                                <a href="#user-nav" class="d-flex justify-content-between align-items-center text-shadow-dark dropdown-toggle" data-toggle="collapse"><span>My account</span></a>
                            </div>
                        </div>
    
                        <div class="collapse" id="user-nav">
                            <ul class="nav nav-sidebar">
                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        <i class="icon-user-plus"></i>
                                        <span>My profile</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="/session/logout" class="nav-link">
                                        <i class="icon-switch2"></i>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- /user menu -->
        
                    
                    <!-- Main navigation -->
                    <div class="card card-sidebar-mobile">
                        <ul class="nav nav-sidebar" data-nav-type="accordion">
    
                            <!-- Main -->
                            <li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs">Main</div> <i class="icon-menu" title="Main"></i></li>
                            <li class="nav-item">
                                <a href="index.html" class="nav-link active">
                                    <i class="icon-home4"></i>
                                    <span>
                                        Dashboard
                                        <span class="d-block font-weight-normal opacity-50">No active orders</span>
                                    </span>
                                </a>
                            </li>
                            <!-- /layout -->
                        </ul>
                    </div>
                    <!-- /main navigation -->
    
                </div>
                <!-- /sidebar content -->
                
            </div>
            <!-- /main sidebar -->
    
    
            <!-- Main content -->
            <div class="content-wrapper">
    
                <!-- Page header -->
                <div class="page-header">
                    <div class="page-header-content header-elements-md-inline">
                        <div class="page-title d-flex">
                            <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home</span> - Dashboard</h4>
                            <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                        </div>
                    </div>
                </div>
                <!-- /page header -->
    
    
                <!-- Content area -->
                <div class="content pt-0">
                    @yield('content')
                </div>
                <!-- /content area -->
            </div>
            <!-- /main content -->
    
        </div>
        <!-- /page content -->
</body>

<script type="text/javascript">
    //const BASE_URL = "{{ url('/') }}";
    //const LOGOUT_URL = "{{ url('signin/destroy') }}";
    //const AWS_CLOUD_FRONT = "{{env('AWS_CLOUD_FRONT')}}";
</script>

@if(isset($jsFilesExternal) && is_array($jsFilesExternal))
@foreach ($jsFilesExternal as $file)
<script type="text/javascript" src="{{{ $file }}}"></script>
@endforeach
@endif


<!-- Core JS files -->
<script src="{{ asset('js/core/jquery.min.js') }}"></script>
<script src="{{ asset('js/core/attrchange.js') }}"></script>
<script src="{{ asset('js/core/attrchange_ext.js') }}"></script>
<script src="{{ asset('js/core/bootstrap.bundle.min.js') }}"></script>
<script src="{{ asset('js/plugins/forms/selects/select2.min.js') }}"></script>
<script src="{{ asset('js/plugins/forms/styling/switch.min.js') }}"></script>
<script src="{{ asset('js/plugins/forms/styling/uniform.min.js') }}"></script>
<script src="{{ asset('js/plugins/forms/tags/tagsinput.min.js') }}"></script>
<script src="{{ asset('js/plugins/forms/tags/tokenfield.min.js') }}"></script>
<script src="{{ asset('js/plugins/forms/wizards/steps.min.js') }}"></script>
<script src="{{ asset('js/plugins/loaders/blockui.min.js') }}"></script>
<script src="{{ asset('js/plugins/notifications/pnotify.min.js') }}"></script>
<script src="{{ asset('js/plugins/notifications/sweet_alert.min.js') }}"></script>
<script src="{{ asset('js/plugins/ui/moment/moment.min.js') }}"></script>
<script src="{{ asset('js/plugins/ui/moment/moment_locales.min.js') }}"></script>
<script src="{{ asset('js/plugins/ui/fab.min.js') }}"></script>
<script src="{{ asset('js/plugins/ui/nicescroll.js') }}"></script>
<script src="{{ asset('js/plugins/ui/perfect_scrollbar.min.js') }}"></script>
<script src="{{ asset('js/plugins/ui/slinky.min.js') }}"></script>
<script src="{{ asset('js/plugins/ui/sticky.min.js') }}"></script>
<script type="text/javascript"
    src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.0-alpha14/js/tempusdominus-bootstrap-4.min.js">
</script>
<!-- /core JS files -->

<!-- Theme JS files -->
<script src="{{ asset('js/core/Errors.js') }}"></script>
<script src="{{ asset('js/core/functions_Ajax.js') }}"></script>
<script src="{{ asset('js/core/utils.js') }}"></script>
<script src="{{ asset('js/core/alerts.js') }}"></script>
<script src="{{ asset('js/core/app.js') }}"></script>
<!-- /theme JS files -->

@if(isset($jsFiles) && is_array($jsFiles))
@foreach ($jsFiles as $file)
<script type="text/javascript" src="{{ mix($file) }}"></script>
@endforeach
@endif

<script src="{{ asset('js/core/custom.js') }}"></script>

</html>