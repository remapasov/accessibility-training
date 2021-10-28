(function() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  let tabs;
  let panels;
  const tablist = document.querySelectorAll('[role="tablist"]')[0];

  const keys = {
    end: 35,
    home: 36,
    left: 37,
    right: 39,
  };

  const direction = {
    37: -1,
    39: 1,
  };

  const generateArrays = () => {
    tabs = document.querySelectorAll('[role="tab"]');
    panels = document.querySelectorAll('[role="tabpanel"]');
  };

  const addListeners = (index) => {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener);
    tabs[index].addEventListener('keyup', keyupEventListener);
    tabs[index].index = index;
  };

  const clickEventListener = (e) => {
    const tab = e.currentTarget;
    activateTab(tab, false);
  };

  const keydownEventListener = (e) => {
    const key = e.keyCode;

    switch (key) {
      case keys.end:
        e.preventDefault();
        activateTab(tabs[tabs.length - 1]);
        break;
      case keys.home:
        e.preventDefault();
        activateTab(tabs[0]);
        break;
    };
  };

  const keyupEventListener = (e) => {
    const key = e.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        switchTabOnArrowPress(e);
        break;
    };
  };

  const switchTabOnArrowPress = (e) => {
    const pressed = e.keyCode;
    const target = e.target;
    tabs.forEach((el) => el.addEventListener('focus', focusEventHandler));

    if (direction[pressed]) {
      const target = e.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab();
        }
        else if (pressed === keys.right || pressed == keys.down) {
          focusFirstTab();
        };
      };
    };
  };

  const focusFirstTab = () => {
    tabs[0].focus();
  };

  const focusLastTab = () => {
    tabs[tabs.length - 1].focus();
  };

  const activateTab = (tab, setFocus) => {
    setFocus = setFocus || true;
    deactivateTabs();
    tab.removeAttribute('tabindex');
    tab.setAttribute('aria-selected', 'true');

    const controls = tab.getAttribute('aria-controls');
    document.getElementById(controls).removeAttribute('hidden');

    if (setFocus) {
      tab.focus();
    };
  };

  const deactivateTabs = () => {
    tabs.forEach((el) => {
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-selected', 'false');
      el.removeEventListener('focus', focusEventHandler);
    });

    panels.forEach((el) => el.setAttribute('hidden', 'hidden'))
  };

  const focusEventHandler = (e) => {
    const target = e.target;
    setTimeout(checkTabFocus, 0, target);
  };

  const checkTabFocus = (target) => {
    focused = document.activeElement;

    if (target === focused) {
      activateTab(target, false);
    };
  };

  generateArrays()

  tabs.forEach((el, i) => addListeners(i))
})();
