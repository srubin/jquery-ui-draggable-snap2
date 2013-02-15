/*
 * jquery.ui draggable snap2
 * allow selection of sides to snap to
 * Steve Rubin - srubin@cs.berkeley.edu
 */

$.ui.plugin.add("draggable", "snap2", {
    start: function() {

        var i = $(this).data("ui-draggable"),
            o = i.options;

        i.snap2Elements = [];

        $(o.snap2.constructor !== String ? ( o.snap2.items || ":data(ui-draggable)" ) : o.snap2).each(function() {
            var $t = $(this),
                $o = $t.offset();
            if(this !== i.element[0]) {
                i.snap2Elements.push({
                    item: this,
                    width: $t.outerWidth(), height: $t.outerHeight(),
                    top: $o.top, left: $o.left
                });
            }
        });

    },
    drag: function(event, ui) {

        var ts, bs, ls, rs, l, r, t, b, i, first,
            inst = $(this).data("ui-draggable"),
            o = inst.options,
            d = o.snap2Tolerance,
            sides = o.snap2Sides,
            x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
            y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

        for (i = inst.snap2Elements.length - 1; i >= 0; i--){

            l = inst.snap2Elements[i].left;
            r = l + inst.snap2Elements[i].width;
            t = inst.snap2Elements[i].top;
            b = t + inst.snap2Elements[i].height;

            //Yes, I know, this is insane ;)
            if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) {
                if(inst.snap2Elements[i].snapping) {
                    (inst.options.snap2.release && inst.options.snap2.release.call(inst.element, event, $.extend(inst._uiHash(), { snap2Item: inst.snap2Elements[i].item })));
                }
                inst.snap2Elements[i].snapping = false;
                continue;
            }
            
            if(o.snap2Mode !== "inner") {
                ts = Math.abs(t - y2) <= d && sides.indexOf('t') !== -1;
                bs = Math.abs(b - y1) <= d && sides.indexOf('b') !== -1;
                ls = Math.abs(l - x2) <= d && sides.indexOf('l') !== -1;
                rs = Math.abs(r - x1) <= d && sides.indexOf('r') !== -1;
                if(ts) {
                    ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
                }
                if(bs) {
                    ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
                }
                if(ls) {
                    ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
                }
                if(rs) {
                    ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
                }
            }

            first = (ts || bs || ls || rs);

            if(o.snap2Mode !== "outer") {
                ts = Math.abs(t - y1) <= d && sides.indexOf('t') !== -1;
                bs = Math.abs(b - y2) <= d && sides.indexOf('b') !== -1;
                ls = Math.abs(l - x1) <= d && sides.indexOf('l') !== -1;
                rs = Math.abs(r - x2) <= d && sides.indexOf('r') !== -1;
                if(ts) {
                    ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
                }
                if(bs) {
                    ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
                }
                if(ls) {
                    ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
                }
                if(rs) {
                    ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
                }
            }

            if(!inst.snap2Elements[i].snapping && (ts || bs || ls || rs || first)) {
                (inst.options.snap2.snap2 && inst.options.snap2.snap2.call(inst.element, event, $.extend(inst._uiHash(), { snap2Item: inst.snap2Elements[i].item })));
            }
            inst.snap2Elements[i].snapping = (ts || bs || ls || rs || first);

        }

    }
});
