(function () {
    var styles = [
        {
            featureType: 'water',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: -100 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: -100 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'landscape.man_made',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: -100 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'landscape.natural',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: -100 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'road',
            elementType: 'all',
            stylers: [
                { hue: '#c7b884' },
                { saturation: -63 },
                { lightness: 3 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [
                { hue: '#c7b884' },
                { saturation: -63 },
                { lightness: 3 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'poi',
            elementType: 'all',
            stylers: [
                { hue: '#e7e7e7' },
                { saturation: -100 },
                { lightness: 57 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'http://www.cidreroyal.com/js/poi.park',
            elementType: 'all',
            stylers: [
                { hue: '#e7e7e7' },
                { saturation: -100 },
                { lightness: 57 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'administrative.locality',
            elementType: 'all',
            stylers: [
                { hue: '#413d34' },
                { saturation: 11 },
                { lightness: 23 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'administrative.country',
            elementType: 'all',
            stylers: [
                { hue: '#413d34' },
                { saturation: 11 },
                { lightness: -55 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'administrative.province',
            elementType: 'all',
            stylers: [
                { hue: '#413d34' },
                { saturation: 11 },
                { lightness: -55 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'transit',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: 0 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'administrative.land_parcel',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: 0 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'administrative.neighborhood',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: 0 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'water',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: -100 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        }
    ];

    var markers = [];
    var infoWindow = new google.maps.InfoWindow();

    var clearMarkers = function () {
        for (var i = 0, l = markers.length; i < l; i++) {
            markers[i].setMap(null);
            markers[i] = null;
        }
        markers = [];
    };
    window.clearMarkers = clearMarkers;
    var centerMap = function () {
        if (!markers.length) return;
        if (markers.length < 2) {
            map.setCenter(markers[0].getPosition());
        } else {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, l = markers.length; i < l; i++) {
                bounds.extend(markers[i].getPosition());
            }
            map.fitBounds(bounds);
        }
    };
    var info_boxes = [];
    var clearInfoWindows = function () {
        for (var i = 0, l = info_boxes.length; i < l; i++) {
            info_boxes[i].setMap(null);
        }
    };
    window.clearInfoWindows = clearInfoWindows;

    window.centerMap = centerMap;

    var markerCluster;

    var gimage = new google.maps.MarkerImage('images/gmarker.png'/*tpa=http://www.cidreroyal.com/js/images/gmarker.png*//*, new google.maps.Size(42, 57), new google.maps.Point(0, 0), new google.maps.Point(19, 51)*/);
    var addMarker = function (lat, lng, html) {
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        if (isNaN(lat) || isNaN(lng)) return;
        var marker_position = new google.maps.LatLng(lat, lng);

        var marker = new google.maps.Marker({
            position: marker_position,
            active: false,
            cursor: !!(html) ? 'pointer' : 'default',
            icon: gimage
        });

        if (html) {
            var infoBox = new InfoBox({latlng: marker.getPosition(), map: map, html: html, onmouseout: function(){
                clearInfoWindows();
            }});
            infoBox.setMap(null);
            info_boxes.push(infoBox);
            google.maps.event.addListener(marker, 'click', function() {
                var was_opened = !!infoBox.getMap();
                clearInfoWindows();
                if (!was_opened) {
                    infoBox.setMap(map);
                }
            });
        }

        marker.setMap(map);
        markers.push(marker);
        centerMap();
    };

    window.markerClusterDraw = function() {
        markerCluster.addMarkers(markers);
    };

    window.addMarker = addMarker;

    var setMapZoom = function(zoom) {
        zoom = parseInt(zoom);
        if (isNaN(zoom) || zoom < 1) return;
        map.setZoom(zoom);
    };
    window.setMapZoom = setMapZoom;

    function initialize() {
        var mapOptions = {
            scrollwheel: false,
            mapTypeControlOptions: {
                mapTypeIds: [ 'Cidre Royal']
            },
            center: new google.maps.LatLng(50.421506, 30.52288),
            zoom: 14,
            mapTypeId: 'Cidre Royal'
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        google.maps.event.addListener(map, 'click', function() {
            clearInfoWindows();
        });

        var styledMapType = new google.maps.StyledMapType(styles, { name: 'Cidre Royal' });
        map.mapTypes.set('Cidre Royal', styledMapType);
    }

    function initializeBuyMap() {
        var mapOptions = {
            scrollwheel: false,
            mapTypeControlOptions: {
                mapTypeIds: [ 'Cidre Royal']
            },
            center: new google.maps.LatLng(50.421506, 30.52288),
            zoom: 14,
            mapTypeId: 'Cidre Royal'
        };

        map = new google.maps.Map(document.getElementById('map-buy'), mapOptions);
        var styledMapType = new google.maps.StyledMapType(styles, { name: 'Cidre Royal' });
        map.mapTypes.set('Cidre Royal', styledMapType);

        markerCluster = new MarkerClusterer(map, [], {
            maxZoom: 11
        });

        //addMarker(50.421506, 30.52288,'<div class="iw_title">Велика Кишеня</div><div class="iw_text">пр. Воссоединения, 2/1а<br />(044) 593 36 06</div><i class="iw_arrow"></i>');
    }

    $(document).ready(function () {
        if ($('#map-canvas').length) initialize();
        if ($('#map-buy').length) initializeBuyMap();
    });

})();