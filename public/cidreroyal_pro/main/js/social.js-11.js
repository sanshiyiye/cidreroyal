//Facebook
var acl_flag = 1;
function joinTeam(){
    acl_flag = 2;
    fbLoginCAL();
    _trackEvent('party', 'join');
}

function fbLoginCAL(){
    FB.login(fbGetUserInfo, {scope: FB_SCOPE})
}

function fbGetUserInfo() {
    if(!loginStatus){
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                var auth_response = response.authResponse;
                FB.api('/me?fields=id,name,first_name,last_name,gender,link,email,hometown,location,picture.width(131).height(131)', function(response) {
                    $.post('social/social-login-acl/', {user: response, auth_response: auth_response, social_key: 'fb'}, function(result) {
                        if (1 == acl_flag) {
                            window.location.href = window.location.port + '//' + window.location.hostname+'/create-holiday/';
                        } else {
                            if ($('#join-form').length) {
                                $('#join-form').submit();
                            }
                        }

                    });
                });

            }
        });
    }
}

function fbPostOnWall(link, title, description, picture, to,caption){
    var obj = {
        method: 'feed',
        link: link,
        name: title,
        description: description,
        picture: picture,
        to: to
    };

    if(undefined != caption){
        obj.caption = caption;
    }

    FB.ui(obj, function(res){
        console.log(res);
        if((undefined != res) && (undefined != res.post_id)){
//            success
            console.log('success');
        }else{
//            error
            console.log('error');
        }
    });
}

function likeGroup(){
    _trackEvent('facebookpage', 'like');
    window.location.reload();
}

function sharePopup(social_key, purl, ptitle, pimg, text){
    if ('vk' == social_key){
        _trackEvent('share', 'vk');
        purl+= '?utm_source=vkontakte&utm_medium=share&utm_campaign=Cidre+Royal';
        url  = 'http://vkontakte.ru/share.php?';
        url += 'url='          + encodeURIComponent(purl);
        url += '&title='       + encodeURIComponent(ptitle);
        url += '&description=' + encodeURIComponent(text);
        url += '&image='       + encodeURIComponent(pimg);
        url += '&noparse=true';
    } else if('od' == social_key){
        url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
        url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=2&st.noresize=on';
        url += '&st.comments=' + encodeURIComponent(text);
        url += '&st._surl='    + encodeURIComponent(purl);
    } else if('fb' == social_key){
        _trackEvent('share', 'fb');
        purl+= '?utm_source=facebook&utm_medium=share&utm_campaign=Cidre+Royal';
        url  = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]='     + encodeURIComponent(ptitle);
        url += '&p[summary]='   + encodeURIComponent(text);
        url += '&p[url]='       + encodeURIComponent(purl);
        url += '&p[images][0]=' + encodeURIComponent(pimg);
    } else if('tw' == social_key){
        _trackEvent('share', 'tw');
        purl+= '?utm_source=twitter&utm_medium=share&utm_campaign=Cidre+Royal';
        url  = 'http://twitter.com/share?';
        url += 'text='      + encodeURIComponent(ptitle);
        url += '&url='      + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
    }

    var width = ($(window).width()-650)/2;
    var height = ($(window).height()-400)/2;
    return social_key_popup = window.open(url, social_key, 'width=650,height=400,left='+width+',top='+height+';');
}


$(document).ready(function() {

    if ($('#like_group_popup').length) {
        FB.Event.subscribe('edge.create',function(){
            likeGroup();
        });
        FB.Event.subscribe('edge.remove',function(){
            likeGroup();
        });

        VK.Observer.subscribe('widgets.subscribed',function(){
            likeGroup();
        });
        VK.Observer.subscribe('widgets.unsubscribed',function(){
            likeGroup();
        });

    }



});
