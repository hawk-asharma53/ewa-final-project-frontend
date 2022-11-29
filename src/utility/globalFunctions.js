export const productCategories = [
    "Paint",
    "Heating, Cooling & Air Quality",
    "Garage & Storage",
    "Home Safety",
    "Kitchen Renovation",
    "Wall Stickers & Coverings",
    "Window & Window Supplies",
    "Bathroom Renovation"
]

const serviceCategories = [
    "Handyman",
    "Moving",
    "Furniture Assembly",
    "Mounting & Installation",
    "Cleaning",
    "Yardwork Services"
]

export function getProductCategory( categoryid ) {
    return productCategories[categoryid-1];
}