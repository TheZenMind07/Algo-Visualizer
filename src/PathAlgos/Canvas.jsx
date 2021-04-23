import React, { useRef, useEffect } from "react";

function Canvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const c = canvasRef.current;
        let w = (c.width = window.innerWidth);
        let h = (c.height = window.innerHeight);
        const $ = c.getContext("2d");

        function draw(c1, c2, s, rat, _x, _y) {
            var x = 0,
                y = 0;
            var col = 0,
                split = rat / 100;
            while (x <= w) {
                while (y <= h) {
                    col = Math.random();
                    if (col < split) $.fillStyle = c1;
                    else $.fillStyle = c2;
                    geo(x, y, s);
                    y += s * 1.0 + _y * 1.0;
                }
                x += s * 1.0 + _x * 1.0;
                y = 0;
            }
            // txt();
        }
        function geo(x, y, l) {
            $.save();
            $.translate(x, y);
            $.rotate(Math.floor(Math.random() * 4) * (Math.PI / 2));
            $.shadowColor = "hsla(209, 83%, 51%,.4)";
            $.shadowBlur = Math.random() * 100;
            $.shadowOffsetX = 1;
            $.shadowOffsetY = 1;
            $.beginPath();
            $.lineTo(l, -l);
            $.lineTo(l, 0);
            $.lineTo(0, l);
            $.lineTo(-l, 0);
            $.lineTo(-l, -l);
            $.lineTo(0, 0);
            $.closePath();
            $.fill();
            $.restore();
        }
        draw("hsla(209, 85%, 74%,1)", "hsla(209, 85%, 65%,1)", 100, 55, 0, 0);

        /*.....Randomize on click /tap.......*/
        window.addEventListener(
            "mousedown",
            function (e) {
                e.preventDefault();
                draw("hsla(209, 85%, 74%,1)", "hsla(209, 85%, 65%,1)", 100, 55, 0, 0);
            },
            false
        );

        window.addEventListener(
            "touchstart",
            function (e) {
                e.preventDefault();
                draw("hsla(209, 85%, 74%,1)", "hsla(209, 85%, 65%,1)", 100, 55, 0, 0);
            },
            false
        );

        /*.....Resize.......*/
        window.addEventListener(
            "resize",
            function () {
                c.width = w = window.innerWidth;
                c.height = h = window.innerHeight;
                draw("hsla(209, 85%, 74%,1)", "hsla(209, 85%, 65%,1)", 100, 55, 0, 0);
            },
            false
        );
    }, []);

    return <canvas ref={canvasRef} />;
}

export default Canvas;
