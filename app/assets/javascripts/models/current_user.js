CurrentUser = new (Backbone.Model.extend({
    urlRoot: '/api/users',

    initialize: function () {
        if ($.cookie('current_user')) {
            this.set(JSON.parse($.cookie('current_user')));
        }
    },

    logged_in: function () {
        return $.cookie('current_user') ? true : false;
    }

}))();
