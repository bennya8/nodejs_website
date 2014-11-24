define('admin/game/index', ['jquery', 'bootbox','underscore', 'paginator' ], function ($, bootbox, underscore) {

    var pageOpt = {
        currentPage: 1,
        totalPages: 1,
        numberOfPages: 5,
        bootstrapMajorVersion: 3,
        pageUrl: function (type, page, current) {
            return "/admin/game?&page=" + page;
        }
    };


    return {

        init: function (params) {
            pageOpt = underscore.extend(pageOpt,params.pageOpt);

            $('#cc-paging').bootstrapPaginator(pageOpt);

            $(".cc-btn-delete").click(function () {
                bootbox.alert("Hello world!", function () {
                    console.log("Alert Callback");
                });
            });
        }
    }

});