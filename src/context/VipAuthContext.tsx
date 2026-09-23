'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface VipUser {
  id: string;
  email: string;
  name?: string | null;
  isVip: boolean;
  vipTier?: string | null;
}

interface VipContextType {
  isVip: boolean;
  user: VipUser | null;
  loading: boolean;
  refreshVipStatus: () => Promise<void>;
}

const VipContext = createContext<VipContextType>({
  isVip: false,
  user: null,
  loading: true,
  refreshVipStatus: async () => {},
});

export const useVip = () => useContext(VipContext);

export function VipAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<VipUser | null>(null);
  const [isVip, setIsVip] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkVipStatus = async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
          setIsVip(Boolean(data.user.isVip));
          return;
        }
      }
      setUser(null);
      setIsVip(false);
    } catch {
      setUser(null);
      setIsVip(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkVipStatus();
  }, []);

  return (
    <VipContext.Provider value={{ isVip, user, loading, refreshVipStatus: checkVipStatus }}>
      {children}
    </VipContext.Provider>
  );
}
