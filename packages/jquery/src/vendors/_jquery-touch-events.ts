// import { Utils } from '@ribajs/core';

/* tslint:disable */
/// <reference types="jquery" />
/*!
 * jQuery Mobile Events
 * by Ben Major
 * https://github.com/benmajor/jQuery-Touch-Events
 *
 * Copyright 2011-2019, Ben Major
 * Licensed under the MIT License:
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

export default ($: any) => {
    if (!$) {
        console.error('JQuery is required for touch events!');
        return;
    }
    'use strict';
    $.attrFn = $.attrFn || {};

    let touchCapable = ('ontouchstart' in window),

        settings = {
            tapPixelRange: 5,
            swipeHThreshold: 50,
            swipeVThreshold: 50,
            tapholdThreshold: 750,
            doubletapInterval: 500,
            shakeThreshold: 15,

            touchCapable: touchCapable,
            orientationSupport: ('orientation' in window && 'onorientationchange' in window),

            startevent: (touchCapable) ? 'touchstart' : 'mousedown',
            endevent: (touchCapable) ? 'touchend' : 'mouseup',
            moveevent: (touchCapable) ? 'touchmove' : 'mousemove',
            tapevent: (touchCapable) ? 'tap' : 'click',
            scrollevent: (touchCapable) ? 'touchmove' : 'scroll',

            hold_timer: undefined as number | undefined,
            tap_timer: undefined as number | undefined,
        };

    // Declare touch namespace:
    $.touch = {};

    // Convenience functions:
    $.isTouchCapable = function () { return settings.touchCapable; };
    $.getStartEvent = function () { return settings.startevent; };
    $.getEndEvent = function () { return settings.endevent; };
    $.getMoveEvent = function () { return settings.moveevent; };
    $.getTapEvent = function () { return settings.tapevent; };
    $.getScrollEvent = function () { return settings.scrollevent; };

    // SETTERS:
    // Set the X threshold of swipe events:
    $.touch.setSwipeThresholdX = function (threshold: number) {
        if (typeof threshold !== 'number') { throw new Error('Threshold parameter must be a type of number'); }
        settings.swipeHThreshold = threshold;
    };

    // Set the Y threshold of swipe events:
    $.touch.setSwipeThresholdY = function (threshold: number) {
        if (typeof threshold !== 'number') { throw new Error('Threshold parameter must be a type of number'); }
        settings.swipeVThreshold = threshold;
    };

    // Set the double tap interval:
    $.touch.setDoubleTapInt = function (interval: number) {
        if (typeof interval !== 'number') { throw new Error('Interval parameter must be a type of number'); }
        settings.doubletapInterval = interval;
    };

    // Set the taphold threshold:
    $.touch.setTapHoldThreshold = function (threshold: number) {
        if (typeof threshold !== 'number') { throw new Error('Threshold parameter must be a type of number'); }
        settings.tapholdThreshold = threshold;
    };

    // Set the pixel range for tapas:
    $.touch.setTapRange = function (range: number) {
        if (typeof range !== 'number') { throw new Error('Ranger parameter must be a type of number'); }
        settings.tapPixelRange = range;
    };

    // Add Event shortcuts:
    $.each(['tapstart', 'tapend', 'tapmove', 'tap', 'singletap', 'doubletap', 'taphold', 'swipe', 'swipeup', 'swiperight', 'swipedown', 'swipeleft', 'swipeend', 'scrollstart', 'scrollend', 'orientationchange', 'tap2', 'taphold2'], function (i: number, name: string) {
        $.fn[name] = function (fn: any) {
            return fn ? this.on(name, fn) : this.trigger(name);
        };

        $.attrFn[name] = true;
    });

    // tapstart Event:
    $.event.special.tapstart = {
        setup: function () {

            let thisObject = this,
                $this = $(thisObject);

            $this.on(settings.startevent, function tapStartFunc(e: any) {

                $this.data('callee', tapStartFunc);
                if (e.which && e.which !== 1) {
                    return false;
                }

                let origEvent = e.originalEvent,
                    touchData = {
                        'position': {
                            'x': ((settings.touchCapable) ? origEvent.touches[0].pageX : e.pageX),
                            'y': (settings.touchCapable) ? origEvent.touches[0].pageY : e.pageY
                        },
                        'offset': {
                            'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                            'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                        },
                        'time': Date.now(),
                        'target': e.target
                    };

                triggerCustomEvent(thisObject, 'tapstart', e, touchData);
                return true;
            });
        },

        remove: function () {
            $(this).off(settings.startevent, $(this).data.callee);
        }
    };

    // tapmove Event:
    $.event.special.tapmove = {
        setup: function () {
            let thisObject = this,
                $this = $(thisObject);

            $this.on(settings.moveevent, function tapMoveFunc(e: any) {
                $this.data('callee', tapMoveFunc);

                let origEvent = e.originalEvent,
                    touchData = {
                        'position': {
                            'x': ((settings.touchCapable) ? origEvent.touches[0].pageX : e.pageX),
                            'y': (settings.touchCapable) ? origEvent.touches[0].pageY : e.pageY
                        },
                        'offset': {
                            'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                            'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                        },
                        'time': Date.now(),
                        'target': e.target
                    };

                triggerCustomEvent(thisObject, 'tapmove', e, touchData);
                return true;
            });
        },
        remove: function () {
            $(this).off(settings.moveevent, $(this).data.callee);
        }
    };

    // tapend Event:
    $.event.special.tapend = {
        setup: function () {
            let thisObject = this,
                $this = $(thisObject);

            $this.on(settings.endevent, function tapEndFunc(e: any) {
                // Touch event data:
                $this.data('callee', tapEndFunc);

                let origEvent = e.originalEvent;
                let touchData = {
                    'position': {
                        'x': (settings.touchCapable) ? origEvent.changedTouches[0].pageX : e.pageX,
                        'y': (settings.touchCapable) ? origEvent.changedTouches[0].pageY : e.pageY
                    },
                    'offset': {
                        'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                        'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                    },
                    'time': Date.now(),
                    'target': e.target
                };
                triggerCustomEvent(thisObject, 'tapend', e, touchData);
                return true;
            });
        },
        remove: function () {
            $(this).off(settings.endevent, $(this).data.callee);
        }
    };

    // taphold Event:
    $.event.special.taphold = {
        setup: function () {
            let thisObject = this,
                $this = $(thisObject),
                origTarget: any,
                start_pos = {
                    x: 0,
                    y: 0
                },
                end_x = 0,
                end_y = 0;

            $this.on(settings.startevent, function tapHoldFunc1(e: any) {
                if (e.which && e.which !== 1) {
                    return false;
                } else {
                    $this.data('tapheld', false);
                    origTarget = e.target;

                    let origEvent = e.originalEvent;
                    let start_time = Date.now();
                    start_pos.x = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageX : e.pageX;
                    start_pos.y = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageY : e.pageY;

                    end_x = start_pos.x;
                    end_y = start_pos.y;

                    // Get the element's threshold:
                    let ele_threshold = ($this.parent().data('threshold')) ? $this.parent().data('threshold') : $this.data('threshold'),
                        threshold = (typeof ele_threshold !== 'undefined' && ele_threshold !== false && parseInt(ele_threshold)) ? parseInt(ele_threshold) : settings.tapholdThreshold;

                    $this.data('hold_timer', window.setTimeout(function () {

                        let diff_x = (start_pos.x - end_x),
                            diff_y = (start_pos.y - end_y);

                        if (e.target == origTarget && ((start_pos.x == end_x && start_pos.y == end_y) || (diff_x >= -(settings.tapPixelRange) && diff_x <= settings.tapPixelRange && diff_y >= -(settings.tapPixelRange) && diff_y <= settings.tapPixelRange))) {
                            $this.data('tapheld', true);

                            let end_time = Date.now();

                            let duration = end_time - start_time,
                                touches = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches : [e],
                                touchData = [];

                            for (let i = 0; i < touches.length; i++) {
                                let touch = {
                                    'position': {
                                        'x': (settings.touchCapable) ? origEvent.changedTouches[i].pageX : e.pageX,
                                        'y': (settings.touchCapable) ? origEvent.changedTouches[i].pageY : e.pageY
                                    },
                                    'offset': {
                                        'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[i].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                                        'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[i].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                                    },
                                    'time': Date.now(),
                                    'target': e.target,
                                    'duration': duration
                                };

                                touchData.push(touch);
                            }

                            let evt_name = (touches.length == 2) ? 'taphold2' : 'taphold';

                            $this.data('callee1', tapHoldFunc1);

                            triggerCustomEvent(thisObject, evt_name, e, touchData);
                        }
                    }, threshold) );

                    return true;
                }
            }).on(settings.endevent, function tapHoldFunc2() {
                $this.data('callee2', tapHoldFunc2);
                $this.data('tapheld', false);
                window.clearTimeout($this.data('hold_timer'));
            })
                .on(settings.moveevent, function tapHoldFunc3(e: any) {
                    $this.data('callee3', tapHoldFunc3);

                    end_x = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageX : e.pageX;
                    end_y = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageY : e.pageY;
                });
        },

        remove: function () {
            $(this).off(settings.startevent, $(this).data.callee1).off(settings.endevent, $(this).data.callee2).off(settings.moveevent, $(this).data.callee3);
        }
    };

    // doubletap Event:
    $.event.special.doubletap = {
        setup: function () {
            const thisObject = this;
            const $this = $(thisObject);
            let action: number;
            let firstTap: any = null;
            let origEvent: TouchEvent;
            // let origTarget: EventTarget | null = null;
            let cooling = false;

            $this.on(settings.startevent, function doubleTapFunc1(e: JQuery.Event & Event) {
                if (e.which && e.which !== 1) {
                    return false;
                }

                $this.data('doubletapped', false);
                // origTarget = e.target;
                $this.data('callee1', doubleTapFunc1);

                origEvent = (e as any).originalEvent as TouchEvent;
                if (!firstTap) {
                    firstTap = {
                        'position': {
                            'x': (settings.touchCapable) ? origEvent.touches[0].pageX : e.pageX,
                            'y': (settings.touchCapable) ? origEvent.touches[0].pageY : e.pageY
                        },
                        'offset': {
                            'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX || 0 - ($this.offset() ? $this.offset().left : 0)),
                            'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY || 0 - ($this.offset() ? $this.offset().top : 0))
                        },
                        'time': Date.now(),
                        'target': e.target,
                        'element': (e as any).originalEvent.srcElement,
                        'index': $(e.target).index()
                    };
                }

                return true;
            }).on(settings.endevent, function doubleTapFunc2(e: any) {

                let now = Date.now();
                let lastTouch = $this.data('lastTouch') || now + 1;
                let delta = now - lastTouch;
                window.clearTimeout(action);
                $this.data('callee2', doubleTapFunc2);

                if (delta < settings.doubletapInterval && ($(e.target).index() == firstTap.index) && delta > 100) {
                    $this.data('doubletapped', true);
                    window.clearTimeout(settings.tap_timer);

                    // Now get the current event:
                    let lastTap = {
                        'position': {
                            'x': (settings.touchCapable) ? e.originalEvent.changedTouches[0].pageX : e.pageX,
                            'y': (settings.touchCapable) ? e.originalEvent.changedTouches[0].pageY : e.pageY
                        },
                        'offset': {
                            'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                            'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                        },
                        'time': Date.now(),
                        'target': e.target,
                        'element': e.originalEvent.srcElement,
                        'index': $(e.target).index()
                    };

                    let touchData = {
                        'firstTap': firstTap,
                        'secondTap': lastTap,
                        'interval': lastTap.time - firstTap.time
                    };

                    if (!cooling) {
                        triggerCustomEvent(thisObject, 'doubletap', e, touchData);
                        firstTap = null;
                    }

                    cooling = true;

                    window.setTimeout(function () {
                    	cooling = false;
                    }, settings.doubletapInterval);

                } else {
                    $this.data('lastTouch', now);
                    action = window.setTimeout(function () {
                        firstTap = null;
                        window.clearTimeout(action);
                    }, settings.doubletapInterval, [e]);
                }
                $this.data('lastTouch', now);
            });
        },
        remove: function () {
            $(this).off(settings.startevent, $(this).data.callee1).off(settings.endevent, $(this).data.callee2);
        }
    };

    // singletap Event:
    // This is used in conjuction with doubletap when both events are needed on the same element
    $.event.special.singletap = {
        setup: function () {
            let thisObject = this,
                $this = $(thisObject),
                origTarget: any = null,
                startTime: any = null,
                start_pos = {
                    x: 0,
                    y: 0
                };

            $this.on(settings.startevent, function singleTapFunc1(e: any) {
                if (e.which && e.which !== 1) {
                    return false;
                } else {
                    startTime = Date.now();
                    origTarget = e.target;
                    $this.data('callee1', singleTapFunc1);

                    // Get the start x and y position:
                    start_pos.x = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageX : e.pageX;
                    start_pos.y = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageY : e.pageY;

                    return true;
                }
            }).on(settings.endevent, function singleTapFunc2(e: any) {
                $this.data('callee2', singleTapFunc2);
                if (e.target === origTarget) {

                    // Get the end point:
                    let end_pos_x = (e.originalEvent.changedTouches) ? e.originalEvent.changedTouches[0].pageX : e.pageX,
                        end_pos_y = (e.originalEvent.changedTouches) ? e.originalEvent.changedTouches[0].pageY : e.pageY;

                    // We need to check if it was a taphold:

                    settings.tap_timer = window.setTimeout(function () {

                        let diff_x = (start_pos.x - end_pos_x), diff_y = (start_pos.y - end_pos_y);

                        if (!$this.data('doubletapped') && !$this.data('tapheld') && (((start_pos.x == end_pos_x) && (start_pos.y == end_pos_y)) || (diff_x >= -(settings.tapPixelRange) && diff_x <= settings.tapPixelRange && diff_y >= -(settings.tapPixelRange) && diff_y <= settings.tapPixelRange))) {

                            let origEvent = e.originalEvent;
                            let touchData = {
                                'position': {
                                    'x': (settings.touchCapable) ? origEvent.changedTouches[0].pageX : e.pageX,
                                    'y': (settings.touchCapable) ? origEvent.changedTouches[0].pageY : e.pageY
                                },
                                'offset': {
                                    'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                                    'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                                },
                                'time': Date.now(),
                                'target': e.target
                            };

                            // Was it a taphold?
                            if ((touchData.time - startTime) < settings.tapholdThreshold) {
                                triggerCustomEvent(thisObject, 'singletap', e, touchData);
                            }
                        }
                    }, settings.doubletapInterval);
                }
            });
        },

        remove: function () {
            $(this).off(settings.startevent, $(this).data.callee1).off(settings.endevent, $(this).data.callee2);
        }
    };

    // tap Event:
    $.event.special.tap = {
        setup: function () {
            let thisObject = this,
                $this = $(thisObject),
                started = false,
                origTarget: any = null,
                start_time: any,
                start_pos = {
                    x: 0,
                    y: 0
                },
                touches: any;

            $this.on(settings.startevent, function tapFunc1(e: any) {
                $this.data('callee1', tapFunc1);

                if (e.which && e.which !== 1) {
                    return false;
                }
                else {
                    started = true;
                    start_pos.x = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageX : e.pageX;
                    start_pos.y = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageY : e.pageY;
                    start_time = Date.now();
                    origTarget = e.target;

                    touches = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches : [e];
                    return true;
                }
            }).on(settings.endevent, function tapFunc2(e: any) {
                $this.data('callee2', tapFunc2);
                // Only trigger if they've started, and the target matches:
                let end_x = (e.originalEvent.targetTouches) ? e.originalEvent.changedTouches[0].pageX : e.pageX,
                    end_y = (e.originalEvent.targetTouches) ? e.originalEvent.changedTouches[0].pageY : e.pageY,
                    diff_x = (start_pos.x - end_x),
                    diff_y = (start_pos.y - end_y);

                if (origTarget == e.target && started && ((Date.now() - start_time) < settings.tapholdThreshold) && ((start_pos.x == end_x && start_pos.y == end_y) || (diff_x >= -(settings.tapPixelRange) && diff_x <= settings.tapPixelRange && diff_y >= -(settings.tapPixelRange) && diff_y <= settings.tapPixelRange))) {
                    let origEvent = e.originalEvent;
                    let touchData = [];

                    for (let i = 0; i < touches.length; i++) {
                        let touch = {
                            'position': {
                                'x': (settings.touchCapable) ? origEvent.changedTouches[i].pageX : e.pageX,
                                'y': (settings.touchCapable) ? origEvent.changedTouches[i].pageY : e.pageY
                            },
                            'offset': {
                                'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[i].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                                'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[i].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                            },
                            'time': Date.now(),
                            'target': e.target
                        };

                        touchData.push(touch);
                    }

                    let evt_name = (touches.length == 2) ? 'tap2' : 'tap';

                    triggerCustomEvent(thisObject, evt_name, e, touchData);
                }
            });
        },

        remove: function () {
            $(this).off(settings.startevent, $(this).data.callee1).off(settings.endevent, $(this).data.callee2);
        }
    };

    // swipe Event (also handles swipeup, swiperight, swipedown and swipeleft):
    $.event.special.swipe = {
        setup: function () {
            let thisObject = this,
                $this = $(thisObject),
                started = false,
                hasSwiped = false,
                originalCoord = {
                    x: 0,
                    y: 0
                },
                finalCoord = {
                    x: 0,
                    y: 0
                },
                startEvnt: any;

            // Screen touched, store the original coordinate

            function touchStart(e: any) {
                $this = $(e.currentTarget);
                $this.data('callee1', touchStart);
                originalCoord.x = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageX : e.pageX;
                originalCoord.y = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageY : e.pageY;
                finalCoord.x = originalCoord.x;
                finalCoord.y = originalCoord.y;
                started = true;
                let origEvent = e.originalEvent;
                // Read event data into our startEvt:
                startEvnt = {
                    'position': {
                        'x': (settings.touchCapable) ? origEvent.touches[0].pageX : e.pageX,
                        'y': (settings.touchCapable) ? origEvent.touches[0].pageY : e.pageY
                    },
                    'offset': {
                        'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                        'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                    },
                    'time': Date.now(),
                    'target': e.target
                };
            }

            // Store coordinates as finger is swiping

            function touchMove(e: any) {
                $this = $(e.currentTarget);
                $this.data('callee2', touchMove);
                finalCoord.x = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageX : e.pageX;
                finalCoord.y = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageY : e.pageY;

                let swipedir;

                // We need to check if the element to which the event was bound contains a data-xthreshold | data-vthreshold:
                let ele_x_threshold = ($this.parent().data('xthreshold')) ? $this.parent().data('xthreshold') : $this.data('xthreshold'),
                    ele_y_threshold = ($this.parent().data('ythreshold')) ? $this.parent().data('ythreshold') : $this.data('ythreshold'),
                    h_threshold = (typeof ele_x_threshold !== 'undefined' && ele_x_threshold !== false && parseInt(ele_x_threshold)) ? parseInt(ele_x_threshold) : settings.swipeHThreshold,
                    v_threshold = (typeof ele_y_threshold !== 'undefined' && ele_y_threshold !== false && parseInt(ele_y_threshold)) ? parseInt(ele_y_threshold) : settings.swipeVThreshold;

                if (originalCoord.y > finalCoord.y && (originalCoord.y - finalCoord.y > v_threshold)) {
                    swipedir = 'swipeup';
                }
                if (originalCoord.x < finalCoord.x && (finalCoord.x - originalCoord.x > h_threshold)) {
                    swipedir = 'swiperight';
                }
                if (originalCoord.y < finalCoord.y && (finalCoord.y - originalCoord.y > v_threshold)) {
                    swipedir = 'swipedown';
                }
                if (originalCoord.x > finalCoord.x && (originalCoord.x - finalCoord.x > h_threshold)) {
                    swipedir = 'swipeleft';
                }
                if (swipedir != undefined && started) {
                    originalCoord.x = 0;
                    originalCoord.y = 0;
                    finalCoord.x = 0;
                    finalCoord.y = 0;
                    started = false;

                    // Read event data into our endEvnt:
                    let origEvent = e.originalEvent;
                    let endEvnt = {
                        'position': {
                            'x': (settings.touchCapable) ? origEvent.touches[0].pageX : e.pageX,
                            'y': (settings.touchCapable) ? origEvent.touches[0].pageY : e.pageY
                        },
                        'offset': {
                            'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                            'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                        },
                        'time': Date.now(),
                        'target': e.target
                    };

                    // Calculate the swipe amount (normalized):
                    let xAmount = Math.abs(startEvnt.position.x - endEvnt.position.x),
                        yAmount = Math.abs(startEvnt.position.y - endEvnt.position.y);

                    let touchData = {
                        'startEvnt': startEvnt,
                        'endEvnt': endEvnt,
                        'direction': swipedir.replace('swipe', ''),
                        'xAmount': xAmount,
                        'yAmount': yAmount,
                        'duration': endEvnt.time - startEvnt.time
                    };
                    hasSwiped = true;
                    $this.trigger('swipe', touchData).trigger(swipedir, touchData);
                }
            }

            function touchEnd(e: any) {
                $this = $(e.currentTarget);
                let swipedir = "";
                $this.data('callee3', touchEnd);
                if (hasSwiped) {
                    // We need to check if the element to which the event was bound contains a data-xthreshold | data-vthreshold:
                    let ele_x_threshold = $this.data('xthreshold'),
                        ele_y_threshold = $this.data('ythreshold'),
                        h_threshold = (typeof ele_x_threshold !== 'undefined' && ele_x_threshold !== false && parseInt(ele_x_threshold)) ? parseInt(ele_x_threshold) : settings.swipeHThreshold,
                        v_threshold = (typeof ele_y_threshold !== 'undefined' && ele_y_threshold !== false && parseInt(ele_y_threshold)) ? parseInt(ele_y_threshold) : settings.swipeVThreshold;

                    let origEvent = e.originalEvent;
                    let endEvnt = {
                        'position': {
                            'x': (settings.touchCapable) ? origEvent.changedTouches[0].pageX : e.pageX,
                            'y': (settings.touchCapable) ? origEvent.changedTouches[0].pageY : e.pageY
                        },
                        'offset': {
                            'x': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageX - ($this.offset() ? $this.offset().left : 0)) : Math.round(e.pageX - ($this.offset() ? $this.offset().left : 0)),
                            'y': (settings.touchCapable) ? Math.round(origEvent.changedTouches[0].pageY - ($this.offset() ? $this.offset().top : 0)) : Math.round(e.pageY - ($this.offset() ? $this.offset().top : 0))
                        },
                        'time': Date.now(),
                        'target': e.target
                    };

                    // Read event data into our endEvnt:
                    if (startEvnt.position.y > endEvnt.position.y && (startEvnt.position.y - endEvnt.position.y > v_threshold)) {
                        swipedir = 'swipeup';
                    }
                    if (startEvnt.position.x < endEvnt.position.x && (endEvnt.position.x - startEvnt.position.x > h_threshold)) {
                        swipedir = 'swiperight';
                    }
                    if (startEvnt.position.y < endEvnt.position.y && (endEvnt.position.y - startEvnt.position.y > v_threshold)) {
                        swipedir = 'swipedown';
                    }
                    if (startEvnt.position.x > endEvnt.position.x && (startEvnt.position.x - endEvnt.position.x > h_threshold)) {
                        swipedir = 'swipeleft';
                    }

                    // Calculate the swipe amount (normalized):
                    let xAmount = Math.abs(startEvnt.position.x - endEvnt.position.x),
                        yAmount = Math.abs(startEvnt.position.y - endEvnt.position.y);

                    let touchData = {
                        'startEvnt': startEvnt,
                        'endEvnt': endEvnt,
                        'direction': swipedir.replace('swipe', ''),
                        'xAmount': xAmount,
                        'yAmount': yAmount,
                        'duration': endEvnt.time - startEvnt.time
                    };
                    $this.trigger('swipeend', touchData);
                }

                started = false;
                hasSwiped = false;
            }

            $this.on(settings.startevent, touchStart);
            $this.on(settings.moveevent, touchMove);
            $this.on(settings.endevent, touchEnd);
        },

        remove: function () {
            $(this).off(settings.startevent, $(this).data.callee1).off(settings.moveevent, $(this).data.callee2).off(settings.endevent, $(this).data.callee3);
        }
    };

    // scrollstart Event (also handles scrollend):
    $.event.special.scrollstart = {
        setup: function () {
            let thisObject = this,
                $this = $(thisObject),
                scrolling: any,
                timer: any;

            function trigger(event: Event, state: boolean) {
                scrolling = state;
                if (scrolling) {
                    triggerCustomEvent(thisObject, 'scrollstart', event);
                } else {
                    // Utils.debounce(triggerCustomEvent.bind(thisObject, thisObject, 'scrollend', event));
                    triggerCustomEvent(thisObject, 'scrollend', event);
                }
            }

            // iPhone triggers scroll after a small delay; use touchmove instead
            $this.on(settings.scrollevent, function scrollFunc(event: any) {
                $this.data('callee', scrollFunc);

                if (!scrolling) {
                    trigger(event, true);
                }

                clearTimeout(timer);
                timer = setTimeout(function () {
                    trigger(event, false);
                }, 50);
            });
        },

        remove: function () {
            $(this).off(settings.scrollevent, $(this).data.callee);
        }
    };

    // This is the orientation change (largely borrowed from jQuery Mobile):
    let win = $(window),
        get_orientation: any,
        last_orientation: any,
        initial_orientation_is_landscape,
        initial_orientation_is_default,
        portrait_map: any = {
            '0': true,
            '180': true
        };

    if (settings.orientationSupport) {
        let ww = window.innerWidth || win.width(),
            wh = window.innerHeight || win.height(),
            landscape_threshold = 50;

        initial_orientation_is_landscape = ww > wh && (ww - wh) > landscape_threshold;
        initial_orientation_is_default = portrait_map[window.orientation];

        if ((initial_orientation_is_landscape && initial_orientation_is_default) || (!initial_orientation_is_landscape && !initial_orientation_is_default)) {
            portrait_map = {
                '-90': true,
                '90': true
            };
        }
    }

    $.event.special.orientationchange = {
        setup: function () {
            // If the event is supported natively, return false so that jQuery
            // will on to the event using DOM methods.
            if (settings.orientationSupport) {
                return false;
            }

            // Get the current orientation to avoid initial double-triggering.
            last_orientation = get_orientation();

            win.on('throttledresize', handler);
            return true;
        },
        teardown: function () {
            if (settings.orientationSupport) {
                return false;
            }

            win.off('throttledresize', handler);
            return true;
        },
        add: function (handleObj: any) {
            // Save a reference to the bound event handler.
            let old_handler = handleObj.handler;

            handleObj.handler = function (event: any) {
                event.orientation = get_orientation();
                return old_handler.apply(this, arguments);
            };
        }
    };

    // If the event is not supported natively, this handler will be bound to
    // the window resize event to simulate the orientationchange event.

    function handler() {
        // Get the current orientation.
        let orientation = get_orientation();

        if (orientation !== last_orientation) {
            // The orientation has changed, so trigger the orientationchange event.
            last_orientation = orientation;
            win.trigger("orientationchange");
        }
    }

    $.event.special.orientationchange.orientation = get_orientation = function () {
        let isPortrait: any = true,
            elem = document.documentElement;

        if (settings.orientationSupport) {
            isPortrait = portrait_map[window.orientation];
        } else {
            isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
        }

        return isPortrait ? 'portrait' : 'landscape';
    };

    // throttle Handler:
    $.event.special.throttledresize = {
        setup: function () {
            $(this).on('resize', throttle_handler);
        },
        teardown: function () {
            $(this).off('resize', throttle_handler);
        }
    };

    let throttle = 250,
        throttle_handler = function (this: any) {
            curr = Date.now();
            diff = curr - lastCall;

            if (diff >= throttle) {
                lastCall = curr;
                $(this).trigger('throttledresize');

            } else {
                if (heldCall) {
                    window.clearTimeout(heldCall);
                }

                // Promise a held call will still execute
                heldCall = window.setTimeout(handler, throttle - diff);
            }
        },
        lastCall = 0,
        heldCall: any,
        curr,
        diff;

    // Trigger a custom event:

    function triggerCustomEvent(obj: any, eventType: string, event: any, touchData?: any) {
        let originalType = event.type;
        event.type = eventType;

        $.event.dispatch.call(obj, event, touchData);
        event.type = originalType;
    }

    // Correctly on anything we've overloaded:
    $.each({
        scrollend: 'scrollstart',
        swipeup: 'swipe',
        swiperight: 'swipe',
        swipedown: 'swipe',
        swipeleft: 'swipe',
        swipeend: 'swipe',
        tap2: 'tap',
        taphold2: 'taphold'
    }, function (e: any, srcE: any) {
        $.event.special[e] = {
            setup: function () {
                $(this).on(srcE, $.noop);
            }
        };
    });

    return $;
}
