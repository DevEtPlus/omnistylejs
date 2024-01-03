import { useEffect, useState } from "react";

export function useMounted(enabled = false): boolean {
  const [mounted, setMounted] = useState(enabled);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mounted;
}
