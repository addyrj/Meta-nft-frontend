//UAT LOCAL
// export const baseurl = "http://182.72.203.250:1919/";
export const baseurl = "";


let user = `${baseurl}api/v1/user`;
let collection = `${baseurl}api/v1/collection`;
let nft = `${baseurl}api/v1/nft`;
let order = `${baseurl}api/v1/order`;
let bid = `${baseurl}api/v1/bid`;
let admin = `${baseurl}api/v1/admin`;
let staticlist = `${baseurl}api/v1/static`;
const Apiconfigs = {
  connectWallet: `${user}/connectWallet`,
  profile: `${user}/profile`,
  updateProfile: `${user}/updateProfile`,
  myCollectionList: `${collection}/myCollectionList`,
  createCollection: `${collection}/createCollection`,
  viewCollection: `${collection}/viewCollection/`,
  editCollection: `${collection}/editCollection`,
  userOwendCount: `${user}/userOwendCount/`,
  followUnfollow: `${user}/followUnfollow/`,
  userLikesCount: `${user}/userLikesCount/`,
  userOnSaleCount: `${user}/userOnSaleCount/`,
  userCreatedCount: `${user}/userCreatedCount/`,
  userFollowerCount: `${user}/userFollowerCount/`,
  userFollowingCount: `${user}/userFollowingCount/`,
  userBuyAndCreatedList: `${user}/userBuyAndCreatedList/`,
  dashboardCount: `${user}/dashboardCount`,
  userSubscribe: `${user}/userSubscribe`,
  userVerifySubscription: `${user}/userVerifySubscription`,
  onSaleCount: `${user}/onSaleCount`,
  userFavourateCount: `${user}/userFavourateCount/`,
  createOrderReports: `${user}/createOrderReports`,

  //collection
  myCollectionList: `${collection}/myCollectionList`,
  createCollection: `${collection}/createCollection`,
  collectionList: `${collection}/collectionList`,
  viewCollection: `${collection}/viewCollection/`,

  // userlist
  userList: `${user}/userList`,
  userReports: `${user}/userReports`,
  getUserDetails: `${user}/getUserDetails/`,
  requestForUnblock: `${user}/requestForUnblock`,
  dashboardSearch: `${user}/dashboardSearch`,
  listUserToUserReport: `${user}/listUserToUserReport`,

  // admin
  listUser: `${admin}/listUser`,
  soldNftList: `${admin}/soldNftList`,
  reportsList: `${admin}/reportsList`,
  viewReport: `${admin}/viewReport/`,
  blockReport: `${admin}/blockReport/`,
  kycApproveReject: `${admin}/kycApproveReject`,
  addSubAdmin: `${admin}/addSubAdmin`,
  listSubAdmin: `${admin}/listSubAdmin`,
  blockUnblockUser: `${admin}/blockUnblockUser`,
  listCategory: `${admin}/listCategory`,
  addCategory: `${admin}/addCategory`,
  deleteCategory: `${admin}/deleteCategory`,
  unblockRequestList: `${admin}/unblockRequestList`,
  changeCollectionFee: `${admin}/changeCollectionFee`,
  getCollectionFee: `${admin}/getCollectionFee`,
  editCategory: `${admin}/editCategory`,

  // nft
  createNFT: `${nft}/createNFT`,
  uploadNFT: `${nft}/uploadNFT`,
  ipfsUpload: `${nft}/ipfsUpload`,
  addNft: `${nft}/addNft`,
  listNFT: `${nft}/listNFT`,
  viewNFT: `${nft}/viewNFT/`,
  showNftHistory: `${nft}/showNftHistory`,
  showActivity: `${nft}/showActivity`,
  uploadImage: `${nft}/uploadImage`,

  //nfttopseller

  topBuyers: `${user}/topBuyers`,
  topSellers: `${user}/topSalers`,
  contactUs: `${user}/contactUs`,

  //order
  likeDislikeOrder: `${order}/likeDislikeOrder/`,
  createOrder: `${order}/createOrder`,
  editOrder: `${order}/editOrder`,
  viewOrder: `${order}/viewOrder/`,
  feedBack: `${order}/feedBack`,
  listfeedback: `${order}/listfeedback`,
  particularCollectionOrderList: `${order}/particularCollectionOrderList/`,
  favouriteUnFavouriteOrder: `${order}/favouriteUnFavouriteOrder/`,
  floorTradeCount: `${order}/floorTradeCount`,
  particularCategoryOrderList: `${order}/particularCategoryOrderList`,
  orderCollectionListByCategory: `${order}/orderCollectionListByCategory`,

  //hotCollection
  hotCollections: `${user}/hotCollections`,

  //activity
  hotBid: `${bid}/hotBid`,
  createBid: `${bid}/createBid`,
  listBid: `${bid}/listBid`,

  //order

  allListOrder: `${order}/allListOrder`,
  viewOrder: `${order}/viewOrder/`,
  buyOrder: `${order}/buyOrder`,
  downloadPrivateurl: `${order}/downloadPrivateurl`,

  sendOrderToUser: `${order}/sendOrderToUser`,
  cancelOrder: `${order}/cancelOrder`,
  deleteOrder: `${order}/deleteOrder`,
  // staticlist
  faqList: `${staticlist}/faqList`,
  addFAQ: `${staticlist}/addFAQ`,
  viewFAQ: `${staticlist}/viewFAQ/`,
  deleteFAQ: `${staticlist}/deleteFAQ`,
  editFAQ: `${staticlist}/editFAQ/`,
  staticContentList: `${staticlist}/staticContentList`,
  addStaticContent: `${staticlist}/addStaticContent`,
  addPressMediaContent: `${staticlist}/addPressMediaContent`,
  pressMediaList: `${staticlist}/pressMediaList`,
  deletePressMedia: `${staticlist}/deletePressMedia`,
  viewPressMedia: `${staticlist}/viewPressMedia/`,
  editPressMedia: `${staticlist}/editPressMedia`,
};

export default Apiconfigs;
