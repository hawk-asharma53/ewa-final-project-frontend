export const routes = {
  HOME: '/home',
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PRODUCTS: '/products',
  SERVICES: '/services',
  ABOUT: '/about',
  CHECKOUT: '/checkout',
  DASHBOARD: '/dashboard',
  MAP: '/stores',
};

export const ServiceFilters = {
  Interior: {
    label: 'Interior',
    value: 'interior',
    subFilters: [
      {
        label: 'Furniture',
        value: 'furniture',
      },
      {
        label: 'Plumbing',
        value: 'plumbing',
      },
      {
        label: 'Painting',
        value: 'painting',
      },
      {
        label: 'Electrical',
        value: 'electrical',
      },
    ],
  },
  Exterior: {
    label: 'Exterior',
    value: 'exterior',
    subFilters: [
      {
        label: 'Lawn, Gardening and Landscaping',
        value: 'lawn',
      },
      {
        label: 'Painting',
        value: 'painting',
      },
      {
        label: 'Waterproofing',
        value: 'waterproofing',
      },
    ],
  },
};

export const ProductFilters = [
  {
    label: 'Woodworking',
    value: 'woodworking',
  },
  {
    label: 'Paiting',
    value: 'painting',
  },
  {
    label: 'Plumbing',
    value: 'plumbing',
  },
  {
    label: 'Gardening',
    value: 'gardening',
  },
  {
    label: 'Automobile and Garage',
    value: 'automobile',
  },
];

export const ListItemTypes = {
  Product: 'product',
  Service: 'service',
};
