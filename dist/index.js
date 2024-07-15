"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/digerati/skipToMainContent.ts
  var skipToMainContent = () => {
    const trigger = document.querySelector('[dd-skip-to-main-content="trigger"]'), target = document.querySelector('[dd-skip-to-main-content="target"]');
    if (!trigger || !target) {
      return;
    }
    ["click", "keypress"].forEach((event) => {
      trigger.addEventListener(event, (e) => {
        if (e.type === "keydown" && e.which !== 13) {
          return;
        }
        e.preventDefault();
        target.setAttribute("tabindex", "-1");
        target.focus();
      });
    });
  };

  // src/digerati/currentYear.ts
  var currentYear = () => {
    const target = document.querySelector('[dd-date="current-year"]');
    if (!target) {
      return;
    }
    const fullYear = (/* @__PURE__ */ new Date()).getFullYear();
    target.innerText = fullYear.toString();
  };

  // src/digerati/staggerTextOnHover.ts
  var staggerTextOnHover = () => {
    let splitText;
    const runSplit = () => {
      splitText = new SplitType('[dd-stagger-text="link"]', {
        types: "words, chars"
      });
    };
    runSplit();
    const staggerLinks = document.querySelectorAll('[dd-stagger-text="link"]');
    staggerLinks.forEach((link) => {
      const letters = link.querySelectorAll('[dd-stagger-text="letters"] .char');
      link.addEventListener("mouseenter", function() {
        gsap.to(letters, {
          yPercent: -100,
          duration: 0.5,
          ease: "power4.out",
          stagger: {
            each: 0.025,
            from: "start"
          },
          overwrite: true
        });
      });
      link.addEventListener("mouseleave", function() {
        gsap.to(letters, {
          yPercent: 0,
          duration: 0.5,
          ease: "power4.out",
          stagger: {
            each: 0.025
          }
        });
      });
    });
    let windowWidth = $(window).innerWidth();
    window.addEventListener("resize", function() {
      if (windowWidth !== $(window).innerWidth()) {
        windowWidth = $(window).innerWidth();
        splitText.revert();
        runSplit();
      }
    });
  };

  // src/digerati/mouseTrail.ts
  var mouseTrail = () => {
    const fxContainer = document.querySelector('[dd-mouse-trail="fx-container"]');
    if (fxContainer) {
      for (let i = 0; i < 500; i++) {
        const fx = document.createElement("i");
        fxContainer.appendChild(fx);
      }
    }
  };

  // src/index.ts
  String.prototype.toDOMElements = function() {
    let i, d = document, a = d.createElement("div"), b = d.createDocumentFragment();
    a.innerHTML = this;
    while (i = a.firstChild) {
      b.appendChild(i);
    }
    ;
    return b;
  };
  var styleToString = (style) => {
    let selector = Object.keys(style)[0], rules = Object.values(style)[0], cssStyles = selector + " {\n" + Object.keys(rules).reduce((acc, key) => acc + key.split(/(?=[A-Z])/).join("-").toLowerCase() + ": " + (rules[key] !== "" ? rules[key] : '""') + ";\n", "") + "}\n";
    return cssStyles;
  };
  var HeroAnimationCssStyles = class {
    constructor(cols, rows, bgColor, shapeHeight, shapeWidth) {
      this.cols = cols;
      this.rows = rows;
      this.bgColor = bgColor;
      this.shapeHeight = shapeHeight;
      this.shapeWidth = shapeWidth;
      this.cells = this.cols * this.rows;
      this.cssStyles = "";
    }
    convertPxToRem(pixels) {
      return parseInt(pixels) / 16;
    }
    getNthShape(num, translateX, translateY) {
      return {
        [".hero-animation_mask:nth-child(" + num + ")"]: {
          "transform": "translate(" + translateX + ", " + translateY + ")"
        }
      };
    }
    init() {
      this.cssStyles += styleToString({
        "body": {
          "position": "relative",
          "margin": 0
        }
      });
      this.cssStyles += styleToString({
        ".hero-animation_container": {
          "display": "grid",
          "grid-template-columns": "repeat(" + this.cols + ", " + this.convertPxToRem(this.shapeWidth) + "rem)",
          "grid-template-rows": "repeat(" + this.rows + ", " + this.convertPxToRem(this.shapeHeight) + "rem)",
          "left": 0,
          "top": 0,
          "right": 0,
          "bottom": 0
        }
      });
      this.cssStyles += styleToString({
        ".hero-animation_mask": {
          "width": this.convertPxToRem(this.shapeWidth) + "rem",
          "height": this.convertPxToRem(this.shapeHeight) + "rem",
          "-webkit-clip-path": "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
          "clip-path": "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)"
        }
      });
      this.cssStyles += styleToString({
        ".hero-animation_shape": {
          "width": this.convertPxToRem(this.shapeWidth) + "rem",
          "height": this.convertPxToRem(this.shapeHeight) + "rem"
        }
      });
      for (let i = 1; i < this.cells; i++) {
        if (i > this.cols) {
          this.cssStyles += styleToString(this.getNthShape(i, "-50%", "-25%"));
        }
        if (i > this.cols * 2) {
          this.cssStyles += styleToString(this.getNthShape(i, "0%", "-50%"));
        }
        if (i > this.cols * 3) {
          this.cssStyles += styleToString(this.getNthShape(i, "-50%", "-75%"));
        }
        if (i > this.cols * 4) {
          this.cssStyles += styleToString(this.getNthShape(i, "0%", "-100%"));
        }
        if (i > this.cols * 5) {
          this.cssStyles += styleToString(this.getNthShape(i, "-50%", "-125%"));
        }
      }
      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = this.cssStyles;
      document.head.appendChild(style);
    }
  };
  var HeroAnimationHtml = class {
    constructor() {
      this.htmlString = "";
    }
    generateSvgs() {
      for (let i = 0; i < 60; i++) {
        this.htmlString += '<div class="hero-animation_mask">\n<svg class="hero-animation_shape" viewBox="0 0 100 115" preserveAspectRatio="xMidYMin slice">\n';
        this.generatePolygon(0, "hsl(0,0%,45%)");
        this.generatePolygon(1, "hsl(0,0%,45%)");
        this.generatePolygon(2, "hsl(0,0%,45%)");
        this.generatePolygon(3, "hsl(0,0%,45%)");
        this.htmlString += "</svg>\n</div>\n";
      }
    }
    generatePolygon(num, color) {
      this.htmlString += '<polygon points="" fill="none" stoke="currentColor"stroke-width="5">';
      this.generateAnimate(num);
      this.htmlString += "</polygon>\n";
    }
    generateAnimate(num) {
      this.htmlString += '<animate attributeName="points" repeatCount="indefinite" dur="4s" begin="' + num + 's" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>\n';
    }
    init() {
      this.generateSvgs();
      this.render();
    }
    render() {
      const heroAnimation = document.querySelector('[dd-hero-animation="target"]');
      heroAnimation.appendChild(this.htmlString.toDOMElements());
    }
  };
  window.Webflow || [];
  window.Webflow.push(() => {
    skipToMainContent();
    currentYear();
    staggerTextOnHover();
    mouseTrail();
    const css = new HeroAnimationCssStyles(10, 6, "#FFFFFF", 230, 200);
    const html = new HeroAnimationHtml();
    css.init();
    html.init();
  });
})();
//# sourceMappingURL=index.js.map
