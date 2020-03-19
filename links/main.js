// prettier-ignore
var links = {
  "/links?home": "https://maskbook.com",
  "/links?mailchimp-signup-maskbook": "http://eepurl.com/gmNnlb",
  "/links?github-forum": "MASKBOOK-Talks",
  "/links?report-bug": "MASKBOOK/issues/new?template=bug.md&assignees=jack-works&projects=DimensionDev/Maskbook/3&title=%5BBug%5D%20&labels=Type%3A%20Bug",
  "/links?ios-app-store": "https://apps.apple.com/app/id1478382964",
  "/links?google-play": "https://play.google.com/store/apps/details?id=com.dimension.maskbook",
  "/links?chrome": "https://chrome.google.com/webstore/detail/jkoeaghipilijlahjplgbfiocjhldnap",
  "/links?firefox": "https://addons.mozilla.org/firefox/addon/maskbook",
  "/brand-guide": "https://dimensiondev.github.io/Maskbook-VI",
  "/faq?1": "MASKBOOK/wiki/FAQ#why-is-there-a-strange-link-in-my-tweet",
  "/faq?2": "MASKBOOK/wiki/FAQ#why-does-maskbook-recommend-users-to-publish-their-public-keys-in-their-bio",
  "/faqcc?1": "MASKBOOK/wiki/FAQ:-Cryptocurrency-Features#why-is-the-total-collected-amount-slightly-less-than-the-total-spent-amount",
  "/download-latest": "MASKBOOK/releases/latest/download/Maskbook.base.zip",
};

if (/^\/install/g.test(location.pathname)) {
  var agent = navigator.userAgent;
  if (/Chrome/i.test(agent)) {
    location.replace(links["/links?chrome"]);
  } else if (/Firefox/i.test(agent)) {
    location.replace(links["/links?firefox"]);
  } else {
    location.replace("/download-links");
  }
} else {
  var path = location.pathname.replace(/\/$/g, "");
  var link = links[path + location.search];
  if (link !== undefined) {
    link = link.replace(
      /^MASKBOOK/,
      "https://github.com/DimensionDev/Maskbook"
    );
    location.replace(link);
  } else {
    document.body.className = "link-not-found";
  }
}
