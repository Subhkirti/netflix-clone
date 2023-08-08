import language from "../languages/langIndex";
import { getLanguage } from "../services/authService";

const globalLanguage = getLanguage();
const languageText = language[globalLanguage || "en"];

function homeCarouselData(isMobile, isTablet) {
  return [
    {
      title: languageText?.ENJOY_ON_YOUR_TV,
      subTitle: languageText?.WATCH_ON_SMART_TV,
      source:
        "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png",
      width: isMobile ? 300 : isTablet ? 400 : 500,
      height: isMobile ? 280 : isTablet ? 300 : 400,
      videoSource: "http://surl.li/ijfas",
      videoStyle: {
        position: "absolute",
        width: "370px",
        zIndex: "-1",
        marginBottom: "20px",
        right: "20%",
      },
    },
    {
      title: languageText.DOWNLOAD_YOUR_SHOWS,
      subTitle: languageText.SAVE_YOUR_FAVOURITES,
      source:
        "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg",
      width: isMobile ? 400 : isTablet ? 500 : 800,
      height: isMobile ? 280 : isTablet ? 300 : 400,
      videoSource: null,
      videoStyle: {},
    },
    {
      title: languageText.WATCH_EVERYWHERE_TEXT,
      subTitle: languageText.STREAM_UNLIMITED_MOVIES,
      source:
        "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png",
      width: isMobile ? 300 : isTablet ? 400 : 500,
      height: isMobile ? 280 : isTablet ? 300 : 400,
      videoSource:
        "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-in.m4v",
      videoStyle: {
        position: "absolute",
        width: "300px",
        zIndex: "-1",
        marginBottom: "145px",
        right: "22.5%",
      },
    },
    {
      title: languageText.CREATE_PROFILES_FOR_KIDS,
      subTitle: languageText.SEND_CHILDREN_ON_ADVENTURES,
      source:
        globalLanguage === "hi"
          ? "https://occ-0-2991-2164.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVgKoWCAejBWO2Dxg4NyMHlC3OdKWTTdvZshvYQizpH-VvlWFbMUjVkidAc2fX5rPOS1Cu2hSJOa8cOcngrDRR5ZmZkdEu7cg0Ay.png?r=d52"
          : "https://occ-0-2991-2164.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDpXDv0VI9HUoH7r2aGp4TKRCsKNQrMwxzTtr-NlwOHeS8bCI2oeZddmu3nMYr3j9MjYhHyjBASb1FaOGYZNYvPBCL.png?r=54d",
      width: isMobile ? 300 : isTablet ? 400 : 500,
      height: isMobile ? 280 : isTablet ? 300 : 400,
      videoSource: null,
      videoStyle: {},
    },
  ];
}

const faqsData = [
  {
    question: languageText.WHAT_IS_NETFLIX,
    answer: languageText.NETFLIX_IS_A_STREAMING_SERVICE,
  },
  {
    question: languageText.NETFLIX_COST,
    answer: languageText.WATCH_NETFLIX_ON_YOUR_SMARTPHONE,
  },
  {
    question: languageText.WHERE_CAN_I_WATCH,
    answer: languageText.YOU_CAN_ALSO_DOWNLOAD,
  },
  {
    question: languageText.HOW_DO_I_CANCEL,
    answer: languageText.NETFLIX_IS_FLEXIBLE,
  },
  {
    question: languageText.WHAT_CAN_I_WATCH,
    answer: languageText.NETFLIX_HAS_AN_EXTENSIVE,
  },
  {
    question: languageText.IS_NETFLIX_GOOD_FOR_KIDS,
    answer: languageText.THE_NETFLIX_KIDS,
  },
];
const footerData = [
  {
    text: "FAQ",
    url: "https://help.netflix.com/en/node/412",
  },
  {
    text: languageText.HELP_CENTRE,
    url: "https://help.netflix.com/en/",
  },
  {
    text: languageText.ACCOUNT,
    url: "/login",
  },
  {
    text: languageText.MEDIA_CENTRE,
    url: "https://media.netflix.com/en/",
  },
  {
    text: languageText.INVESTOR_RELATIONS,
    url: "https://ir.netflix.net/ir-overview/profile/default.aspx",
  },
  {
    text: languageText.JOBS,
    url: "https://jobs.netflix.com/",
  },
  {
    text: languageText.WAYS_TO_WATCH,
    url: "https://devices.netflix.com/en/",
  },
  {
    text: languageText.TERMS_OF_USE,
    url: "https://help.netflix.com/legal/termsofuse",
  },
  {
    text: languageText.PRIVACY,
    url: "https://help.netflix.com/legal/privacy",
  },
  {
    text: languageText.COOKIE_PREFERENCES,
    url: "/",
  },
  {
    text: languageText.CORPORATE_INFORMATION,
    url: "https://help.netflix.com/legal/corpinfo",
  },

  {
    text: languageText.CONTACT_US,
    url: "https://help.netflix.com/en/contactus",
  },
  {
    text: languageText.SPEED_TEST,
    url: "https://fast.com/",
  },
  {
    text: languageText.LEGAL_NOTICES,
    url: "https://help.netflix.com/legal/notices",
  },

  {
    text: languageText.ONLY_ON_NETFLIX,
    url: "browse/genre/839338",
  },
];
export { homeCarouselData, faqsData, footerData };
