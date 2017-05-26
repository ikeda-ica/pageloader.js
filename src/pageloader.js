'use strict';

let loaded = 0;
let loaderprocess = 0;
let elm = document.getElementsByTagName('img');
let count = 0;

$.fn.pageloader = (options) => {
    let opts = $.extend({}, $.fn.pageloader.defaults, options);
    let bar = false,
        circle = false,
        per = false;

    for (let i of elm) {
        count++;
        let url = i.src;
        i.src = '';
        i.src = url;
        i.addEventListener('load', () => {
            if (i.complete) {
                console.log(i.src);
                loaded++;
                console.log(loaded + ':' + count);
                if (count !== loaded) {}
                console.log(loaded + ':' + count);
            }
        });
    }
    console.log(count);

    class loaderStyle {
        constructor() {
            let overlay = document.createElement('div');
            overlay.id = 'overlay';
            overlay.style.background = '#111';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.zIndex = '9999';
            overlay.style.color = opts.backgroundColor;
            overlay.style.fontSize = '20px';
            overlay.style.textAlign = 'center';
            document.body.appendChild(overlay);
        }

        bar() {
            if (!bar) {
                let loaderBar = document.createElement('p');
                loaderBar.id = 'loader-bar';
                loaderBar.style.WebkitTransition = 'all .5s ease-in-out 0s';
                loaderBar.style.MozTransision = 'all .5s ease-in-out 0s';
                loaderBar.style.width = '0%';
                loaderBar.style.height = '1px';
                loaderBar.style.position = 'absolute';
                loaderBar.style.top = '50%';
                loaderBar.style.left = '0';
                loaderBar.style.marginTop = '-1px';
                loaderBar.style.zIndex = '9999';
                loaderBar.style.color = '#fff';
                loaderBar.style.background = opts.progressBarColor;
                loaderBar.style.textAlign = 'center';
                document.getElementById('overlay').appendChild(loaderBar);
                bar = true;
            } else {
                loaderprocess = Math.floor((loaded / elm.length) * 100);
                console.log(loaderprocess);
                let loaderBar = document.getElementById('loader-bar');
                loaderBar.style.width = loaderprocess + '%';
                if (loaded == elm.length) {
                    clearInterval(timer);
                }
            }
        }

        circle() {
            if (!circle) {
                let loaderBaseCircle = document.createElement('div'),
                    loaderCircle = document.createElement('div'),
                    loaderPoint = document.createElement('span');
                loaderBaseCircle.id = 'loader-basecircle';
                loaderBaseCircle.style.WebkitTransition = 'all .5s ease-in-out 0s';
                loaderBaseCircle.style.MozTransision = 'all .5s ease-in-out 0s';
                loaderBaseCircle.style.width = '200px';
                loaderBaseCircle.style.height = '200px';
                loaderBaseCircle.style.position = 'absolute';
                loaderBaseCircle.style.top = '50%';
                loaderBaseCircle.style.left = '50%';
                loaderBaseCircle.style.marginTop = '-100px';
                loaderBaseCircle.style.marginLeft = '-100px';
                loaderBaseCircle.style.border = '1px solid #eee';
                loaderBaseCircle.style.borderRadius = '50%';
                loaderBaseCircle.style.zIndex = '9999';
                loaderBaseCircle.style.color = '#000';
                loaderBaseCircle.style.background = '#111';
                // loaderBaseCircle.style.backgroundImage = 'linear-gradient(to right, transparent 50%, #fff 0)';
                loaderBaseCircle.style.textAlign = 'center';

                loaderCircle.id = 'loader-circle';
                loaderCircle.style.display = 'block';
                loaderCircle.style.WebkitTransition = 'all .5s ease-in-out 0s';
                loaderCircle.style.MozTransision = 'all .5s ease-in-out 0s';
                loaderCircle.style.WebkitTransform = 'rotate(0deg)';
                loaderCircle.style.MozTransform = 'rotate(0deg)';
                loaderCircle.style.WebkitTransformOrigin = 'left';
                loaderCircle.style.MozTransformOrigin = 'left';
                loaderCircle.style.width = '50%';
                loaderCircle.style.height = '100%';
                loaderCircle.style.marginLeft = '50%';
                loaderCircle.style.borderRadius = '0 100px 100px 0';
                loaderCircle.style.zIndex = '9999';
                loaderCircle.style.color = '#fff';
                loaderCircle.style.fontSize = '20px';
                loaderCircle.style.backgroundColor = 'none';
                loaderCircle.style.textAlign = 'center';
                loaderCircle.style.position = 'relative';

                loaderPoint.id = 'loader-point';
                loaderPoint.style.width = '8px';
                loaderPoint.style.height = '8px';
                loaderPoint.style.position = 'absolute';
                loaderPoint.style.top = '-4px';
                loaderPoint.style.left = '0';
                loaderPoint.style.borderRadius = '50%';
                loaderPoint.style.backgroundColor = '#fff';

                document.getElementById('overlay').appendChild(loaderBaseCircle);
                document.getElementById('loader-basecircle').appendChild(loaderCircle);
                document.getElementById('loader-circle').appendChild(loaderPoint);
                circle = true;
            } else {
                loaderprocess = Math.floor((loaded / elm.length) * 100);
                let loaderCircle = document.getElementById('loader-circle');
                loaderCircle.style.WebkitTransform = 'rotate(' + loaderprocess * 3.6 + 'deg)';
                loaderCircle.style.MozTransform = 'rotate(' + loaderprocess * 3.6 + 'deg)';
                console.log(loaded + ':' + elm.length + ':' + loaderprocess);
                if (loaded == elm.length) {
                    clearInterval(timer);
                }
            }
        }

        percentage() {
            if (!per) {
                let processTxt = document.createElement('p');
                document.getElementById('overlay').appendChild(processTxt);
                processTxt.innerHTML = '0%';
                processTxt.id = 'loader-txt';
                processTxt.style.width = '40px';
                processTxt.style.height = '20px';
                processTxt.style.marginTop = '-10px';
                processTxt.style.marginLeft = '-20px';
                processTxt.style.color = '#fff';
                processTxt.style.fontSize = '20px';
                processTxt.style.textAlign = 'center';
                processTxt.style.position = 'absolute';
                processTxt.style.top = '50%';
                processTxt.style.left = '50%';
                processTxt.style.zIndex = '9999';
                per = true;
            } else {
                let processTxt = document.getElementById('loader-txt');
                processTxt.innerHTML = loaderprocess + '%';
            }
        }
    }

    let style = new loaderStyle();

    function loaderfunc() {
        switch (opts.loaderStyle) {
            case 'bar':
                style.bar();
                break;

            case 'circle':
                style.circle();
                break;
        }
        style.percentage();
    }

    let timer = setInterval(loaderfunc, 100);

    window.onload = () => {
        setTimeout(() => {
            let ov = document.getElementById('overlay');
            // document.body.removeChild(ov);
            clearInterval(timer);
        }, 1000);
    }
}

$.fn.pageloader.defaults = {
    backgroundColor: '#000',
    progressBarColor: '#fff',
    showPercentage: 'true',
    loaderStyle: 'bar',
    targetpreloadDOM: 'img',
};
