d3.selection.prototype.delegate = function(event, targetselector, handler) {
    var self = this;
    return this.on(event, function() {
        var eventTarget = d3.event.target,
            target = self.selectAll(targetselector);
        target.each(function(){ 
            //only perform event handler if the eventTarget and intendedTarget match
            if (eventTarget === this) {
                handler.call(eventTarget, eventTarget.__data__);
            } else if (eventTarget.parentNode === this) {
                handler.call(eventTarget.parentNode, eventTarget.parentNode.__data__);
            }
        });
    });
};
