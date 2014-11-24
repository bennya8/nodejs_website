require.config({
    baseUrl: '/libs',
    paths: {
        'jquery': 'jquery/jquery.min',
        'bootstrap': 'bootstrap/js/bootstrap.min',
        'paginator': 'paginator/paginator.min',
        'bootbox': 'bootbox/bootbox.min',
        'underscore': 'underscore/underscore-min',
        'holder': 'holder/holder.min'
    },
    shim: {
        'bootstrap': ['jquery'],
        'paginator': ['bootstrap'],
        'bootbox': ['bootstrap'],
        'underscore': {
            exports: '_'
        }
    }
});