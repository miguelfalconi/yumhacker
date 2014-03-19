ListsEditListPhotoSelectorView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render(); 

        this.list_edit_upload_image_form_view = new ListsEditUploadImageFormView({
            model: this.model,
            el: '#upload_image_form_container',
        }); 

        this.list_edit_user_images_list_view = new ListsEditUserImagesListView({
            model: this.model,
            el: '#user_images_list',
        });     

    },

    render: function () {
        this.$el.html(render('lists/edit_list_photo_selector_container', this.model));
    }
});