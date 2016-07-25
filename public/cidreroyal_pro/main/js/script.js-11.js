var jf_img_path = 'http://localhost:3333/';

var duration = 400;
var visible_popup = '';
var document_scroll;
var card_titles = [
    'Свято літа'
    ,'День директора'
    ,'Свято п\'ятниці'
    ,'Понеділкове свято'
    ,'Свято улюбленої роботи'
    ,'День яблука'
    ,'День наймолодшого колеги'
    ,'День найдосвідченішого'
    ,'Дівоче свято'
    ,'Дружнє свято'
];
var card_desc = [
    'Таке можна святкувати хоч щодня з червня до серпня! Чудовий теплий привід.'
    ,'Бувають звичайні директори, а бувають такі, як у нас – не директор, а свято!'
    ,'Святкується щотижня, а із сидром стає ще легшим, приємнішим та веселішим.'
    ,'Свято для тих, хто не хоче погоджуватись, що понеділок – важкий день.'
    ,'Святкуємо те, як ми любимо роботу та одне одного. Лише для щирих!'
    ,'Свято для тих, хто любить сидр та поважає яблука, з яких його роблять.'
    ,'Все просто – ми влаштовуємо свято на честь наймолодшого з нас! З подарунками.'
    ,'Це свято для того, хто працює у нас найдовше. Будемо переймати досвід!'
    ,'Таке б щодня святкувати! І ми готові. Збираємось порадіти з нашими дівчатами!'
    ,'Коли в команді є надійне дружнє плече, працювати – просто!'
];
var act_bottle = 0;


var current_page = 1;
function getHolidays(route){
    current_page++;
    $.post(route+'/', {page: current_page, date: $('.participants_period input').val()}, function(result) {
        if (result.length > 0){
            $('.card_list').html($('.card_list').html()+result);
        }else{
            $('.more_cards').addClass('none');
        }

    });

}

function trim(string){
    return string.replace(/(^\s+)|(\s+$)/g, "");
}

function textareaMaxLength(){
    var txts = document.getElementsByTagName('TEXTAREA');

    for(var i = 0, l = txts.length; i < l; i++) {
        if(/^[0-9]+$/.test(txts[i].getAttribute("maxlength"))) {
            var func = function() {
                var len = parseInt(this.getAttribute("maxlength"), 10);

                if(this.value.length > len) {
//                    alert('Maximum length exceeded: ' + len);
                    this.value = this.value.substr(0, len);
                    return false;
                }
            }

            txts[i].onkeyup = func;
            txts[i].onblur = func;
        }
    }
}

function setAutoRemove( element, def_val ) {
    if (!$(element)) return false;

    $(element).focus(function() {
        if ($(this).val() == def_val) {
            $(this).val('');
            $(element).removeClass('default');
        }
    });
    $(element).blur(function() {
        if (trim($(this).val()) == '') {
            $(this).val(def_val);
            $(element).addClass('default');
        }
    });
    if ($(element).val() == '') {
        $(element).val(def_val);
        $(element).addClass('default');
    }
    return $(element);
}

function initPopup(popup){
    var close       = popup.find('.close');
    close.click(hidePopup);
    $('#back').hide().removeClass('none').click(hidePopup);

    popup.hide();
}
function hidePopup(){
    $('#back').fadeOut();
    // popup with video
    $('.popup.act').fadeOut(duration, function(){
        $('.popup_table').addClass('hide');
        $('.popup.act').removeClass('act');
        $('.wrapper').removeClass('wrapper_popup').css('top','auto');
        $('body').removeClass('body_scroll');
        $(window).scrollTop(document_scroll);
        if( $('#video').length ) {
            $('#video').removeAttr('src');
        }
    });
}

var revision = 1;
function getNewCaptcha(){
    $('.popup_code .captcha').html('<img src="holiday/captcha/?'+revision+'" alt=""/>');
    revision++;
}

function _trackEvent(category, action){
    if(undefined != window._gaq){
        _gaq.push(['_trackEvent', category, action]);
    }
}

function showPopup(popup){

    if ( $(popup).hasClass('act') ) return false;

    // popup with video
    if( $(popup).hasClass('popup_video') ) {
        $('#video').attr('src',$('#video').data('src'));
    }

    if( $('.popup_table').hasClass('hide') ){
        // no visible popup
        document_scroll = $(window).scrollTop();
        $('body').addClass('body_scroll');
        $('.wrapper').addClass('wrapper_popup');
        $('.wrapper').css('top',-document_scroll);
        $('.popup_table').removeClass('hide');
        $(popup).fadeIn(duration);
        $('#back').fadeIn(duration);
    } else {
        // we have active popup
        $('.popup.act').fadeOut(duration, function(){
            $(popup).fadeIn(duration);
        });
        $('.popup.act').removeClass('act');
    }

    $(popup).addClass('act');

}

function initSelectJS(select){

    var input = select.find('input');
    var active = input.val() || 1; // requires id data-val of element
    var val = select.find('.sel_val span');
    var opnts = select.find('.sel_optn');
    opnts.removeClass('act');
    opnts.each(function(index, item){
        if( $(item).data('val') == active )  {
            $(item).addClass('act');
            val.text($(item).text());
        }
    });


    select.click(function(evt){
        if( $(evt.target).hasClass('sel_optn') ){
            $(input).val($(evt.target).data('val'));
            opnts.removeClass('act');
            $(evt.target).addClass('act');
            val.text($(evt.target).text())
        }

        if( $(this).hasClass('act') ) $(this).removeClass('act')
        else $(this).addClass('act')

    });

}
function documentCloseSelect(){
    $(document).bind('click',function(e){
        if (!$(e.target).hasClass('select_js') && !$(e.target).closest('.select_js').length){
            $('.select_js').removeClass('act');
        }
    });
}

function checkGates(age){
    if( age === true ){
        $('.gates').addClass('none');
        $('.wrapper_gates').removeClass('wrapper_gates');
        return false;
    }

    if( $(this).hasClass('yes') ){
        $.cookie('user_adult', 'true', {expires: 10,path: '/'});
        $('.gates .logo').css({
            position:'fixed',
            top:$('.gates .logo').offset().top-$(window).scrollTop(),
            left:$('.gates .logo').offset().left-$(window).scrollLeft(),
            margin:0
        })
        $('.gates').prepend($('.gates .logo'));
        $('.gates .logo').animate({top:24},duration);
        $('.gates .gates_box').fadeOut(duration/2);
        $('.gates .warning').fadeOut(duration,function(){
            $('.wrapper_gates').hide().removeClass('wrapper_gates').fadeIn(duration,function(){$('.gates').hide()});
        });
    } else {
        $('.gates1').animate({
            opacity:'toggle',
            height:'toggle'
        },duration);
        setTimeout(function(){
            $('.gates2').animate({
                opacity:'toggle',
                height:'toggle'
            },duration);
        },20);
    }
}

function initProductSlider(slider){
    var act = 0;
    var arr_l = slider.find('.arrow.left');
    var arr_r = slider.find('.arrow.right');
    var toggle = slider.find('.toggle');
    var items = slider.find('.slider_item');
    var _width = $(items[0]).outerWidth();
    var margin_middle = parseInt($(items[0]).css('margin-left'));
    if(items.length <= 1){
        arr_l.remove();
        arr_r.remove();
        toggle.remove();
        return false;
    }
    toggle.removeClass('act').addClass('none');
    $(toggle[act]).addClass('act');

    $(items).each(function(index, item){
        if( index == act ) {
            $(item).show();
        } else {
            $(item).hide();
        }
        $(toggle[index]).removeClass('none');
    });


    var sliderEvent = function(){
        removeSliderEvent();
        if( $(this).hasClass('act') ) return false;
        var next = act;
        var _margin_start = -_width*3/2;
        var _margin_end = _width/2;

        if( $(this).hasClass('left') ){
            next = (act-1<0)?items.length-1:act-1;

        } else if( $(this).hasClass('toggle') ){
            var index = toggle.index(this);
            if( index > next ) {
                _margin_start = _width/2;
                _margin_end = -_width*3/2;
            }
            next = index;
        } else {
            next = (act+1>items.length-1)?0:act+1;
            _margin_start = _width/2;
            _margin_end = -_width*3/2;
        }

        $(items[act]).animate({marginLeft:_margin_end,opacity:'toggle'},duration);
        $(toggle[act]).removeClass('act');
        act = next;
        $(items[act]).css({marginLeft:_margin_start})
            .animate({marginLeft:margin_middle,opacity:'toggle'},duration,addSliderEvent);
        $(toggle[act]).addClass('act');
    };
    var addSliderEvent = function(){
        arr_l.bind('click',sliderEvent);
        arr_r.bind('click',sliderEvent);
        toggle.bind('click',sliderEvent);
    };
    var removeSliderEvent = function(){
        arr_l.unbind('click',sliderEvent);
        arr_r.unbind('click',sliderEvent);
        toggle.unbind('click',sliderEvent);
    };

    addSliderEvent();
}

function initProductInnerSlider(slider){
    var act = 0;
    duration = 400;
    var arr_l = $(slider).find('.arrows.left');
    var arr_r = $(slider).find('.arrows.right');
    var items = $(slider).find('.slider_item');
    var imgs = $(slider).find('.item_img');
    var info = $(slider).find('.item_info');
    var bottle1 = $(slider).find('.bottle1');
    var bottle2 = $(slider).find('.bottle2');
    var bottle3 = $(slider).find('.bottle3');
    var delta = 300;
    var styles = {
        img : parseInt($(imgs[0]).css('left')),
        info : parseInt($(info[0]).css('left')),
        bottle1 : parseInt($(bottle1[0]).css('left')),
        bottle2 : parseInt($(bottle2[0]).css('left')),
        bottle3 : parseInt($(bottle3[0]).css('left'))
    }

    $(items).each(function(index, item){
       if(index != act){
           $(imgs[index]).hide();
           $(info[index]).hide();
           $(bottle1[index]).hide();
           $(bottle2[index]).hide();
           $(bottle3[index]).hide();
           $(item).removeClass('none');
       }
    });

    if( $(items).length <= 1 ){
        $(arr_l).remove();
        $(arr_r).remove();
        return false;
    }

    var eventSlider = function(){
        removeEventSlider();
        var next = (act+1>items.length-1)?0:act+1;

        var left = delta;

        if( $(this).hasClass('left') ){
            next = (act-1<0)?items.length-1:act-1;
        } else {
            left = -left;
        }

        $(imgs[act]).animate({opacity:'toggle'},duration);
        $(info[act]).animate({opacity:'toggle'},duration);
        $(bottle1[act]).animate({opacity:'toggle'},duration);
        $(bottle2[act]).animate({opacity:'toggle'},duration);
        $(bottle3[act]).animate({opacity:'toggle'},duration);

        act = next;
        $(imgs[act]).css({left:styles.img-left}).animate({left:styles.img,opacity:'toggle'},duration*2,'easeOutBack',addEventSlider);
        $(info[act]).css({left:styles.info-left}).delay(duration).animate({left:styles.info,opacity:'toggle'},duration);
        $(bottle1[act]).css({left:styles.bottle1-left}).delay(duration).animate({left:styles.bottle1,opacity:'toggle'},duration);
        $(bottle2[act]).css({left:styles.bottle2-left}).delay(duration+100).animate({left:styles.bottle2,opacity:'toggle'},duration);
        $(bottle3[act]).css({left:styles.bottle3-left}).delay(duration+200).animate({left:styles.bottle3,opacity:'toggle'},duration);
    };

    var addEventSlider = function(){
        $(arr_l).bind('click',eventSlider);
        $(arr_r).bind('click',eventSlider);
    };
    var removeEventSlider = function(){
        $(arr_l).unbind('click',eventSlider);
        $(arr_r).unbind('click',eventSlider);
    };

    addEventSlider();
}

function initCardSlider(act){
    act_bottle = (act == undefined)? 0: act;
    var arr_l = $('.card_arrow.left');
    var arr_r = $('.card_arrow.right');
    var card_bg = $('.card_bg');
    var card_bottle_img = $('.card_bottle_img');
    var title = $('.card_bottle .title');
    var random_btn = $('#choose-random');
    random_btn.click(function(e){e.preventDefault()});

    card_bg.removeClass('none').hide();
    card_bottle_img.removeClass('none').hide();
    $(card_bg[act_bottle]).show();
    $(card_bottle_img[act_bottle]).show();

    if( card_bottle_img.length <= 1 ){
        arr_l.remove();
        arr_r.remove();
    }

    var sliderEvent = function(){
        removeSliderEvent();
        $(card_bg[act_bottle]).fadeOut(duration);

        if( $(this).hasClass('left') ){
            $(card_bottle_img[act_bottle]).animate({
                opacity:'toggle',
                marginLeft:'+=50px'
            },duration,'easeOutExpo');
            act_bottle = parseInt(act_bottle);
            act_bottle = ( act_bottle-1 < 0 )?card_bottle_img.length-1:act_bottle-1;
            $(card_bottle_img[act_bottle]).css('marginLeft',-97).animate({
                opacity:'toggle',
                marginLeft: -47
            },duration,'easeOutExpo');
        } else if( $(this).attr('id') == 'choose-random' ){

            $('.card_fieldset textarea').removeClass('default_title');
            // generate random index of bottles
            var array = [];
            for(var i=0;i<card_bottle_img.length;i++){
                if( i != act_bottle )
                array.push(i);
            }
            var rand = array[Math.floor(Math.random() * array.length)];

            // random title and description
            var i = Math.floor(Math.random() * card_titles.length);
            var rand_title = card_titles[i];
            var rand_description = card_desc[i];

            // make animation
            $(card_bottle_img[act_bottle]).animate({
                opacity:'toggle',
                marginLeft:'+=50px'
            },duration,'easeOutExpo');

            act_bottle = rand;

            $(card_bottle_img[act_bottle]).css('marginLeft',-97).animate({
                opacity:'toggle',
                marginLeft: -47
            },duration,'easeOutExpo');

            // update title and description
            $('.card.edit .card_fieldset').removeClass('error');

            $('.card.edit .card_fieldset .title span').text(rand_title).removeClass('default_title');
            $('.card.edit .card_fieldset .description span').text(rand_description).removeClass('default_title');
            $('.card.edit .title_symbols span').text($('.card.edit .card_fieldset .title textarea').attr('maxlength')-rand_title.length);
            $('.card.edit .description_symbols span').text($('.card.edit .card_fieldset .description textarea').attr('maxlength')-rand_title.length);

        } else {
            $(card_bottle_img[act_bottle]).animate({
                opacity:'toggle',
                marginLeft:'-=50px'
            },duration,'easeOutExpo');
            act_bottle = parseInt(act_bottle);
            act_bottle = ( act_bottle+1 > card_bottle_img.length-1 )?0:act_bottle+1;
            $(card_bottle_img[act_bottle]).css('marginLeft',3).animate({
                opacity:'toggle',
                marginLeft: -47
            },duration,'easeOutExpo');
        }

        $(card_bg[act_bottle]).fadeIn(duration,addSliderEvent);
        // update bottle title
        title.html($(card_bottle_img[act_bottle]).data('title'));
    };
    var addSliderEvent = function(){
        arr_l.bind('click',sliderEvent);
        arr_r.bind('click',sliderEvent);
        random_btn.bind('click',sliderEvent);
    };
    var removeSliderEvent = function(){
        arr_l.unbind('click',sliderEvent);
        arr_r.unbind('click',sliderEvent);
        random_btn.unbind('click',sliderEvent);
    };

    addSliderEvent();
}

var send_captcha_flag = 1;
function sendCaptcha(){
    var captcha = $('#captcha').val();

    if (captcha.length > 0) {
        $('.popup_code .input_holder').removeClass('error');
        if (send_captcha_flag) {
            send_captcha_flag = 0;
            $.post('holiday/booking/', {captcha: captcha}, function(result) {
                send_captcha_flag = 1;
                if ('"captcha_error"' == result) {
                    $('.popup_code .input_holder').addClass('error');
                    getNewCaptcha();
                } else if ('true' == result) {
                    showPopup('.popup_order');
                    _trackEvent('getcidre', 'start');
                } else {
                    showPopup('.popup_orders_ended');
                    setTimeout(function(){window.location.reload()}, 5000);
                }
            });
        }
    } else {
        $('.popup_code .input_holder').addClass('error');
    }
}

$(document).ready(function() {
    // add max length function for textareas
    textareaMaxLength();

    // init popups
    if( $('.popup').length ){
        $('.popup').each(function(index, item){
            initPopup($(item));
        });

        if( visible_popup.length ){
            showPopup($('.'+visible_popup));
        }
    }

    // gates controls
    // if( $('.gates').length ){
    //     $('.yes').click(checkGates);
    //     $('.no').click(checkGates);
    //     $('.gates2').removeClass('none').animate({
    //         opacity:'toggle',
    //         height:'toggle'
    //     },0);
    // }
    $('.gates .logo').css({
        position:'fixed',
        top:$('.gates .logo').offset().top-$(window).scrollTop(),
        left:$('.gates .logo').offset().left-$(window).scrollLeft(),
        margin:0
    })
    $('.gates').prepend($('.gates .logo'));
    $('.gates .logo').animate({top:24},duration);
    $('.gates .gates_box').fadeOut(duration/2);
    $('.gates .warning').fadeOut(duration,function(){
        $('.wrapper_gates').hide().removeClass('wrapper_gates').fadeIn(duration,function(){$('.gates').hide()});
    });

    // init select js
    if( $('.select_js').length ){
        $('.select_js').each(function(index, item){
            initSelectJS($(item));
        });
        documentCloseSelect();
    }

    // product slider
    if( $('.product_slider').length ){
        initProductSlider($('.product_slider'));
    }

    if ($('#where-to-buy-city').length) {
        $('#where-to-buy-city .sel_optn').click(function(){
            window.location.href = '../where-to-buy/index.html'/*tpa=http://www.cidreroyal.com/where-to-buy/*/+$(this).data('val') + ($('#where-to-buy-city').hasClass('has_map') ? '/map/' : '/');
        });
    }

    $.post("/game", {
        msgType: 10301,
    },
        function (data, status) {
            if ('success' == status) {
                var ret = data.ret;

                // 请求数据成功
                if (0 == ret) {
                    var wines = data.wineList;
                    // console.log(wines);
                    // 遍历所有酒类
                    for (var i = 0; i < wines.length; i++) {
                        // 进行数据添加
                        var wine = wines[i];

                        var item = $("<div class='slider_item'></div>");

                        // 图片        
                        var imgPath = jf_img_path + 'files/wine/' + wine.img;
                        var itemImg = "<img class='item_img' src='" + imgPath + "' />";

                        // 正文
                        var itemContent = $("<div class='item_info'></div>");
                        var itemTitle = $("<div class='sub_title'></div>").text(wine.name);
                        var itemSubtitle = $("<div class='sub_title'></div>").text(wine.content);
                        var itemDesc = $("<p></p>").append(wine.desc);


                        item.append(itemImg, itemContent);
                        itemContent.append(itemTitle, itemSubtitle, itemDesc);


                        // 规格信息 例：1_0.7L,2_20-30L,
                        var norms = wine.norm.split(',');
                        for (var j = 0; j < norms.length; j++) {
                            var norminfo = norms[j];
                            if ('' != norminfo) {
                                var norm = norminfo.split('_');

                                var itemNorm = $("<div class='bottle" + norm[0] + "'><br /></div>");
                                var itemNormtext = $("<b></b>").text(norm[1]);

                                itemNorm.append(itemNormtext);
                                item.append(itemNorm);
                            }
                        }

                        $("#wineRoyal").append(item);
                    }
                }
            }

            if ($('#product-slider-inner').length) {
                initProductInnerSlider($('#product-slider-inner'));
            }
        });
    
    // video block
    if( $('.video_block').length ){
        $('.video_block').click(function(){
            showPopup('.popup_video');
        })
    }

    // card form editable content
    if( $('.card.edit').length ){
        var title_textarea = $('.card.edit .card_form .title span');
        var title_text = $('.card.edit .card_form .title .inner_text');
//        var title_symbols = $('.card.edit .card_form .title_symbols span');
        var desc_textarea = $('.card.edit .card_form .description span');
        var desc_text = $('.card.edit .card_form .description .inner_text');
//        var desc_symbols = $('.card.edit .card_form .description_symbols span');

        // update symbols
//        $(title_symbols).text($(title_textarea).attr('maxlength')-$(title_textarea).val().length);
//        $(desc_symbols).text($(desc_textarea).attr('maxlength')-$(desc_textarea).val().length);

        // update text to textarea
        $(title_textarea).val($(title_text).text());
        $(title_text).text($(title_text).text());
        $(desc_textarea).val($(desc_text).text());
//
        // functions for update div inner_text
        var title_function = function(e){
            var keyCode = (window.event) ? e.which : e.keyCode;
            if( keyCode== 13 ) e.preventDefault();
            var value = $(this).val();
            $(title_text).text(value);
            $(title_symbols).text($(this).attr('maxlength')-value.length)
        };
        var desc_function = function(e){
            var keyCode = (window.event) ? e.which : e.keyCode;
            if( keyCode== 13 ) e.preventDefault();
            $(desc_text).text($(this).val());
            $(desc_symbols).text($(this).attr('maxlength')-$(this).val().length)
        };
        var formatString = function(str){
            // Свято + str <= 40
//            str = trim(str);
            if( str.indexOf('Свято') != 0 ){
                str = 'Свято '+str;
                str = str.substr(0,39);
            }

             return str;
        };

        $(title_textarea).bind({
            keyup:title_function,
            keydown:title_function
        });

        $(desc_textarea).bind({
            keyup:desc_function,
            keydown:desc_function
        });

        // init bottle and background slider

    }

    if ($('#current-card').length) {
        initCardSlider($('#current-card').val());
    } else if ($('#save-holiday').length) {
        initCardSlider();
    }


    if ($('#save-holiday').length) {

        $('.inner_text').each(function(){
            if(0 == $(this).text().length){

                var i = Math.floor(Math.random() * card_titles.length);
                var rand_title = card_titles[i];
                var rand_description = card_desc[i];

                $('.card.edit .card_fieldset').removeClass('error');

                $('.card.edit .card_fieldset .title span').text(rand_title).removeClass('default_title');
                $('.card.edit .card_fieldset .description span').text(rand_description).removeClass('default_title');
            }
        });

        $('.card_fieldset textarea').focus(function(){
            if ($(this).val() == $(this).prev().data('placeholder')) {
                $(this).val('').removeClass('default_title');
                $(this).prev().text('');
            }
        }).blur(function(){
            if (0 == $(this).val().length) {
                $(this).val($(this).prev().data('placeholder')).addClass('default_title');
                $(this).prev().text($(this).prev().data('placeholder'));
            }
        });



        var request_flag = 1;
        $('#save-holiday').click(function(){

            var title = ($('#holiday-title').text() != $('#holiday-title').data('placeholder'))
                        ? $('#holiday-title').text() : '';
            var description =  ($('#holiday-description').text() != $('#holiday-description').data('placeholder'))
                        ? $('#holiday-description').text() : '';


            var data = {title: title, description: description, id_cidre: act_bottle};

            $('.card_fieldset').removeClass('error').removeClass('empty_error');

            if (request_flag) {
                request_flag = 0;
                $.post('holiday/save/', {data: data}, function(result) {
                    var res = jQuery.parseJSON(result);
                    request_flag = 1;
                    if (true == res.status) {
                        _trackEvent('party', 'data');
                        window.location.href = window.location.port + '//' + window.location.hostname+'/my-holiday/';
                    } else {
                        if (undefined != res['errors']['title']) {
                            $('.title_container').addClass('empty_error');
                        }
                        if (undefined != res['errors']['description']) {
                            $('.description_container').addClass('empty_error');
                        }

                        if (undefined != res['errors']['title_censure']) {
                            $('.title_container').addClass('error');
                        }
                        if (undefined != res['errors']['description_censure']) {
                            $('.description_container').addClass('error');
                        }

                    }
                });
            }


        });
    }


    if ($('#join-team').length) {
        $('#join-team').click(function(){
            _trackEvent('party', 'join');
            $('#join-form').submit();
        });
    }

    if ($('#copy-button').length) {
        $('.copy_message').fadeOut();
        ZeroClipboard.setMoviePath('flash/ZeroClipboard.swf'/*tpa=http://www.cidreroyal.com/js/flash/ZeroClipboard.swf*/);
        var clip = new ZeroClipboard.Client();
        clip.addEventListener( 'mouseDown', function(client) {
            clip.setText($('#copy-link-id').val());
            $('.copy_message').fadeIn();
            _trackEvent('share', 'link');
            setTimeout(function(){
                $('.copy_message').fadeOut();
            }, 2000);
        } );
        clip.glue('copy-button');
    }


    if ($('#send-captcha').length) {


        $('#captcha').keypress(function(e){
            if(e.which == 13) {
                sendCaptcha();
            }
        });

        $('#send-captcha').click(function(){
            sendCaptcha();
        });
    }

    if ($('#save-form').length) {

        $(".phone_mask").mask("(999) 999-9999");

        var save_form_flag = 1;

        $('.popup_order .input_holder input').click(function(){
                $(this).parent().removeClass('error');
        });

        $('#save-form').click(function(){
            $('.popup_order .input_holder').removeClass('error');
            var data = {};
            for(var i=0; i < $('.popup_order .input_holder input').length; i++){
                data[$($('.popup_order .input_holder input')[i]).attr('name')] = $($('.popup_order .input_holder input')[i]).val();
            }
            data['info'] = $('.popup_order .input_holder .description').val();
            data['id_district'] = $('.popup_order .id_district').val();

            if (save_form_flag) {
                save_form_flag = 0;
            }

            $.post('holiday/save-form/', {data: data}, function(result) {
                var res = jQuery.parseJSON(result);
                if ('time_is_up' == res['status']) {
                    showPopup('.popup_regret');
                    setTimeout(function(){window.location.reload()}, 5000);
                } else if (true == res['status']){
                    showPopup('.popup_congrats');
                    _trackEvent('getcidre', 'finish');
                    setTimeout(function(){window.location.reload()}, 5000);
                } else if (undefined != res['errors']) {
                    if (undefined != res['errors']['name']) {$('.popup_order .name_holder').addClass('error');}
                    if (undefined != res['errors']['phone']) {$('.popup_order .phone_holder').addClass('error');}
                    if (undefined != res['errors']['company']) {$('.popup_order .company_holder').addClass('error');}
                    if (undefined != res['errors']['street']) {$('.popup_order .street_holder').addClass('error');}
                    if (undefined != res['errors']['house']) {$('.popup_order .house_holder').addClass('error');}
                }

            });

        });
    }



    // video block
    if( $('.video_block').length ){
        $('.video_block').click(function(){
            showPopup('.popup_video');
        })
    }

});