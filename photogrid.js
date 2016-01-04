/*! PHOTO GRID v1 | (c) 2015 Iddan Aharonson | MIT License | http://github.com/anIddan */

/*----  TO DO  ----
 * media queries
------------------*/

function Grid (a, c, m, el) {
    this.images = a;
    this.index = [];
    this.render = 0;
    for (var i = 0; i < Math.ceil(a.length/c); i++) {this.index.push([]);}
    var p = a.length;
    el.style.position = 'relative';
    el.style.paddingBottom = m;
    this.images.forEach(function (src, i) {
        var img = new Image();
        var r = 0, j = i;
        while (j >= c) {j -= c; r++;}
        img.row = r;
        img.index = j;
        img.addEventListener('load', function () {
            img.proportion = img.height / img.width;
            this.images[i] = img;
            this.index[img.row][img.index] = img;
            p--;
            if (!p) {this.size();}
        }.bind(this));
        img.src = src;
    }.bind(this));
    this.size = function () {
        var x = el.clientWidth,
            d = m * (1 + 1 / c);
        this.images.forEach(function (img, i) {
            img.width = x / c - d;
            img.height = x / c * img.proportion - d;
            var r = img.row,
                t = m;
            while (r > 0) {
                t += x / c * this.index[r - 1][img.index].proportion;
                r--;
            }
            img.style.top = t;
            img.style.left = (img.width + m) * img.index + m;
            img.style.position = 'absolute';
            if (!this.render) {
                el.appendChild(img);
            }
            this.images[i] = img;
            this.index[img.row][img.index] = img;
        }.bind(this));
    }.bind(this);
    window.addEventListener('resize', this.size);
}