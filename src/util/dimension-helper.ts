/**
 * A function to return details about screen dimension.
 */
import { useMediaQuery } from "react-responsive";

interface IDimension {
  isTabletOrMobile: boolean;
  isTabletOrDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWideDesktop: boolean;
}

const DimensionHelper = (): IDimension => {
  const smallBoundary = useMediaQuery({
    query: `(max-width: 576px)`,
  });

  const mediumBoundary = useMediaQuery({
    query: `(max-width: 1024px)`,
  });

  const wideBoundary = useMediaQuery({
    query: `(max-width: 1200px)`,
  });

  const DimensionProps = {
    isTabletOrMobile: mediumBoundary,
    isTabletOrDesktop: !smallBoundary,
    isMobile: smallBoundary,
    isTablet: !smallBoundary && mediumBoundary,
    isDesktop: !mediumBoundary && wideBoundary,
    isWideDesktop: !wideBoundary,
  };

  return DimensionProps;
};

export default DimensionHelper;
