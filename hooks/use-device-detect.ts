import { useMediaQuery } from "react-responsive";

export const useDeviceDetect = () => {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 743px)" });
  return { isMobileScreen };
};
