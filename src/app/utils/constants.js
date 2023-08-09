const tokenKey = "netflixjwttoken";
const movieApiKey = "4f5ca790025ea4baf6f9d72988810577";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6.5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 560, min: 0 },
    items: 4,
  },
  smallMobile: {
    breakpoint: { max: 500, min: 0 },
    items: 3,
  },
};
export { tokenKey, responsive, movieApiKey };
