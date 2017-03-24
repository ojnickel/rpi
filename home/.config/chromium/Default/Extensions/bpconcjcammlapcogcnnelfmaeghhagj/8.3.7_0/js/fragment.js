(function ($) {
    window.thisFragment = false;
    var captureFragment = {
        position:       {},
        border:         3,
        init:           function () {
            window.thisFragment = true;

            this.eventsElements(document.body);

            $(document.body)
                .on('mouseenter', this.mouseEnter.bind(this))
                .on('mouseleave', this.mouseLeave.bind(this))
                .trigger('mouseenter');

            $('*').on('contextmenu', function (e) {
                e.preventDefault();
                captureFragment.removeFragment(true);
                return false;
            });
        },
        removeFragment: function (all) {
            if (all) {
                window.thisFragment = false;

                this.eventsElements(document.body, true);
            }

            $(document.body)
                .off('mouseenter'/*, this.mouseEnter*/)
                .off('mouseleave'/*, this.mouseLeave*/)
                .off('mousemove touchmove'/*, this.mouseMove*/)
                .off('mouseup touchend'/*, this.mouseUp*/)

            $('.capture-fragment-border').remove();
            $('.fragment-box').remove();
        },
        eventStop:      function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
        eventsElements: function (elem, remove, cb) {
            if (!remove) {
                $(elem).on('click', this.eventStop)
            } else {
                $(elem).off('click', this.eventStop)
            }

            var childrenElems = $(elem).children();
            for (var i = 0, len = childrenElems.length; i < len; i++) {
                this.eventsElements(childrenElems[i], remove);
                if (i == len + 1) cb || cb();
            }
        },
        viewFragment:   function (img, position) {
            var z = window.devicePixelRatio || 1;

            var container_fragment = $('<div/>', {
                id:    'fragment_box',
                class: 'fragment-box'
            });

            var fragment_img = $('<img/>', {
                id:     'fragment_image',
                class:  'fragment-image',
                src:    img,
                width:  position.w + 'px',
                height: position.h + 'px'
            });

            var container_btn_center = $('<div/>', {
                'id':    'fragment_button_center',
                'class': 'fragment-button-center'
            });

            var container_btn_right = $('<div/>', {
                'id':    'fragment_button_right',
                'class': 'fragment-button-right'
            });

            var btn_edit = $('<button/>', {
                html:    '<i class="edit"></i><div class="name">' + chrome.i18n.getMessage("cropBtnEdit") + '</div>',
                'id':    'fragment_edit',
                'class': 'edit_btn edit'
            }).on('click', function () {
                    chrome.extension.sendMessage({msg: 'openeditpagepage'});
                    this.removeFragment(true);
                }.bind(this));

            var btn_cancel = $('<button/>', {
                html:    '<i class="cancel"></i><div class="name">' + chrome.i18n.getMessage("cropBtnCancel") + '</div>',
                'id':    'fragment_cancel',
                'class': 'edit_btn cancel'
            }).on('click', function () {
                    this.removeFragment(true);
//                    this.init();
                }.bind(this));

            var btn_save = $('<button/>', {
                html:    '<i class="save"></i><div class="name">' + chrome.i18n.getMessage("cropBtnSave") + '</div>',
                'id':    'fragment_save',
                'class': 'edit_btn save'/*,
                 'href': img,
                 'download': 'screenshot-by-nimbus'*/
            }).on('click', function () {
                    chrome.extension.sendMessage({msg: 'save_fragment'});
                    this.removeFragment(true);
                }.bind(this));

            var btn_nimbus = $('<button>', {
                html:    '<i class="nimbus"></i>',
                'id':    'fragment_nimbus',
                'class': 'edit_btn nimbus',
                'title': chrome.i18n.getMessage("cropBtnNimbus")
            }).on('click', function () {
                    chrome.extension.sendMessage({msg: 'sendtonimbus', img: img});
                    this.removeFragment(true);
                }.bind(this));

            var window_size = {
                x: $(window).scrollLeft(),
                y: $(window).scrollTop(),
                w: $(window).width(),
                h: $(window).height()
            };

            container_btn_center.append(btn_edit).append(btn_save).append(btn_cancel);
            container_btn_right.append(btn_nimbus);

            if (position.y + position.h + 55 > window_size.y + window_size.h) {
                container_btn_center.css('bottom', '4px');
            }
            if (position.x + position.w + 63 > window_size.x + window_size.w) {
                container_btn_right.css('right', '4px');
            }

            container_fragment.append(fragment_img).append(container_btn_center).append(container_btn_right)
                .css({
                    top:            position.y - this.border,
                    left:           position.x - this.border,
//                    width: position.w + this.border * 2,
//                    height: position.h + this.border * 2,
                    'border-width': this.border
                });
            $(document.body).append(container_fragment);

            this.mouseUpActive = false;

        },
        viewBorder:     function () {
            if (!$('.capture-fragment-border').length) {
                $(document.body).append(
                    $('<div>', {class: 'capture-fragment-border', id: 'capture_fragment_border_top'}),
                    $('<div>', {class: 'capture-fragment-border', id: 'capture_fragment_border_bottom'}),
                    $('<div>', {class: 'capture-fragment-border', id: 'capture_fragment_border_left'}),
                    $('<div>', {class: 'capture-fragment-border', id: 'capture_fragment_border_right'})
                );
            }
            $('#capture_fragment_border_top').css({top: this.position.y, left: this.position.x, width: this.position.w, height: this.border});
            $('#capture_fragment_border_bottom').css({top: this.position.y + this.position.h - this.border, left: this.position.x, width: this.position.w, height: this.border});
            $('#capture_fragment_border_left').css({top: this.position.y, left: this.position.x, width: this.border, height: this.position.h});
            $('#capture_fragment_border_right').css({top: this.position.y, left: this.position.x + this.position.w - this.border, width: this.border, height: this.position.h});
        },
        mouseMove:      function (e) {
            var $elem = $(e.target);

            if ($elem.closest('.fragment-box').length) {
                return;
            }

            this.position = {
                x: $elem.offset().left,
                y: $elem.offset().top,
                w: $elem.outerWidth(),
                h: $elem.outerHeight()
            };

            console.log(this.position);
            this.viewBorder();
        },
        mouseUpActive:  false,
        mouseUp:        function (e) {
            if (e.which == 3) {
                return false;
            }

            var $elem = $(e.target);

            if ($elem.closest('.fragment-box').length || this.mouseUpActive) {
                return false;
            }

            this.mouseUpActive = true;
            this.removeFragment();

            var z = window.devicePixelRatio || 1;
            var window_size = {
                x: $(window).scrollLeft(),
                y: $(window).scrollTop(),
                w: $(window).width(),
                h: $(window).height()
            };
            var position = {
                x: this.position.x,
                y: this.position.y,
                w: this.position.w,
                h: this.position.h
            };

            window.setTimeout(function () {
                console.log(position, window_size, z);
                chrome.extension.sendMessage({msg: 'crop_fragment', position: position, window_size: window_size, zoom: z});
            }.bind(this), 200);
        },
        mouseEnter:     function (e) {
            console.log(423423);
            $(document.body).on('mousemove touchmove', this.mouseMove.bind(this));
            $(document.body).on('mouseup touchend', this.mouseUp.bind(this));
        },
        mouseLeave:     function (e) {
            $('.capture-fragment-border').remove();
            $(document.body).off('mousemove touchmove', this.mouseMove.bind(this));
            $(document.body).off('mouseup touchend', this.mouseUp.bind(this));
        }
    };

    chrome.runtime.onMessage.addListener(function (req) {
//        console.log(req);

        if (req.msg == 'capture_fragment_init'/* && !captureFragment.init_status*/) {
//            captureFragment.init_status = true;
            captureFragment.init();
        }

        if (req.msg == 'capture_fragment_scroll') {
            var speed = Math.abs($(window).scrollTop() - req.scroll.y) * 0.1;
            $('body').stop(true).animate({
                scrollTop: req.scroll.y
            }, speed, function () {
//                console.log('berore scroll crop_fragment');

                var z = window.devicePixelRatio || 1;
                var window_size = {
                    x: $(window).scrollLeft(),
                    y: $(window).scrollTop(),
                    w: $(window).width(),
                    h: $(window).height()
                };
                console.log(req.position, window_size, req.scroll);
                chrome.extension.sendMessage({msg: 'crop_fragment', position: req.position, window_size: window_size, image: req.image, zoom: z});
            });

//            $(window).scrollTop(req.scroll.y);
//            chrome.extension.sendMessage({msg: 'crop_fragment', position: req.position, crop_position: req.crop_position, image: req.image});
        }

        if (req.msg == 'capture_fragment_set_image') {
            captureFragment.removeFragment();
            captureFragment.viewFragment(req.image, req.position);
        }
    })

    window.addEventListener('keydown', function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            captureFragment.removeFragment(true);
        }
    }, false);

})(jQuery);

//console.log('fragment file include');