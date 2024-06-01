type Location = {
    lat: number;
    lng: number;
  };
  
  type Geometry = {
    location: Location;
  };
  
  type OpeningHours = {
    open_now: boolean;
  };
  
  type Photo = {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  };
  
  type PlusCode = {
    compound_code: string;
    global_code: string;
  };
  
  export type Place = {
    business_status: "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY";
    geometry: Geometry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: OpeningHours;
    photos: Photo[];
    place_id: string;
    plus_code: PlusCode;
    rating: number;
    reference: string;
    scope: "GOOGLE";
    types: ("lodging" | "restaurant" | "food" | "point_of_interest" | "establishment")[];
    user_ratings_total: number;
    vicinity: string;
  };