define(['backbone', '../animations/porthole'], function (Backbone, portHoleAnimation) {
    return Backbone.View.extend({
        initialize: function () {
        	this.$el = $('section.contact');
            this.$el.find('li').each(portHoleAnimation);
        }
    });
});