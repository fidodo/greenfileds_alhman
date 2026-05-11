const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337/api";

async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || "API request failed");
  }

  const data = await response.json();

  if (data.data) {
    if (Array.isArray(data.data)) {
      return data.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        ...item,
      }));
    }
    return {
      id: data.data.id,
      documentId: data.data.documentId,
      ...data.data,
    };
  }

  return data;
}

// ==================== COWS API ====================
export async function getAvailableCows() {
  const data = await fetchAPI(
    "/cows?filters[isAvailable][$eq]=true&populate=image&publicationState=live",
  );
  return data;
}

export async function getAllCows() {
  const data = await fetchAPI("/cows?populate=image&publicationState=live");
  return data;
}

export async function adoptCow(adoptionData) {
  return fetchAPI("/cows/adopt", {
    method: "POST",
    body: JSON.stringify(adoptionData),
  });
}

// Admin functions (require authentication)
export async function deleteCow(cowId, authToken) {
  const response = await fetch(`${API_URL}/cows/${cowId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete cow");
  }

  return response.json();
}

// ==================== EVENTS API ====================
export async function getUpcomingEvents() {
  const today = new Date().toISOString().split("T")[0];
  const data = await fetchAPI(
    `/events?filters[date][$gte]=${today}&sort=date:asc&populate=image&publicationState=live`,
  );
  return data;
}

// ==================== NEWSLETTER API ====================
export async function subscribeToNewsletter(email) {
  return fetchAPI("/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// ==================== STATS API ====================
export async function getStats() {
  return fetchAPI("/stats");
}

// ==================== FEEDBACK API ====================
export async function submitFeedback(feedbackData) {
  return fetchAPI("/feedbacks", {
    method: "POST",
    body: JSON.stringify({ data: feedbackData }),
  });
}

// ==================== CONTACT FORM API ====================
export async function submitContact(contactData) {
  return fetchAPI("/contact-submissions", {
    method: "POST",
    body: JSON.stringify({ data: contactData }),
  });
}
