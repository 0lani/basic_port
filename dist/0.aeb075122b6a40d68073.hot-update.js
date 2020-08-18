webpackHotUpdate(0, {
    /***/ OkGs: 
    /*!**************************************************************!*\
  !*** ./src/Components/SitePagesLayout/Sections/Projects.jsx ***!
  \**************************************************************/
    /*! no static exports found */
    /*! all exports used */
    /***/ function(e, t, a) {
        "use strict";
        /* WEBPACK VAR INJECTION */        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0, a(/*! antd/es/back-top/style */ "4eJr");
            var n = u(a(/*! antd/es/back-top */ "3LgI"));
            a(/*! antd/es/tabs/style */ "Znn+");
            var o = u(a(/*! antd/es/tabs */ "ZTPi")), r = function(e) {
                if (e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var t = s();
                if (t && t.has(e)) return t.get(e);
                var a = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var o in e) if (Object.prototype.hasOwnProperty.call(e, o)) {
                    var r = n ? Object.getOwnPropertyDescriptor(e, o) : null;
                    r && (r.get || r.set) ? Object.defineProperty(a, o, r) : a[o] = e[o];
                }
                a.default = e, t && t.set(e, a);
                return a;
            }(a(/*! react */ "q1tI")), i = (a(/*! antd */ "gdfu"), u(a(/*! prismjs/components/prism-core */ "jHpe")));
            a(/*! prismjs/components/prism-clike */ "y1X9"), a(/*! prismjs/components/prism-javascript */ "QWvX"), 
            a(/*! prismjs/plugins/line-numbers/prism-line-numbers.css */ "TpNv"), a(/*! prismjs/plugins/line-numbers/prism-line-numbers */ "wPEV"), 
            a(/*! prismjs/themes/prism-twilight.css */ "kr82"), a(/*! ../../../resources/less/projects.less */ "WoYj");
            var l, d = u(a(/*! ../../../resources/images/laptop.png */ "hck8")), c = u(a(/*! ../../../resources/images/mobile.jpg */ "w52t"));
            function s() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap;
                return s = function() {
                    return e;
                }, e;
            }
            function u(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            (l = "undefined" != typeof reactHotLoaderGlobal ? reactHotLoaderGlobal.enterModule : void 0) && l(e);
            var f = "undefined" != typeof reactHotLoaderGlobal ? reactHotLoaderGlobal.default.signature : function(e) {
                return e;
            };
            const m = () => {
                const [e, t] = (0, r.useState)({
                    device1: null,
                    device2: null,
                    load: !1
                }), {TabPane: a} = o.default, l = {
                    backgroundColor: "rgb(228, 228, 228)",
                    height: "75vh",
                    width: "95%",
                    margin: "0px auto 3rem",
                    borderRadius: "2rem",
                    padding: "4rem"
                }, s = {
                    height: "50vh",
                    width: "50vw",
                    margin: "0 auto",
                    position: "absolute",
                    top: "10%",
                    left: "25%"
                }, u = '\n    {\n      "@ant-design/icons": "^4.2.2",\n      "@emotion/core": "^10.0.28",\n      "@emotion/styled": "^10.0.27",\n      "@theme-ui/presets": "^0.3.0",\n      "antd": "^3.12.3",\n      "babel-plugin-prismjs": "^2.0.1",\n      "classnames": "^2.2.6",\n      "dotenv": "^8.2.0",\n      "less": "^3.9.0",\n      "path": "^0.12.7",\n      "prismjs": "^1.21.0",\n      "react": "^16.6.3",\n      "react-dom": "^16.6.3",\n      "react-helmet": "^5.2.0",\n      "react-hot-loader": "^4.12.21",\n      "react-loadable": "^5.5.0",\n      "react-router-dom": "^5.2.0",\n      "react-spring": "^8.0.27",\n      "react-three-fiber": "^4.2.19",\n      "react-visibility-sensor": "^5.1.1",\n      "tailwindcss": "^1.6.0",\n      "theme-ui": "^0.3.1",\n      "three": "^0.119.1"\n    }  \n  '.trim(), f = [ {
                    object: "model",
                    // Swivel the device from -30 to 0 degrees
                    move: "rotation",
                    axis: "y",
                    duration: 1500,
                    easing: "swingTo",
                    from: -30
                }, {
                    object: "camera",
                    // Move the camera down by 3 units
                    move: "position",
                    axis: "y",
                    duration: 2e3,
                    easing: "easeOutQuad",
                    from: 3
                }, {
                    object: "camera",
                    // Move the camera forward by 20 units
                    move: "position",
                    axis: "z",
                    duration: 2e3,
                    easing: "easeOutQuad",
                    from: 20
                }, {
                    object: "camera",
                    // Rotate the camera on the X axis from -5 to 0 degrees
                    move: "rotation",
                    axis: "x",
                    duration: 2e3,
                    easing: "easeOutQuad",
                    from: -5
                } ];
                return (0, r.useEffect)(() => {
                    let e, a;
                    i.default.highlightAll();
                    const n = document.getElementById("main-laptop");
                    console.log({
                        window,
                        laptop: n
                    }, "on mount");
                    const o = document.createElement("script");
                    o.type = "text/javascript", o.src = "./public/deviceful.min.js", document.body.appendChild(o), 
                    o.onload = () => {
                        n && (console.log({
                            window
                        }, "after script loads"), e = new Deviceful({
                            parent: "#main-laptop",
                            device: "laptop",
                            screenshot: d.default,
                            screenshotHeight: 2402
                        }), a = new Deviceful({
                            parent: "#docs-phone",
                            device: "phone",
                            screenshot: c.default,
                            screenshotHeight: 2792
                        }), e.mount(), a.mount(), t({
                            device1: e,
                            device2: a,
                            load: !0
                        }));
                    };
                }, [ t ]),  r.default.createElement(r.default.Fragment, null,  r.default.createElement("article", null,  r.default.createElement(o.default, {
                    style: l,
                    tabPosition: "left",
                    type: "card",
                    keyboard: !0,
                    defaultActiveKey: "2",
                    onTabClick: (t, a) => {
                        console.log({
                            key: t
                        }, {
                            driveIn: f
                        }, "in tab function"), "1" === t ? (e.device1.animate(f), e.device1.scroll({
                            direction: "down",
                            // 'up' or 'down'
                            duration: 2e3,
                            // in milliseconds
                            easing: "easeOutQuad"
                        })) : e.device1.scroll({
                            direction: "up",
                            // 'up' or 'down'
                            duration: 2e3,
                            // in milliseconds
                            easing: "easeOutQuad"
                        });
                    }
                },  r.default.createElement(a, {
                    forceRender: !0,
                    tab: "Site",
                    key: "1"
                },  r.default.createElement("div", {
                    id: "main-laptop",
                    style: s
                })),  r.default.createElement(a, {
                    forceRender: !0,
                    tab: "Dependencies",
                    key: "2"
                },  r.default.createElement("pre", {
                    className: "line-numbers"
                },  r.default.createElement("code", {
                    className: "language-js"
                }, u)))),  r.default.createElement(o.default, {
                    style: l,
                    tabPosition: "left",
                    type: "card",
                    keyboard: !0,
                    defaultActiveKey: "2",
                    onTabClick: (t, a) => {
                        console.log({
                            key: t
                        }, {
                            driveIn: f
                        }, "in tab function"), "1" === t ? (e.device2.animate(f), e.device2.scroll({
                            direction: "down",
                            // 'up' or 'down'
                            duration: 2e3,
                            // in milliseconds
                            easing: "easeOutQuad"
                        })) : e.device2.scroll({
                            direction: "up",
                            // 'up' or 'down'
                            duration: 2e3,
                            // in milliseconds
                            easing: "easeOutQuad"
                        });
                    }
                },  r.default.createElement(a, {
                    forceRender: !0,
                    tab: "Site",
                    key: "1"
                },  r.default.createElement("div", {
                    id: "docs-phone",
                    style: s
                })),  r.default.createElement(a, {
                    forceRender: !0,
                    tab: "Dependencies",
                    key: "2"
                },  r.default.createElement("pre", {
                    className: "line-numbers"
                },  r.default.createElement("code", {
                    className: "language-js"
                }, u)))),  r.default.createElement(n.default, null,  r.default.createElement("div", {
                    id: "backUp"
                }, "Top"))));
            };
            f(m, "useState{[state, stateFunc]({device1: null, device2: null, load: false})}\nuseEffect{}");
            const p = m;
            var v, b, g = p;
            t.default = g, (v = "undefined" != typeof reactHotLoaderGlobal ? reactHotLoaderGlobal.default : void 0) && (v.register(m, "ProjectContainer", "/home/_boredasfawk_/Documents/language-dir/javascript_dir/resume/basic_portfolio/src/Components/SitePagesLayout/Sections/Projects.jsx"), 
            v.register(p, "default", "/home/_boredasfawk_/Documents/language-dir/javascript_dir/resume/basic_portfolio/src/Components/SitePagesLayout/Sections/Projects.jsx")), 
            (b = "undefined" != typeof reactHotLoaderGlobal ? reactHotLoaderGlobal.leaveModule : void 0) && b(e);
        }).call(this, a(/*! ./../../../../node_modules/webpack/buildin/module.js */ "YuTi")(e))
        /***/;
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ29tcG9uZW50cy9TaXRlUGFnZXNMYXlvdXQvU2VjdGlvbnMvUHJvamVjdHMuanN4Il0sIm5hbWVzIjpbIlByb2plY3RDb250YWluZXIiLCJzdGF0ZSIsInN0YXRlRnVuYyIsInVzZVN0YXRlIiwiZGV2aWNlMSIsImRldmljZTIiLCJsb2FkIiwiVGFiUGFuZSIsImNvbnRlbnRTdHlsZSIsImJhY2tncm91bmRDb2xvciIsImhlaWdodCIsIndpZHRoIiwibWFyZ2luIiwiYm9yZGVyUmFkaXVzIiwicGFkZGluZyIsImNhbnZhc1N0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiY29kZSIsInRyaW0iLCJkcml2ZUluIiwib2JqZWN0IiwibW92ZSIsImF4aXMiLCJkdXJhdGlvbiIsImVhc2luZyIsImZyb20iLCJ1c2VFZmZlY3QiLCJQcmlzbSIsImhpZ2hsaWdodEFsbCIsImxhcHRvcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25zb2xlIiwibG9nIiwid2luZG93Iiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJzcmMiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJvbmxvYWQiLCJEZXZpY2VmdWwiLCJwYXJlbnQiLCJkZXZpY2UiLCJzY3JlZW5zaG90IiwibGFwSW1nIiwic2NyZWVuc2hvdEhlaWdodCIsInBob25lSW1nIiwibW91bnQiLCJGcmFnbWVudCIsInN0eWxlIiwidGFiUG9zaXRpb24iLCJrZXlib2FyZCIsImRlZmF1bHRBY3RpdmVLZXkiLCJvblRhYkNsaWNrIiwia2V5IiwiZXZlbnQiLCJhbmltYXRlIiwic2Nyb2xsIiwiZGlyZWN0aW9uIiwiZm9yY2VSZW5kZXIiLCJ0YWIiLCJpZCIsImNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O3NEQUFBLEk7Ozs7Ozs7Ozs7Ozs7O2FBQUEsMEIsS0FDQSx1Qjs7O2dFQUVBO1lBQ0EsSSxHQUFBLDhEQUNBOzs7Ozs7Ozs7Ozs7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LFFBQVFDLElBQUk7NEJBQUN1QjsyQkFBTTs0QkFBQ3JDOzJCQUFVLG9CQUNsQixRQUFScUMsS0FDRnpELEVBQU1JLFFBQVF1RCxRQUFRdkMsSUFDdEJwQixFQUFNSSxRQUFRd0QsT0FBTzs0QkFDbkJDLFdBQVc7OzRCQUNYckMsVUFBVTs7NEJBQ1ZDLFFBQVE7OEJBR1Z6QixFQUFNSSxRQUFRd0QsT0FBTzs0QkFDbkJDLFdBQVc7OzRCQUNYckMsVUFBVTs7NEJBQ1ZDLFFBQVE7OztvQkFJZCx3QkFBQ25CLEdBQUQ7b0JBQVN3RCxjQUFhO29CQUFNQyxLQUFJO29CQUFPTixLQUFJO29CQUN6QztvQkFBS08sSUFBRztvQkFBYVosT0FBT3RDO3NCQUU5Qix3QkFBQ1IsR0FBRDtvQkFBU3dELGNBQWE7b0JBQU1DLEtBQUk7b0JBQWVOLEtBQUk7b0JBQ2pEO29CQUFLUSxXQUFVO29CQUNiO29CQUFNQSxXQUFVO21CQUFlL0MsUUFLckMsMENBQ0U7b0JBQUs4QyxJQUFHO21CQUFSOztjQXhMSmpFLEc7c0JBK0xTQTs7bUlBL0xUQSxHIiwiZmlsZSI6IjAuYWViMDc1MTIyYjZhNDBkNjgwNzMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQmFja1RvcCwgVGFic30gZnJvbSAnYW50ZCc7XG5pbXBvcnQgUHJpc20gZnJvbSAncHJpc21qcyc7XG5pbXBvcnQgXCIuLi8uLi8uLi9yZXNvdXJjZXMvbGVzcy9wcm9qZWN0cy5sZXNzXCJcbmltcG9ydCBsYXBJbWcgZnJvbSAnLi4vLi4vLi4vcmVzb3VyY2VzL2ltYWdlcy9sYXB0b3AucG5nJ1xuaW1wb3J0IHBob25lSW1nIGZyb20gJy4uLy4uLy4uL3Jlc291cmNlcy9pbWFnZXMvbW9iaWxlLmpwZydcblxuY29uc3QgUHJvamVjdENvbnRhaW5lciA9ICgpID0+IHtcbiAgY29uc3QgW3N0YXRlLCBzdGF0ZUZ1bmNdID0gdXNlU3RhdGUoe2RldmljZTE6IG51bGwsIGRldmljZTI6IG51bGwsIGxvYWQ6IGZhbHNlfSk7XG5cbiAgY29uc3QgeyBUYWJQYW5lIH0gPSBUYWJzO1xuICBjb25zdCBjb250ZW50U3R5bGUgPSB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDIyOCwgMjI4LCAyMjgpJywgXG4gICAgaGVpZ2h0OiAnNzV2aCcsXG4gICAgd2lkdGg6ICc5NSUnLFxuICAgIG1hcmdpbjogJzBweCBhdXRvIDNyZW0nLFxuICAgIGJvcmRlclJhZGl1czogJzJyZW0nLFxuICAgIHBhZGRpbmc6ICc0cmVtJ1xuICB9O1xuXG4gIGNvbnN0IGNhbnZhc1N0eWxlID0ge1xuICAgIGhlaWdodDogJzUwdmgnLFxuICAgIHdpZHRoOiAnNTB2dycsXG4gICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6ICcxMCUnLFxuICAgIGxlZnQ6ICcyNSUnXG4gIH07XG5cbiAgY29uc3QgY29kZSA9YFxuICAgIHtcbiAgICAgIFwiQGFudC1kZXNpZ24vaWNvbnNcIjogXCJeNC4yLjJcIixcbiAgICAgIFwiQGVtb3Rpb24vY29yZVwiOiBcIl4xMC4wLjI4XCIsXG4gICAgICBcIkBlbW90aW9uL3N0eWxlZFwiOiBcIl4xMC4wLjI3XCIsXG4gICAgICBcIkB0aGVtZS11aS9wcmVzZXRzXCI6IFwiXjAuMy4wXCIsXG4gICAgICBcImFudGRcIjogXCJeMy4xMi4zXCIsXG4gICAgICBcImJhYmVsLXBsdWdpbi1wcmlzbWpzXCI6IFwiXjIuMC4xXCIsXG4gICAgICBcImNsYXNzbmFtZXNcIjogXCJeMi4yLjZcIixcbiAgICAgIFwiZG90ZW52XCI6IFwiXjguMi4wXCIsXG4gICAgICBcImxlc3NcIjogXCJeMy45LjBcIixcbiAgICAgIFwicGF0aFwiOiBcIl4wLjEyLjdcIixcbiAgICAgIFwicHJpc21qc1wiOiBcIl4xLjIxLjBcIixcbiAgICAgIFwicmVhY3RcIjogXCJeMTYuNi4zXCIsXG4gICAgICBcInJlYWN0LWRvbVwiOiBcIl4xNi42LjNcIixcbiAgICAgIFwicmVhY3QtaGVsbWV0XCI6IFwiXjUuMi4wXCIsXG4gICAgICBcInJlYWN0LWhvdC1sb2FkZXJcIjogXCJeNC4xMi4yMVwiLFxuICAgICAgXCJyZWFjdC1sb2FkYWJsZVwiOiBcIl41LjUuMFwiLFxuICAgICAgXCJyZWFjdC1yb3V0ZXItZG9tXCI6IFwiXjUuMi4wXCIsXG4gICAgICBcInJlYWN0LXNwcmluZ1wiOiBcIl44LjAuMjdcIixcbiAgICAgIFwicmVhY3QtdGhyZWUtZmliZXJcIjogXCJeNC4yLjE5XCIsXG4gICAgICBcInJlYWN0LXZpc2liaWxpdHktc2Vuc29yXCI6IFwiXjUuMS4xXCIsXG4gICAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjEuNi4wXCIsXG4gICAgICBcInRoZW1lLXVpXCI6IFwiXjAuMy4xXCIsXG4gICAgICBcInRocmVlXCI6IFwiXjAuMTE5LjFcIlxuICAgIH0gIFxuICBgLnRyaW0oKTtcblxuICBjb25zdCBkcml2ZUluID0gW1xuICAgIHtcbiAgICAgIG9iamVjdDogXCJtb2RlbFwiLCAvLyBTd2l2ZWwgdGhlIGRldmljZSBmcm9tIC0zMCB0byAwIGRlZ3JlZXNcbiAgICAgIG1vdmU6IFwicm90YXRpb25cIixcbiAgICAgIGF4aXM6IFwieVwiLFxuICAgICAgZHVyYXRpb246IDE1MDAsXG4gICAgICBlYXNpbmc6IFwic3dpbmdUb1wiLFxuICAgICAgZnJvbTogLTMwLFxuICAgIH0sXG4gICAge1xuICAgICAgb2JqZWN0OiBcImNhbWVyYVwiLCAvLyBNb3ZlIHRoZSBjYW1lcmEgZG93biBieSAzIHVuaXRzXG4gICAgICBtb3ZlOiBcInBvc2l0aW9uXCIsXG4gICAgICBheGlzOiBcInlcIixcbiAgICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgICAgZWFzaW5nOiBcImVhc2VPdXRRdWFkXCIsXG4gICAgICBmcm9tOiAzLFxuICAgIH0sXG4gICAge1xuICAgICAgb2JqZWN0OiBcImNhbWVyYVwiLCAvLyBNb3ZlIHRoZSBjYW1lcmEgZm9yd2FyZCBieSAyMCB1bml0c1xuICAgICAgbW92ZTogXCJwb3NpdGlvblwiLFxuICAgICAgYXhpczogXCJ6XCIsXG4gICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgIGVhc2luZzogXCJlYXNlT3V0UXVhZFwiLFxuICAgICAgZnJvbTogMjAsXG4gICAgfSxcbiAgICB7XG4gICAgICBvYmplY3Q6IFwiY2FtZXJhXCIsIC8vIFJvdGF0ZSB0aGUgY2FtZXJhIG9uIHRoZSBYIGF4aXMgZnJvbSAtNSB0byAwIGRlZ3JlZXNcbiAgICAgIG1vdmU6IFwicm90YXRpb25cIixcbiAgICAgIGF4aXM6IFwieFwiLFxuICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICBlYXNpbmc6IFwiZWFzZU91dFF1YWRcIixcbiAgICAgIGZyb206IC01LFxuICAgIH0sXG4gIF07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBQcmlzbS5oaWdobGlnaHRBbGwoKTtcblxuICAgIGxldCBkZXZpY2UxLGRldmljZTI7XG4gICAgY29uc3QgbGFwdG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tbGFwdG9wJyk7XG5cbiAgICBjb25zb2xlLmxvZyh7d2luZG93OiB3aW5kb3csIGxhcHRvcH0sICdvbiBtb3VudCcpO1xuICBcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSBcIi4vcHVibGljL2RldmljZWZ1bC5taW4uanNcIjtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZihsYXB0b3ApIHtcbiAgICAgICAgY29uc29sZS5sb2coe3dpbmRvdzogd2luZG93fSwgJ2FmdGVyIHNjcmlwdCBsb2FkcycpO1xuICAgICAgICBkZXZpY2UxID0gbmV3IERldmljZWZ1bCh7XG4gICAgICAgICAgcGFyZW50OiAnI21haW4tbGFwdG9wJyxcbiAgICAgICAgICBkZXZpY2U6ICdsYXB0b3AnLFxuICAgICAgICAgIHNjcmVlbnNob3Q6IGxhcEltZyxcbiAgICAgICAgICBzY3JlZW5zaG90SGVpZ2h0OiAyNDAyLFxuICAgICAgICB9KTtcblxuICAgICAgICBkZXZpY2UyID0gbmV3IERldmljZWZ1bCh7XG4gICAgICAgICAgcGFyZW50OiAnI2RvY3MtcGhvbmUnLFxuICAgICAgICAgIGRldmljZTogJ3Bob25lJyxcbiAgICAgICAgICBzY3JlZW5zaG90OiBwaG9uZUltZyxcbiAgICAgICAgICBzY3JlZW5zaG90SGVpZ2h0OiAyNzkyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRldmljZTEubW91bnQoKTtcbiAgICAgICAgZGV2aWNlMi5tb3VudCgpO1xuXG4gICAgICAgIHN0YXRlRnVuYyh7ZGV2aWNlMTogZGV2aWNlMSwgZGV2aWNlMjogZGV2aWNlMiwgbG9hZDogdHJ1ZX0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW3N0YXRlRnVuY10pO1xuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPGFydGljbGUgPlxuICAgICAgICA8VGFicyBzdHlsZT17Y29udGVudFN0eWxlfSB0YWJQb3NpdGlvbj1cImxlZnRcIiB0eXBlPVwiY2FyZFwiIGtleWJvYXJkPXt0cnVlfSBkZWZhdWx0QWN0aXZlS2V5PVwiMlwiXG4gICAgICAgICAgb25UYWJDbGljaz17KGtleSxldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHtrZXl9LCB7ZHJpdmVJbn0sICdpbiB0YWIgZnVuY3Rpb24nKTtcbiAgICAgICAgICBpZigoa2V5ID09PSBcIjFcIikpe1xuICAgICAgICAgICAgc3RhdGUuZGV2aWNlMS5hbmltYXRlKGRyaXZlSW4pO1xuICAgICAgICAgICAgc3RhdGUuZGV2aWNlMS5zY3JvbGwoe1xuICAgICAgICAgICAgICBkaXJlY3Rpb246ICdkb3duJywgLy8gJ3VwJyBvciAnZG93bidcbiAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8vIGluIG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCcgLy8gZGVmYXVsdFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUuZGV2aWNlMS5zY3JvbGwoe1xuICAgICAgICAgICAgICBkaXJlY3Rpb246ICd1cCcsIC8vICd1cCcgb3IgJ2Rvd24nXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvLyBpbiBtaWxsaXNlY29uZHNcbiAgICAgICAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnIC8vIGRlZmF1bHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9fT5cbiAgICAgICAgICA8VGFiUGFuZSBmb3JjZVJlbmRlcj17dHJ1ZX0gdGFiPVwiU2l0ZVwiIGtleT1cIjFcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJtYWluLWxhcHRvcFwiIHN0eWxlPXtjYW52YXNTdHlsZX0vPlxuICAgICAgICAgIDwvVGFiUGFuZT5cbiAgICAgICAgICA8VGFiUGFuZSBmb3JjZVJlbmRlcj17dHJ1ZX0gdGFiPVwiRGVwZW5kZW5jaWVzXCIga2V5PVwiMlwiPlxuICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJsaW5lLW51bWJlcnNcIj5cbiAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwibGFuZ3VhZ2UtanNcIj57Y29kZX08L2NvZGU+XG4gICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICA8L1RhYlBhbmU+XG4gICAgICAgIDwvVGFicz5cblxuICAgICAgICA8VGFicyBzdHlsZT17Y29udGVudFN0eWxlfSB0YWJQb3NpdGlvbj1cImxlZnRcIiB0eXBlPVwiY2FyZFwiIGtleWJvYXJkPXt0cnVlfSBkZWZhdWx0QWN0aXZlS2V5PVwiMlwiXG4gICAgICAgICAgb25UYWJDbGljaz17KGtleSxldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coe2tleX0sIHtkcml2ZUlufSwgJ2luIHRhYiBmdW5jdGlvbicpO1xuICAgICAgICAgICAgaWYoKGtleSA9PT0gXCIxXCIpKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmRldmljZTIuYW5pbWF0ZShkcml2ZUluKTtcbiAgICAgICAgICAgICAgc3RhdGUuZGV2aWNlMi5zY3JvbGwoe1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ2Rvd24nLCAvLyAndXAnIG9yICdkb3duJ1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvLyBpbiBtaWxsaXNlY29uZHNcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCcgLy8gZGVmYXVsdFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RhdGUuZGV2aWNlMi5zY3JvbGwoe1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ3VwJywgLy8gJ3VwJyBvciAnZG93bidcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy8gaW4gbWlsbGlzZWNvbmRzXG4gICAgICAgICAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnIC8vIGRlZmF1bHRcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfX0+XG4gICAgICAgICAgPFRhYlBhbmUgZm9yY2VSZW5kZXI9e3RydWV9IHRhYj1cIlNpdGVcIiBrZXk9XCIxXCI+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZG9jcy1waG9uZVwiIHN0eWxlPXtjYW52YXNTdHlsZX0vPlxuICAgICAgICAgIDwvVGFiUGFuZT5cbiAgICAgICAgICA8VGFiUGFuZSBmb3JjZVJlbmRlcj17dHJ1ZX0gdGFiPVwiRGVwZW5kZW5jaWVzXCIga2V5PVwiMlwiPlxuICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJsaW5lLW51bWJlcnNcIj5cbiAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwibGFuZ3VhZ2UtanNcIj57Y29kZX08L2NvZGU+XG4gICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICA8L1RhYlBhbmU+XG4gICAgICAgIDwvVGFicz5cblxuICAgICAgICA8QmFja1RvcD5cbiAgICAgICAgICA8ZGl2IGlkPVwiYmFja1VwXCI+VG9wPC9kaXY+XG4gICAgICAgIDwvQmFja1RvcD5cbiAgICAgIDwvYXJ0aWNsZT5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RDb250YWluZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==