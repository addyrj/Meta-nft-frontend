import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
import SearchItem from "./views/pages/Searchh/Index";

// import DashboardLayout from "src/layouts/DashboardLayout";
import DashboardLayout from "./layouts/HomeLayout/DashboardLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home")),
  },
  {
    exact: true,
    path: "/item",
    layout: HomeLayout,
    component: SearchItem,
  },

  {
    exact: true,
    path: "/marketplace",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Marketplace/Index")),
  },

  {
    exact: true,
    path: "/marketplace-Detail",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Marketplace/MarketplaceDetail")
    ),
  },
  {
    guard: true,
    exact: true,
    path: "/my-mints",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Mint/MyMint")),
  },
  {
    exact: true,
    path: "/conect-wallet",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Connect/ConnectWallet")),
  },
  {
    guard: true,
    exact: true,
    path: "/mint",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Mint/Index")),
  },
  {
    guard: true,
    exact: true,
    path: "/mint-details",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Mint/MintNftDetails")),
  },
  {
    exact: true,
    path: "/category-view",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Category/CategoryDetails")),
  },
  // {
  //   guard: true,
  //   exact: true,
  //   path: "/dashboard",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/Profile/Profile")),
  // },
  {
    guard: true,
    exact: true,
    path: "/edit-profile",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/EditProfile/EditProfile")),
  },
  {
    // guard: true,
    exact: true,
    path: "/nft-report",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/NFTDetails")),
  },
  {
    guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/admin",
    component: lazy(() => import("src/views/pages/Admin/Admin")),
  },
  {
    guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/control",
    component: lazy(() => import("src/views/pages/AdminControls/Controls")),
  },
  {
    guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/category",
    component: lazy(() =>
      import("src/views/pages/AdminControls/CategoryCreate")
    ),
  },
  // {
  //   exact: true,
  //   layout: DashboardLayout,
  //   path: "/faqpost",
  //   component: lazy(() => import("src/views/pages/AdminControls/FaqPost")),
  // },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/add-static",
    component: lazy(() => import("src/views/pages/AdminControls/AddStatic")),
  },
  // {
  //   exact: true,
  //   layout: DashboardLayout,
  //   path: "/faqupdate",
  //   component: lazy(() => import("src/views/pages/AdminControls/FaqUpdate")),
  // },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/faqadd-list",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/ViewFaq")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/faq-list",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/Faq")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/editfaq-list",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/EditFaq")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/view-faqdata",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/ViewFaq")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/add-faqdata",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/AddFaq")
    ),
  },
  {
    guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/add-subadmin",
    component: lazy(() => import("src/views/pages/AdminControls/SubAdmin")),
  },
  {
    exact: true,
    path: "/creators-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Creator/index")),
  },
  {
    guard: true,
    exact: true,
    path: "/profile",
    layout: DashboardLayout,
    // layout: HomeLayout,

    component: lazy(() => import("src/views/pages/Profile/Profile")),
  },
  {
    // guard: true,
    exact: true,
    path: "/feedback-list",
    layout: DashboardLayout,
    // layout: HomeLayout,

    component: lazy(() => import("src/views/pages/Admin/FeedbackList")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/request-message",
    component: lazy(() =>
      import("src/views/pages/RequestBlockMessage/RequestMessage")
    ),
  },
  // Done
  {
    guard: true,
    exact: true,
    path: "/activity",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Activity/index")),
  },
  {
    exact: true,
    path: "/collections",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Collections/Collections")),
  },
  {
    exact: true,
    path: "/hot-collection",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Collections/HotCollection")),
  },
  {
    exact: true,
    path: "/my-collections",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MyCollection/MyCollection")),
  },
  {
    guard: true,
    exact: true,
    path: "/create",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Create/CreateNFT")),
  },
  {
    guard: true,
    exact: true,
    path: "/resale-nft",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Create/ResellNFT")),
  },
  {
    exact: true,
    path: "/creators",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Creator/index")),
  },
  {
    exact: true,
    path: "/author",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Author/Author")),
  },
  {
    exact: true,
    path: "/collection-details",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Details/Nft")),
  },
  {
    exact: true,
    path: "/auction",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/FeatureAuction/Auction")),
  },
  {
    exact: true,
    path: "/explore",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Explore/Explore")),
  },
  {
    exact: true,
    path: "/feedback",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Feedback/Feedback.js")),
  },
  {
    exact: true,
    path: "/faqs",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/FAQs/Index")),
  },
  {
    exact: true,
    path: "/support-tickets",
    layout: HomeLayout,
    component: lazy(() => import("src/component/SupportTickets")),
  },
  {
    exact: true,
    path: "/subscribehovr",
    layout: HomeLayout,
    component: lazy(() => import("src/component/Subscribe")),
  },
  {
    exact: true,
    path: "/ranking",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Ranking/Ranking.js")),
  },
  {
    exact: true,
    path: "/search",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Search")),
  },
  {
    exact: true,
    path: "/searchprofile",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Search")),
  },
  {
    exact: true,
    path: "/help-center",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/HelpCenter/HelpCenter.js")),
  },
  {
    exact: true,
    path: "/edit-pressmedia",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PressMedia/EditPressmedia")),
  },
  {
    exact: true,
    path: "/edit-media",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PressMedia/EditMedia")),
  },
  {
    exact: true,
    path: "/edit-category",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/EditCategory/EditCategory")),
  },
  {
    exact: true,
    path: "/media-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PressMedia/MediaList")),
  },
  {
    exact: true,
    path: "/view-media",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PressMedia/ViewMedia")),
  },
  {
    exact: true,
    path: "/about",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/About/About")),
  },
  {
    exact: true,
    path: "/terms-conditions",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/T&C/Term")),
  },
  {
    exact: true,
    path: "/privacy-policy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Privacy/Privacy")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/request-message",
    component: lazy(() =>
      import("src/views/pages/RequestBlockMessage/RequestMessage")
    ),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
