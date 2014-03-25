ListsEditView = Backbone.View.extend({
    events: {
        'click #save_btn': 'handleSubmit'
    },

    initialize: function () {
        this.collection = new ListingsCollection();
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch();
    },

    render: function () {
        console.log('rendering edit page')
        console.log(this.model)
        this.$el.html(render('lists/edit', this.model));

        this.lists_edit_title_view = new ListsEditTitleView({
            el: '#list_title_container',
            model: this.model
        });

        this.lists_edit_description_view = new ListsEditDescriptionView({
            el: '#list_description_container',
            model: this.model
        });

        this.lists_edit_listings_container_view = new ListsEditListingsContainerView({
            el: '#listings_container',
            model: this.model,
            collection: this.collection
        });

        if (typeof MainGoogleMap === 'undefined') {
            MainGoogleMap = new MainMapView({
                el: '#map_canvas',
                collection: this.collection
            });
        } else {
            MainGoogleMap.map.getStreetView().setVisible(false);
            $('.map_canvas_container').html('');
            MainGoogleMap.mapCanvas.appendTo($('.map_canvas_container'));
        }
        MainGoogleMap.map.getStreetView().setVisible(false);
        // This needs to be here if MainGoogleMap already exists becuase new collection is created above
        MainGoogleMap.collection = this.collection;
        this.listenTo(this.collection, 'reset', function () { MainGoogleMap.render(); });
        this.listenTo(this.collection, 'add', function () { MainGoogleMap.render(); });
        this.listenTo(this.collection, 'remove', function () { MainGoogleMap.render(); });
        fixMapOnScroll();
        
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.model.get('wish_list') ? 'Wish List' : $('#title_input').val();
        var description = $('#description_input').val();

        var attrs = { 
            'title': title,
            'description': description
        }

        this.model.set(attrs);
        this.model.save();
        App.navigate(e.target.pathname, { trigger: true });
    }
});