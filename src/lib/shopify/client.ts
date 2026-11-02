/**
 * Shopify Storefront API Client Configuration & Queries
 * Powers Headless Commerce for store.thesmartmag.com
 */

import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN || "";
const publicAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const apiVersion = process.env.SHOPIFY_API_VERSION || "2024-07";

export const isShopifyConfigured = Boolean(storeDomain && publicAccessToken);

export const shopifyClient = isShopifyConfigured
  ? createStorefrontApiClient({
      storeDomain,
      apiVersion,
      publicAccessToken,
    })
  : null;

// GraphQL: Fetch Products for Storefront
export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int = 20) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL: Create Checkout / Cart
export const CREATE_CART_MUTATION = `
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;
