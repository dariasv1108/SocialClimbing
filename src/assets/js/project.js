var PROJECT = PROJECT || {};

PROJECT.namespace = function (namespace) {
    var parts = namespace.split('.');
    var parent = PROJECT;
    var i;
    if (parts[0] === "PROJECT") {
        parts = parts.slice(1);
    }
    else return false;
    for (i = 0; i < parts.length; i += 1) {

        if (typeof parent[parts[i]] === "undefined") {

            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

PROJECT.namespace('execute');

PROJECT.execute = function (functionName, context, x, y, width, ctx, color) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    context[func].apply(context, args);
}
//CIRCLE
PROJECT.namespace('normalCircle');

PROJECT.normalCircle = function (x, y, width, ctx, color) {
    ctx.beginPath();
    ctx.arc(x, y, width / 2, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
}
PROJECT.namespace('leftCircle');

PROJECT.leftCircle = function (x, y, width, ctx, color) {
    ctx.beginPath();
    ctx.arc(x, y, width / 2, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.moveTo(x, y);
    ctx.lineTo(x - width / 2, y);
    ctx.strokeStyle = color;
    ctx.stroke();
}
PROJECT.namespace('rightCircle');

PROJECT.rightCircle = function (x, y, width, ctx, color) {
    ctx.beginPath();
    ctx.arc(x, y, width / 2, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.moveTo(x, y);
    ctx.lineTo(x + width / 2, y);
    ctx.strokeStyle = color;
    ctx.stroke();
}
PROJECT.namespace('startCircle');

PROJECT.startCircle = function (x, y, width, ctx, color) {
    var ap = (Math.PI / 180) * 40;
    var af = (Math.PI / 180) * 140;
    var radius = width / 2;
    var Xap = x + radius * Math.cos(ap);
    var Yap = y + radius * Math.sin(ap);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.moveTo(x, y);
    ctx.lineTo(Xap, Yap);
    ctx.arc(x, y, radius, ap, af);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
}
PROJECT.namespace('topCircle');

PROJECT.topCircle = function (x, y, width, ctx, color) {
    var ap = (Math.PI / 180) * -40;
    var af = (Math.PI / 180) * -140;
    var radius = width / 2;
    var Xap = x + radius * Math.cos(ap);
    var Yap = y + radius * Math.sin(ap);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.moveTo(x, y);
    ctx.lineTo(Xap, Yap);
    ctx.arc(x, y, radius, ap, af);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
}
//SQUARE
PROJECT.namespace('normalSquare');

PROJECT.normalSquare = function (x, y, width, ctx, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, width);
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
}
PROJECT.namespace('leftSquare');

PROJECT.leftSquare = function (x, y, width, ctx, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, width);
    ctx.lineWidth = 3;
    ctx.moveTo(x, y + width / 2);
    ctx.lineTo(x + width / 2, y + width / 2);
    ctx.strokeStyle = color;
    ctx.stroke();
}
PROJECT.namespace('rightSquare');

PROJECT.rightSquare = function (x, y, width, ctx, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, width);
    ctx.lineWidth = 3;
    ctx.moveTo(x + width, y + width / 2);
    ctx.lineTo(x + width / 2, y + width / 2);
     ctx.strokeStyle = color;
    ctx.stroke();
}
PROJECT.namespace('startSquare');

PROJECT.startSquare = function (x, y, width, ctx, color) {

    ctx.beginPath();
    ctx.rect(x, y, width, width);
    ctx.lineWidth = 3;
    ctx.moveTo(x + width / 2, y + width / 2);
    ctx.lineTo(x , y + width);
    ctx.lineTo(x + width, y + width);
    ctx.lineTo(x + width / 2, y + width / 2);
    ctx.strokeStyle = color;
    ctx.stroke();
}
PROJECT.namespace('topSquare');

PROJECT.topSquare = function (x, y, width, ctx, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, width);
    ctx.lineWidth = 3;
    ctx.moveTo(x + width / 2, y + width / 2);
    ctx.lineTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width / 2, y + width / 2);
    ctx.strokeStyle = color;
    ctx.stroke();
}