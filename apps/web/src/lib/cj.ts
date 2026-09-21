/**
 * CJ Affiliate (Commission Junction) product feed client.
 *
 * Proof-of-concept for the product-import pipeline - confirms we can pull
 * real, live products from a joined supplier via CJ's GraphQL Product Feed
 * API. See https://developers.cj.com (Product Feed API).
 *
 * Auth is a Personal Access Token (CJ_PERSONAL_ACCESS_TOKEN), scoped to our
 * CJ account (CJ_COMPANY_ID) - never the account password.
 *
 * Next step once this is confirmed working: AWIN is the second supplier
 * (see help.awin.com/apidocs) - same shape, different API, not wired up yet.
 */

const CJ_ENDPOINT = "https://ads.api.cj.com/query";

export type CjProduct = {
  id: string;
  title: string;
  description: string | null;
  brand: string | null;
  advertiserId: string;
  advertiserName: string;
  price: { amount: string; currency: string } | null;
  salePrice: { amount: string; currency: string } | null;
  imageLink: string | null;
  link: string;
};

export type CjSearchResult = {
  totalCount: number;
  count: number;
  products: CjProduct[];
};

const PRODUCTS_QUERY = `
  query Products($companyId: ID!, $keywords: [String!], $limit: Int) {
    products(companyId: $companyId, keywords: $keywords, limit: $limit) {
      totalCount
      count
      resultList {
        id
        title
        description
        brand
        advertiserId
        advertiserName
        price { amount currency }
        salePrice { amount currency }
        imageLink
        link
      }
    }
  }
`;

/**
 * Searches CJ's product catalog by keyword. Returns products across CJ's
 * whole network (not just advertisers we've joined) - joined-only filtering
 * (via partnerIds) is the next step once we've confirmed specific supplier
 * relationships with the client.
 */
export async function searchCjProducts(
  keywords: string[],
  limit = 20,
): Promise<CjSearchResult> {
  const token = process.env.CJ_PERSONAL_ACCESS_TOKEN;
  const companyId = process.env.CJ_COMPANY_ID;
  if (!token || !companyId) {
    throw new Error(
      "CJ_PERSONAL_ACCESS_TOKEN / CJ_COMPANY_ID are not set - add them to .env.local.",
    );
  }

  const res = await fetch(CJ_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: PRODUCTS_QUERY,
      variables: { companyId, keywords, limit },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`CJ API request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`CJ API error: ${json.errors[0].message}`);
  }

  return {
    totalCount: json.data.products.totalCount,
    count: json.data.products.count,
    products: json.data.products.resultList,
  };
}
