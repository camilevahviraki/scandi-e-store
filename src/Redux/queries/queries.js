export const URL = 'http://localhost:4000/';

export const getCategories = `
{
    categories {
      name
    }
  }
`;

export const getCategory = (name) => `
{
    category (input: {
        title: "${name}"
      }){
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const getProduct = (id) => `
  {
      product(id: "${id}") {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  `;

export const getCurrencies = `
  {
    currencies {
      label
      symbol
    }
  }`;
