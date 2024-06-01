/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


const API_KEY = 'AIzaSyDZGuUd-EdDZW4R2drWRl-VsSOIWZY-rDk';

const getNearbyRestaurants = async (latitude, longitude, isVegan) => {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${new URLSearchParams({
            ...(isVegan && { keyword: 'vegan' }), // Uncomment this line to only show vegan restaurants
            location: `${latitude},${longitude}`,
            radius: 750, // Radius in meters (adjust as needed)
            type: 'restaurant',
            opennow: true,
            key: API_KEY,
        })}`);
        const data = await response.json();
        return data.results;

    } catch (error) {
        console.error(error);
        return null;
    }
};

const filterRecommendationsByType = (recommendations) => {
    return recommendations.filter((recommendation) => {
        const isRestaurant = recommendation.types.includes('food') || recommendation.types.includes('restaurant');
        const isOpen = recommendation.opening_hours && recommendation.opening_hours.open_now;
        return isRestaurant && isOpen;
    });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const latitude = parseFloat(
      url.searchParams.get("latitude")
    );
    const longitude = parseFloat(
      url.searchParams.get("longitude")
    );
    const isVegan = url.searchParams.get("isVegan") === "true";

    if (isNaN(latitude) || isNaN(longitude)) {
        return Response.json({ error: "Invalid latitude or longitude" });
    }

    const recommendations = await getNearbyRestaurants(latitude, longitude, isVegan);

    const filteredRecommendations = filterRecommendationsByType(recommendations);
    return constructResponse(filteredRecommendations)
  },
};

function constructResponse(data) {
  return new Response(
      JSON.stringify(data, null, 2),
      {
          headers: {
              'content-type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
          }
      }
  );
}
