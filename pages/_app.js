import './main.css'

const activities = [{
    human: 'pizza slice',
    emoji: '🍕', 
},
{
    human: 'citi bike',
    emoji: '🚴‍♂️', 
}, {
    human: 'walking',
    emoji: '🚶‍♂️', 
}, {
    human: 'takeout bar',
    emoji: '🍹',
}, {
    human: 'burger',
    emoji: '🍔', 
}, {
    human: 'coffee',
    emoji: '☕️',
}]
const neighborhoods = [{
    name: 'Lower East Side',
    lat: 40.7166182, 
    lng: -73.9935457
}, {
    name: 'Bushwick',
    lat: 40.6942535,
    lng: -73.9389312
}, {
    name:'Red Hook', 
},
    {
        name: 'Red Hook',},
    {
        name: 'Upper East Side',},
    {
        name: 'Lower East',},
    {
        name: 'East Village',},
    {
        name: 'West Village',},
    {
        name: 'Astoria',},
    {
        name: 'Prospect Park',},
    {
        name: 'Central Park',},
    {
        name: 'Williamsburg',},
    {
        name: 'Greenpoint',},
  ];

  if (typeof window !== 'undefined') {
    window.initMap = () => {
        var nyc = new google.maps.LatLng(40.7128, -74.0060);
        window.infowindow = new google.maps.InfoWindow();
        window.map = new google.maps.Map(document.getElementById("map"), {
          center: nyc,
          zoom: 11
        });
      }
  }
  

  function createMarker(place) {
    var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
    var marker = new google.maps.Marker({
      map: window.map,
      position: place.geometry.location,
      icon: image,
      title: place.name,
    });
    google.maps.event.addListener(marker, "click", function() {
      window.infowindow.setContent(place.name);
      window.infowindow.open(window.map, this);
    });
  }

  export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        winner: null
      }
      this.handleClick = this.handleClick.bind(this);
    }  

    // componentDidMount() {
    //     const script = document.createElement("script");

    //     script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAB8PbdkTKZm5UuCLrXaakndtRWzCXur3E&callback=initMap&libraries=places&v=weekly";
    //     script.async = true;
    
    //     document.body.appendChild(script);
    // }
  
    handleClick() { 
      this.setState({ 
          activity: Math.floor(Math.random() * activities.length), 
          neighborhood: Math.floor(Math.random() * neighborhoods.length),
      }, () => {
          return false;
          const { activity, neighborhood } = this.state;
          const human = activities[activity].human;
          const neighborhoodName = neighborhoods[neighborhood].name;

          if (human === 'citi bike') {
            window.bikeLayer = new google.maps.BicyclingLayer();
            window.bikeLayer.setMap(window.map);
          } else {
            // window.bikeLayer.
          }

        // var request = {
        //     query: `%{human} ${neighborhoodName}`,
        //     fields: ["name", "geometry", "icon", "photos"]
        //   };
          var location = new google.maps.LatLng(neighborhoods[neighborhood].lat, neighborhoods[neighborhood].lng);
          var request = {
            location,
            radius: '1',
            query: human,
            fields: ["name", "geometry", "icon", "photos"]
          };
          window.service = new google.maps.places.PlacesService(window.map);
          window.service.textSearch(request, function(
            results,
            status
          ) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log({ results })
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
              }
      
              window.map.setCenter(results[0].geometry.location);
              window.map.setZoom(13);
            }
          });
      });
      
    }

    render() {
        const { activity, neighborhood } = this.state;
        let repeatButton = null;
  
        return (
          <div>
            <h1>
              NYC Corona Date 💕
            </h1>
            <button onClick={this.handleClick}>Gimme a date!</button>
  
              {/* <div id="map"></div> */}
            {activity >= 0 && neighborhood >= 0 && (
              <div className={`spinner-container`}>
                <Spinner value={activities[activity].emoji} /> in <Spinner value={neighborhoods[neighborhood].name} />
                <iframe width="600" height="450" frameBorder="0" src={`https://www.google.com/maps/embed/v1/search?q=${activities[activity].human}%20near%20${neighborhoods[neighborhood].name}&key=AIzaSyAB8PbdkTKZm5UuCLrXaakndtRWzCXur3E`} allowFullScreen />
              </div>
            )}
          </div>
        );
      }
  }  
    
  class Spinner extends React.Component {  
    constructor(props){
      super(props);
    //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    };  
    render() {
      const { options, selected, value } = this.props;  
      return (
        <span 
          className={`icons`}          
        >
            {value}
            </span>
      );
    }
  }
    