(function() {
  'use strict';

  var anchors = document.querySelectorAll('.bokeh-link')
    , blur = document.querySelector('.bokeh-blur')
    ;

  var bokeh = {
    init: function(el) {
      var bokeh = this
        , imgs, tabs
        ;

      el.setAttribute('data-bokeh', true);

      // Create DOM elements
      imgs = el.querySelectorAll('img');
      bokeh.createTabs(el, imgs);
      bokeh.createCloseButton(el);

      // Attach events
      tabs = el.querySelectorAll('.bokeh__tabs > li');
      bokeh.setActive(tabs[0], imgs[0]);
    },

    createTabs: function(el, imgs) {
      // Make a container for the tabs
      el.appendChild(create('ul')).className = 'bokeh__tabs';
      var tabs = el.querySelector('.bokeh__tabs', el)
        , li
        ;

      // Make a tab for each image
      each(imgs, function(img, idx) {
        li = create('li');
        tabs.appendChild(li);
        li.setAttribute('data-index', idx);
        img.setAttribute('data-index', idx);
        li.innerHTML = idx + 1;
        bokeh.tabClickHandler(li, img);
      });
    },

    createCloseButton: function(el) {
      // Make a close button
      el.appendChild(create('div')).className = 'bokeh__close';
      var closeBtn = el.querySelector('.bokeh__close', el);
      closeBtn.innerHTML = 'CLOSE';

      // Attach click handler to close modal
      closeBtn.addEventListener('click', function() {
       el.classList.remove('is-visible');
       if (blur) blur.classList.remove('has-blur');
      });
    },

    tabClickHandler: function(tab, img) {
      tab.addEventListener('click', function() {
        if (tab.getAttribute('data-index') === img.getAttribute('data-index')) {
          bokeh.setActive(tab, img);
        }
      });
    },

    setActive: function(tab, img) {
      var active = 'is-active';

      if (parent(tab) !== null) parent(tab).classList.remove(active);
      if (parent(img) !== null) parent(img).classList.remove(active);

      if (img.hasAttribute('data-src')) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
      }
      tab.classList.add(active);
      img.classList.add(active);

      function parent(e) {
        return e.parentNode.querySelector('.is-active');
      }
    },

    showModal: function(el) {
      var href = el.getAttribute('href').replace('#', '')
        , modal = document.getElementById(href)
        ;

      el.addEventListener('click', function() {
        modal.classList.add('is-visible');
        if (blur) blur.classList.add('has-blur');
        if (!modal.getAttribute('data-bokeh')) bokeh.init(modal);
      });
    }
  };

  each(anchors, function(el) {
    bokeh.showModal(el);
  });

  // Helpers
  function each(el, fn) {
    Array.prototype.forEach.call(el, fn);
  }

  function create(el) {
    return document.createElement(el);
  }

})();
