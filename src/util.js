
//get images for current cities
export const getCityImages = (cityName) => (
    fetch(`https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images`)
        .then(response => response.json())
        .then(data => {
            let city = data._embedded['ua:item'].find(city => city.name === cityName);

            let { image } = city._embedded["ua:images"]['photos'][0];
            return image['web'];
        })
)


//get city score links for current cities 
export const getCityScoreLink = (cityName) => (
    fetch(`https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images`)
        .then(response => response.json())
        .then(data => {
            let city = data._embedded['ua:item'].find(city => city.name === cityName);

            let cityScores = city._links['ua:scores']['href']
            return cityScores;

        })
)

// //get basic info links for current cities
// export const getBasicCityInfoLinks = (cityName) => (
//     fetch(`https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images`)
//         .then(response => response.json())
//         .then(data => {
//             let city = data._embedded['ua:item'].find(city => city.name === cityName);

//             let basicCityInfo = city._links['ua:identifying-city']['href']
//             setBasicCityInfo(basicCityInfo)

//         })
// )