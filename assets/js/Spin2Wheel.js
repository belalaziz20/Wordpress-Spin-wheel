function Spin2WinWheel() {
    var Aa = location.hostname.substr(0, 3),
        t = this,
        z = document.querySelector(".wheelSVG"),
        d = document.querySelector(".wheel"),
        Q = document.querySelector(".wheelOutline"),
        u = document.querySelector(".peg"),
        ca = document.querySelector(".pegContainer"),
        Ba = document.querySelector(".mainContainer"),
        B = document.querySelector(".valueContainer"),
        da = document.querySelector(".centerCircle"),
        l = document.querySelector(".toast"),
        ea = document.querySelector(".toast p"),
        b, fa, ga, R, ha, S,
        n, ia, ja, ka, la, I, m, p, ma, na, oa, pa, qa, ra, T, v, x, A, k, sa, J, w = 0,
        f, g, D, c = 0,
        E = 2,
        K = 0,
        F = 0,
        U = F,
        V = [],
        ta, ua, W, X, L, va, wa, r, y = null,
        M, N, O, Y, q = [],
        Ca = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/wheel_tick.mp3"),
        e, C = !0,
        Z, xa = function() {
            TweenMax.set("svg", {
                visibility: "visible"
            });
            TweenMax.set(d, {
                svgOrigin: f + " " + g,
                x: 0,
                y: 0
            });
            TweenMax.set(u, {
                x: f - u.getBBox().width / 2,
                y: g - n - u.getBBox().height / 2,
                transformOrigin: "50% 25%",
                visibility: "visible"
            });
            TweenMax.set(ca, {
                transformOrigin: "50% 100%",
                scale: S / 600
            });
            TweenMax.set(Ba, {
                svgOrigin: f + " " + g,
                rotation: -90,
                x: 0,
                y: 0
            });
            TweenMax.set([l], {
                xPercent: -50,
                left: "50%"
            });
            TweenMax.set("svg", {
                xPercent: -50,
                left: "50%"
            })
        },
        Da = function() {
            for (var a = 0; a < x; a++) {
                var b = document.createElementNS("http://www.w3.org/2000/svg", "g");
                if ("image" == v[a].type) {
                    var d = document.createElementNS("http://www.w3.org/2000/svg", "image");
                    b.appendChild(d);
                    d.setAttribute("class", "wheelImage");
                    d.setAttributeNS(null, "x", f - I / 2);
                    d.setAttributeNS(null, "y", g - n + ka);
                    d.setAttributeNS(null, "width", I);
                    d.setAttributeNS(null,
                        "height", I);
                    d.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", ___wheel_js._plugin_url + '/assets/img/wheel' + ( a + 1 ) + '.png')
                } else if ("string" == v[a].type) {
                    var e = document.createElementNS("http://www.w3.org/2000/svg", "text"),
                        c, h;
                    if( v[a].value ) {
                        v[a].value.split("^").forEach(function(a, b) {
                            c = document.createTextNode(a);
                            h = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                            h.setAttributeNS(null, "dy", b ? "1.2em" : 0);
                            h.setAttributeNS(null, "x", f);
                            h.setAttributeNS(null, "text-anchor", "middle");
                            h.appendChild(c);
                            e.appendChild(h)
                        });
                    }
                    b.appendChild(e);
                    e.setAttribute("class",
                        "wheelText");
                    e.setAttributeNS(null, "fill", ia);
                    e.setAttributeNS(null, "x", f);
                    e.setAttributeNS(null, "y", g - n + ja);
                    e.style.fontSize = la
                }
                B.appendChild(b);
                TweenMax.set(b, {
                    svgOrigin: f + " " + g,
                    rotation: a * k
                })
            }
            TweenMax.set(B, {
                svgOrigin: f + " " + g
            })
        },
        Ea = function() {
            var a = document.createElementNS("http://www.w3.org/2000/svg", "g"),
                b = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            Q.appendChild(a);
            b.setAttributeNS(null, "fill", "transparent");
            b.setAttributeNS(null, "stroke", R);
            b.setAttributeNS(null, "stroke-width",
                ha);
            b.setAttributeNS(null, "cx", f);
            b.setAttributeNS(null, "cy", g);
            b.setAttributeNS(null, "r", n);
            a.appendChild(b);
            return a
        },
        Fa = function() {
            var a = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            //a.setAttributeNS(null, "fill", oa);
            a.setAttributeNS(null, "stroke", ma);
            a.setAttributeNS(null, "stroke-width", na);
            a.setAttributeNS(null, "cx", f);
            a.setAttributeNS(null, "cy", g);
            a.setAttributeNS(null, "r", qa);
            return a
        },
        Ga = function() {
            Ca.play()
        },
        Ha = function() {
            l.style.visibility = "hidden"
        },
        Ia = function() {
            l.style.visibility =
                "hidden";
            y.onclick = null;
            E += 2
        },
        Ja = function() {
            r || m[0].disable();
            C && (Y = VelocityTracker.track(d, "rotation"))
        },
        aa = function(a) {
            J = w;
            w = Math.round(d._gsTransform.rotation / k);
            w != J && TweenMax.fromTo(u, .2, {
                rotation: w > J ? -35 : 35
            }, {
                onStart: va ? Ga : null,
                rotation: 0,
                ease: Back.easeOut
            });
            TweenMax.set(B, {
                rotation: d._gsTransform.rotation
            })
        },
        Ka = function() {
            p = d._gsTransform.rotation;
            var a = Math.round(p % 360),
                a = 0 < a ? 360 - a : a,
                a = 0 > a ? a *= -1 : a;
            if (Y && .5 >= Y.getVelocity("rotation")) r || m[0].enable(), ba("invalidSpin");
            else {
                ba(Math.abs(Math.round(a /
                    k)));
                if (C)
                    if (-1 < A) c++;
                    else return;
                else c++, m[0].vars.snap = [e[c]];
                VelocityTracker.untrack(d);
                c >= A ? ya() : r || m[0].enable()
            }
        },
        La = function(a) {
            return function(b) {
                return Math.round(b / k) * k - a
            }
        },
        za = function() {
            m = Draggable.create(d, {
                type: "rotation",
                bounds: {
                    minRotation: -1E16,
                    maxRotation: 0
                },
                throwProps: !0,
                ease: Back.easeOut.config(.2),
                snap: C ? La(0) : [e[c]],
                throwResistance: 0,
                minDuration: ta,
                onThrowComplete: Ka,
                onPress: Ha,
                onDrag: aa,
                onThrowUpdate: aa,
                overshootTolerance: 1,
                onDragEnd: Ja
            })
        },
        G = function() {
            return function() {
                ThrowPropsPlugin.to(d, {
                    throwProps: {
                        rotation: {
                            velocity: Math.floor(201 * Math.random() + -700),
                            end: C ? -(k * Math.floor(Math.random() * (x - 0 + 1) + 0)) - 1080 * E : [e[c]]
                        }
                    },
                    onStart: Ia,
                    onUpdate: aa,
                    ease: Back.easeOut.config(.2),
                    overshootTolerance: 0,
                    onComplete: Ma
                })
            }
        },
        Ma = function() {
            p = d._gsTransform.rotation;
            var a = Math.round(p % 360),
                a = 0 < a ? 360 - a : a,
                a = 0 > a ? a *= -1 : a;
            ba(Math.abs(Math.round(a / k)));
            if (C)
                if (-1 < A) c++;
                else return;
            else c++;
            c >= A ? ya() : y.onclick = G()
        },
        ya = function() {
            r || m[0].disable();
            TweenMax.set(z, {
                alpha: .3
            });
            TweenMax.to(ea, 1, {
                text: ua,
                ease: Linear.easeNone,
                delay: 2
            });
            N({
                gameId: L,
                target: t,
                results: q
            })
        },
        ba = function(a) {
            r || m[0].applyBounds({
                minRotation: -1E16,
                maxRotation: p
            });
            "invalidSpin" == a ? (TweenMax.set(d, {
                rotation: e[c]
            }), H(W), a = {
                target: t,
                type: "error",
                spinCount: c,
                win: null,
                msg: W,
                gameId: L
            }, O(a), q.push(a)) : isNaN(a) || (H(v[a].resultText), a = {
                target: t,
                type: "result",
                spinCount: c,
                win: v[a].win,
                msg: v[a].resultText,
                gameId: L
            }, M(a), q.push(a))
        },
        P = function(a) {
            TweenMax.set([z, u], {
                visibility: "hidden"
            });
            H(a)
        },
        H = function(a) {
            l.style.visibility = "visible";
            l.style.backgroundColor =
                "#E81D62";
            ea.innerHTML = a;
            onresize();
            TweenMax.fromTo(l, .6, {
                y: "+=20",
                alpha: 0
            }, {
                y: Z,
                alpha: 1,
                delay: .2,
                ease: Elastic.easeOut.config(.7, .7)
            })
        };
    M = function(a) {
        t.onResult(a)
    };
    O = function(a) {
        t.onError(a)
    };
    N = function(a) {
        t.onGameEnd(a)
    };
    this.onResult = M;
    this.onError = O;
    this.onGameEnd = N;
    window.onresize = function() {
        var a = g - ga / 2;
        parseFloat(getComputedStyle(z).width);
        var b = parseFloat(getComputedStyle(z).height);
        parseFloat(getComputedStyle(l).width);
        var d = parseFloat(getComputedStyle(l).height);
        Z = (b + a) / 2 - d / 2;
        TweenMax.set(".toast", {
            y: Z
        })
    };
    this.getGameProgress = function() {
        return q
    };
    this.init = function(a) {
        //String.fromCharCode(101, 99, 50).toLowerCase() != Aa && (window.location.href = String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47) + (String.fromCharCode(71, 65, 78, 78, 79, 78) + String.fromCharCode(46) + String.fromCharCode(84, 86).toLowerCase()));
        if (a) {
            fa = a.data.svgWidth;
            ga = a.data.svgHeight;
            z.setAttribute("viewBox", "0 0 " + fa + " " + a.data.svgHeight);
            b = a.data;
            N = a.onGameEnd ? a.onGameEnd : t.onGameEnd;
            M = a.onResult ? a.onResult : t.onResult;
            O = a.onError ? a.onError : t.onError;
            (y = a.spinTrigger ? a.spinTrigger : null) && (r = !0);
            r && (y ? y.onclick = G() : d.onclick = G());
            R = b.wheelStrokeColor;
            S = b.wheelSize;
            n = S / 2;
            ia = b.wheelTextColor;
            R = b.wheelStrokeColor;
            ha = b.wheelStrokeWidth;
            ja = b.wheelTextOffsetY;
            ka = b.wheelImageOffsetY;
            I = b.wheelImageSize;
            la = b.wheelTextSize;
            ma = b.centerCircleStrokeColor;
            na = b.centerCircleStrokeWidth;
            oa = b.centerCircleFillColor;
            pa = b.centerCircleSize;
            qa = pa / 2;
            ra = b.segmentStrokeColor;
            T = b.segmentStrokeWidth;
            v = b.segmentValuesArray;
            x = v.length;
            A = -1 == b.numSpins ? 1E16 : parseInt(b.numSpins);
            ta = b.minSpinDuration;
            ua = b.gameOverText;
            W =
                b.invalidSpinText;
            X = b.introText;
            va = b.hasSound;
            L = b.gameId;
            r = b.clickToSpin;
            k = 360 / x;
            sa = k / 2;
            f = b.centerX;
            g = b.centerY;
            D = b.colorArray;
            wa = b.hasShadows;
            e = b.spinDestinationArray;
            wa && (Q.setAttributeNS(null, "filter", "url(#shadow)"), B.setAttributeNS(null, "filter", "url(#shadow)"), da.setAttributeNS(null, "filter", "url(#shadow)"), ca.setAttributeNS(null, "filter", "url(#shadow)"), l.style.boxShadow = "0px 0px 20px rgba(21,21,21,0.5)");
            xa();
            for (var c, m, u, p, h, w, q = 0; q < x; q++) F = -sa, U = F + k, a = f + n * Math.cos(Math.PI * F / 180), m = g + n *
                Math.sin(Math.PI * F / 180), c = f + n * Math.cos(Math.PI * U / 180), u = g + n * Math.sin(Math.PI * U / 180), p = "M" + f + "," + g + "  L" + a + "," + m + "  A" + n + "," + n + " 0 0,1 " + c + "," + u + "z", w = document.createElementNS("http://www.w3.org/2000/svg", "g"), h = document.createElementNS("http://www.w3.org/2000/svg", "path"), w.appendChild(h), d.appendChild(w), TweenMax.set(h, {
                    rotation: q * k,
                    svgOrigin: f + " " + g
                }), h.setAttributeNS(null, "d", p), D[q] ? p = D[q] : (p = D[K], K++, K == D.length && (K = 0)), h.setAttributeNS(null, "stroke", 0), V.push({
                    path: h,
                    x1: a,
                    x2: c,
                    y1: m,
                    y2: u
                });
            if (0 < T)
                for (a = 0; a < x; a++) c = document.createElementNS("http://www.w3.org/2000/svg", "line"), c.setAttributeNS(null, "x1", f), c.setAttributeNS(null, "x2", V[a].x2), c.setAttributeNS(null, "y1", g), c.setAttributeNS(null, "y2", V[a].y2), c.setAttributeNS(null, "stroke", ra), c.setAttributeNS(null, "stroke-width", T), d.appendChild(c), TweenMax.set(c, {
                    svgOrigin: f + " " + g,
                    rotation: a * k
                });
            Da();
            Q.appendChild(Ea());
            da.appendChild(Fa());
            a: if (0 == A) P("numSpins MUST BE GREATER THAN 0");
                else {
                    if (0 < e.length)
                        for (C = !1,
                            A = e.length, a = 0; a < e.length; a++) {
                            if (e[a] > x || 0 === e[a]) {
                                P("Invalid destination set - please ensure the destination in spinDestinationArray is greater than 0 and less than or equal to the number of segments");
                                l.style.backgroundColor = "red";
                                break a
                            }--e[a];
                            e[a] = -1 * e[a] * k - 1080 * E;
                            E += 2
                        }
                    r ? y ? y.onclick = G() : (y = d, d.onclick = G()) : za();
                    TweenMax.delayedCall(.1, H, [X])
                } 1 >= x && (P("Not enough segments. Please add more entries to segmentValuesArray"), TweenMax.set(z, {
                visibility: "hidden"
            }), l.style.backgroundColor = "red")
        } else xa(),
            P("PLEASE INCLUDE THE INIT OBJECT")
    };
    this.restart = function() {
        r || (m[0].kill(), w = J = null, TweenMax.to([d, B], .3, {
            rotation: "0_short",
            onComplete: za
        }));
        TweenMax.set(z, {
            alpha: 1
        });
        TweenMax.to([d, B], .3, {
            rotation: "0_short"
        });
        l.style.visibility = "hidden";
        c = 0;
        E = 2;
        q = [];
        TweenMax.delayedCall(.1, H, [X])
    }
};