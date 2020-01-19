// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      var waterloo = {lat: 43.4643, lng: -80.5204};
      var pop = [];
    
      var pingus = "https://scontent.fyyz1-2.fna.fbcdn.net/v/t1.15752-9/83028226_612803369515075_1839994385089953792_n.png?_nc_cat=108&_nc_ohc=l-FVhjTTYMgAX-1U6Gp&_nc_ht=scontent.fyyz1-2.fna&oh=d177d219803f164656818e23c5d0123e&oe=5ED03C19";

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: waterloo
        });

        var markers = [];
        var events = [
            {
                org: 'University of Waterloo',
                event: 'Insert Event Title Here',
                address: '200 University Ave W, Waterloo, ON',
                location: {lat: 43.472324, lng: -80.544954},
                description: 'Insert volunteer description here <br>Sign up at <a href="https://www.youtube.com/">Sign up here</a>',
                date: 1
            },
            {
                org: 'Wilfred Laurier',
                event: 'also nothing',
                address: '75 University Ave W, Waterloo, ON',
                location: {lat: 43.472299, lng: -80.526308},
                description: 'hurgis burgis',
                date: new Date("January 31 2020 12:30")
            },
            {
                org: 'Starbucks',
                event: 'weed',
                address: 'Town Square, 95 King St S, Waterloo, ON',
                location: {lat: 43.473630, lng: -80.528808},
                description: 'uwuwowowowouwuwuwo',
                date: new Date("January 31 2020 12:30")
            },
            {
                org: 'Test',
                event: 'weed',
                address: 'Kitchener ON',
                location: {lat: 43.473630, lng: -80.528808},
                description: 'uo',
                date: new Date("January 31 2020 12:30")
            }
        ];

        var bounds = new google.maps.LatLngBounds();

        var geocoder = new google.maps.Geocoder();
        
        for (var i = 0; i < events.length; i++) {
            createMarker(events[i]);
          }

        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            bounds.extend(pos);
            infoWindow.setPosition(pos);
            infoWindow.setContent('You');

            map.fitBounds(bounds);
            map.panToBounds(bounds);
            infoWindow.open(map);

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


        function createMarker(info){

                geocoder.geocode({'address': info.address}, function(results, status) {
                  if (status === 'OK') {
                    var loc = results[0].geometry.location;
                    bounds.extend(loc);
                    var marker = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: pingus,
                        position: loc,
                        title: info.event
                    });
                    marker.addListener('click', function(){ 
                        showDescr(marker, info, loc);
                    });
   
                  } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                  }
                  
                }); 
              }

            // Create a marker and set its position.


        function showDescr(marker, info, loc){
            for (var i = 0; i < pop.length; i++) {
                pop[i].close();
            }

            popup = new google.maps.InfoWindow;
            popup.setPosition(loc);
            message = '<b>Organization:</b> '+ info.org
            + '<br><b>Event name:</b> ' + info.event
            + '<br><b>Description:</b><br>' + info.description
            + '<br><b>Date:</b> ' + info.date;
            popup.setContent(message); 
            pop.push(popup);
            popup.open(map, marker);
        }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

}
      
      