export default {
  categories: [
    {
      name: "Customers",
      isRequireSummary: true,
      isRequireContent: true,
      isRequireLinkSummary: false,
      isRequireLinksContent: false,
      isPreventLinksSummary: false,
      isPreventLinksContent: false,
    },
    {
      name: "Competitors",
      isRequireSummary: false,
      isRequireContent: false,
      isRequireLinkSummary: false,
      isRequireLinksContent: true,
      isPreventLinksSummary: true,
      isPreventLinksContent: false,
    },
    {
      name: "Products",
      isRequireSummary: false,
      isRequireContent: true,
      isRequireLinkSummary: false,
      isRequireLinksContent: false,
      isPreventLinksSummary: false,
      isPreventLinksContent: false,
    },
  ],
};
