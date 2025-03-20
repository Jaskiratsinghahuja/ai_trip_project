export const SelectTraveleslist=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole travel explore',
        people:1,
        icon:'😎'
    },
    {
        id:2,
        title:'Couple ',
        desc:'Two travel in honeymoon',
        people:2,
        icon:'👫'
    },
    {
        id:3,
        title:'Family',
        desc:'a family trip with my loved ones',
        people:4,
        icon:'👪'
    },
    {
        id:4,
        title:'friends',
        desc:'A bunch of thrill-seekes ',
        people:4,
        icon:'👥'
    },
]
export const selectBudgetOption=[
    {
        id:1,
        title:'cheap',
        desc:'Stay conscious of costs',
        
        icon:'💸'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side ',
        
        icon:'🤑'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        
        icon:'💰'
    },

]
export const AI_PROMPT = 
  `Generate a travel plan for location: {location} for {totaldays} days for {traveler} with a {budget} budget. 
  Provide a list of hotels with Hotel Name, Hotel Address, Price, Hotel Image URL, Geo Coordinates, Rating, and Descriptions. 
  Suggest an itinerary with Place Name, Place Details, Place Image URL, Geo Coordinates, Ticket Pricing, Rating, and Travel Time 
  for each location. Plan for 3 days, with each day's best visiting time, in JSON format.`;