const modal = () => {
    const modalBtn = document.querySelector(".burger__menu");
    const modal = document.querySelector(".nav__modal");
    const wrapper = document.querySelector("header");

    function openModal(modalSelector, btnSelector) {
        wrapper.addEventListener("click", (e) => {
            if (e.target.classList.contains("burger__menu")) {
                if (e.target.classList.contains("burger__menu_active")) {
                    btnSelector.classList.remove("burger__menu_active");
                    modalSelector.classList.remove("active");
                } else {
                    btnSelector.classList.add("burger__menu_active");
                    modalSelector.classList.add("active");
                }
            }
        });
    }
    openModal(modal, modalBtn);
};

export { modal };
