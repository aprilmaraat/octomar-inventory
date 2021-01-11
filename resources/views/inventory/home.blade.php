@extends('layouts.app')

@section('content_container')
    <div
        ng-cloak
        ng-app="inventory"
        ng-controller="AppController as app">

        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" ui-sref="start">Octomar Inventory</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li>
                            <a ui-sref="transaction.summary">Transaction</a>
                        </li>
                        <li>
                            <a ui-sref="management.summary">Management</a>
                        </li>
                        <li>
                            <a ui-sref="options">Options</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div ui-view autoscroll="true"></div>
    </div>
@endsection

@section('scripts')

    <script src="{{ asset('components/jquery-ui/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('components/angular-ui-sortable/sortable.min.js') }}"></script>
    <script src="{{ asset('components/ng-file-upload-shim/ng-file-upload-shim.min.js') }}"></script>
    <script src="{{ asset('components/ng-file-upload/ng-file-upload.min.js') }}"></script>
    <script src="{{ asset('components/angularPrint/angularPrint.js') }}"></script>

    <script src="{{ asset('js/management.min.js') }}"></script>
    <script src="{{ asset('js/transaction.min.js') }}"></script>

@endsection

@section('styles')

    <link href="{{ asset('components/jquery-ui/themes/smoothness/jquery-ui.css') }}" rel="stylesheet" />
    <link href="{{ asset('components/angularPrint/angularPrint.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/inventory.min.css') }}" rel="stylesheet" />

@endsection
