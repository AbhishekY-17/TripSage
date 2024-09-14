export const SelectTravelesList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'✈',
        people:'1'
    },
    {
        id:2,
        title:'A couple',
        desc:'Two travelels in tandem',
        icon:'🥂',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:3,
        title:'Friends',
        desc:'A bunch of thrill-seeksers',
        icon:'⛵',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of cost',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },
]

export const AI_PROMPT='Generate Travel Plan for Location : {location} for {totalDays} Days for {companions} with a {budget} budget, give me hotel options list with Hotel Name, Hotel Address, Price, Hotel Image URL, Geo Coordinates, rating , description, and suggest itinerary with placeName, PlaceDetials, Place Image Url, Geo Coordinates, ticket pricing, Time to travel to each of the location for {totalDays} days with each day plan divided into morining, afternoon and evening in array of map for each day with best time to visit in JSON format and in tripData I want format to be {"hotels":[{},{},{}.....], "itinerary":[{},{},{}....]}'