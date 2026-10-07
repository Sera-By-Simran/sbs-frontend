const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  meta?: Record<string, any>;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${BACKEND_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    },
    next: { revalidate: 60 }, // ISR cache for fast page loads
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const errorMsg = json?.error?.message || `HTTP ${res.status}: ${res.statusText}`;
    throw new Error(errorMsg);
  }

  return json as ApiResponse<T>;
}

export const api = {
  getCategories: () => apiFetch('/api/public/v1/categories'),
  getProducts: (params?: { category?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.limit) query.append('limit', String(params.limit));
    const qs = query.toString();
    return apiFetch(`/api/public/v1/products${qs ? `?${qs}` : ''}`);
  },
  getProductBySlug: (slug: string) => apiFetch(`/api/public/v1/products/${slug}`),
  submitEnquiry: (data: {
    full_name: string;
    phone: string;
    email?: string;
    preferred_channel?: string;
    occasion?: string;
    message?: string;
    marketing_consent?: boolean;
    items: Array<{
      product_id: string;
      quantity: number;
      customer_note?: string;
    }>;
  }) =>
    apiFetch('/api/public/v1/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
      next: { revalidate: 0 },
    }),
};
