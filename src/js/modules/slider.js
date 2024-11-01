const slider = () => {
    const sliderWrapper = document.querySelector(".grid__item").offsetWidth;
    const next = document.querySelector(".slider__next");
    const prev = document.querySelector(".slider__prev");
    const slideItem = document.querySelectorAll(".grid__item");
    const s = document.querySelector(".slid");

    const slid = {
        wdth: sliderWrapper,
        maxwdth: sliderWrapper * (slideItem.length - 1),
        w: 0,
        method() {
            this.wdth = document.querySelector(".grid__item").offsetWidth;
            this.maxwdth = this.wdth * (slideItem.length - 1);
            this.w = 0;
        },

        prev() {
            if (this.w === 0) {
            } else {
                this.w += this.wdth + parseInt(window.getComputedStyle(s).columnGap);
                s.style.transform = ` translateX(${this.w}px)`;
            }
        },
        next() {
            if (this.w <= -this.maxwdth) {
            } else {
                this.w -= this.wdth + parseInt(window.getComputedStyle(s).columnGap);
                s.style.transform = ` translateX(${this.w}px)`;
            }
        },
    };

    window.addEventListener("resize", () => {
        slid.method();
        s.style.transform = "translateX(0)";
    });

    prev.addEventListener("click", (e) => {
        slid.prev();
    });
    next.addEventListener("click", (e) => {
        slid.next();
    });
};
export { slider };
