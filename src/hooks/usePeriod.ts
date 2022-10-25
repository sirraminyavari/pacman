/**
 * every time the parameter 'value' changes, the return value of the hook will remain true
 * for a period equal to the 'duration' parameter, only if 'value' if true or is a positive number
 */

import { useState, useEffect, useRef } from "react";
import _ from "lodash";

const usePeriod = (value: any, { duration = 500 }: { duration?: number }) => {
  const check = (value: any) => {
    return value === true || (_.isNumber(value) && value > 0);
  };

  const [inPeriod, setInPeriod] = useState(check(value));

  let to = useRef<number>();

  useEffect(() => {
    if (to.current) clearTimeout(to.current);

    setInPeriod(check(value));

    to.current = setTimeout(
      () => setInPeriod(false),
      duration,
    ) as unknown as number;

    //cleanup
    return () => clearTimeout(to.current);
  }, [value, duration]);

  return inPeriod;
};

export default usePeriod;
