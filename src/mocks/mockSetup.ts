import {
  mockMainCarouselData,
  mockStoriesData,
  mockStoryImagesData,
  mockVideoCarouselData,
  mockMapData,
  mockCustomerReviews,
  mockTreeData,
  mockAuthResponse,
  mockDashboardUser,
  mockNotifications,
  mockNotificationCount,
  mockMySavedTrees,
  mockFinishedOrders,
  mockWaitingOrders,
  mockMyTreesData,
  mockMyMainTreeData,
  mockTreeComments,
  mockMyTickets,
  mockTicketMessages,
  mockShoppingCart,
  mockCartSummary,
  mockCartCount,
  mockCompleteInfoFirstData,
  mockCompleteInfoSecondData,
  mockCompleteInfoThirdData,
  mockProductData,
  mockProductDataArray,
  mockTrees,
  mockCheckInCart,
  mockWalletBalance,
  mockAuthority,
  mockMyProfile,
} from "./index";

export const mockDatabase = {
  "/api/": mockMainCarouselData,
   "/api/stories/": mockStoriesData,
  "/api/story/": mockStoryImagesData,
  "/api/videos/": mockVideoCarouselData,
  "/api/map/": mockMapData,
  "/api/comments": mockCustomerReviews,
  "/api/tree_data/": mockTreeData,
  "/account/api/": mockAuthResponse,
  "/account/api/dashboard/": mockDashboardUser,
  "/account/api/mynotifications/": {
    count: mockNotificationCount,
    data: mockNotifications,
  },
  "/account/api/mysaved/": mockMySavedTrees,
  "/account/api/mywallet/": mockWalletBalance,
  "/account/api/myorders/": { finished: mockFinishedOrders, waiting: mockWaitingOrders },
  "/account/api/mytrees/": mockMyTreesData,
  "/account/api/mytree/": mockMyMainTreeData,
  "/account/api/mytreeComments/": { comments: mockTreeComments },
  "/order/api/treeComments/": { comments: mockTreeComments },
  "/account/api/mytickets/": mockMyTickets,
  "/account/api/myticketmessage/": mockTicketMessages,
  "/account/api/mycart/": {
    items: mockShoppingCart,
    ...mockCartSummary,
  },
  "/cart/api/cartcount/": mockCartCount,
  "/cart/api/mycart/": {
    items: mockShoppingCart,
    all_price: { all_price: 13500000 },
    all_price_with_off: { all_price_off: 12000000 },
    all_products_count: mockShoppingCart.length,
  },
  "/order/api/firstData/": mockCompleteInfoFirstData,
  "/order/api/secondData/": mockCompleteInfoSecondData,
  "/order/api/thirdData/": mockCompleteInfoThirdData,
  "/order/api/tree/": mockProductDataArray,
  "/order/api/trees/": { data: mockTrees, offset: 0 },
  "/api/search/": { data: mockTrees, offset: 0 },
  "/order/api/checkInCart/": mockCheckInCart,
  "/order/api/addOrder/": mockAuthority,
};

export function getMockResponse(url: string, method?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const fullUrl = url.replace(baseUrl, "");

  const entries = Object.entries(mockDatabase).sort((a, b) => b[0].length - a[0].length);

  for (const [key, value] of entries) {
    if (fullUrl.startsWith(key) || fullUrl.includes(key.replace(/\/$/, ""))) {
      if (method === "POST" && key.includes("/remove-fav/")) {
        return { removed: true, added: false };
      }
      if (method === "POST" && key.includes("/deposit/")) {
        return { url: "https://payment.example.com/verify/12345" };
      }
      if (method === "POST" && key.includes("/addOrder/")) {
        return mockAuthority;
      }
      if (method === "POST" && key.includes("/sendTicket/")) {
        return { success: true };
      }
      if (method === "POST" && key.includes("/sendticketMessage/")) {
        return { success: true };
      }
      if (method === "POST" && key.includes("/request-status/")) {
        return { requestSend: true };
      }
      if (method === "POST" && key.includes("/add/")) {
        return { success: true };
      }
      if (method === "POST" && key.includes("/reduce/")) {
        return { success: true };
      }
      if (method === "POST" && key.includes("/increase/")) {
        return { success: true };
      }
      if (method === "PUT" && key.includes("/update-dashboard/")) {
        return mockMyProfile;
      }
      if (method === "POST" && key.includes("/verify/")) {
        return {
          access: "mock-access-token",
          token: "mock-token",
        };
      }
      if (method === "POST" && key.includes("/change-image/")) {
        return { image: "" };
      }
      if (method === "POST" && key.includes("/logout/")) {
        return { success: true };
      }
      if (method === "POST" && fullUrl.includes("/like/")) {
        return { liked: true, likes: 10 };
      }
      if (method === "POST" && fullUrl.includes("/dislike/")) {
        return { disliked: true, dislikes: 2 };
      }
      if (method === "GET" && fullUrl.includes("/checkInCart/")) {
        return mockCheckInCart;
      }
      if (method === "GET" && fullUrl.includes("/clickArea/")) {
        return { success: true };
      }
      if (fullUrl.includes("/orderCallBack/") || fullUrl.includes("/callback/")) {
        return { confirmed: true, msg: "" };
      }
      return value;
    }
  }

  return null;
}