
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EditSections } from '@/components/admin/EditSections';
import { Shield } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => { 
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <EditSections />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20 backdrop-blur-sm">
      <div className="w-full max-w-sm">
        <div className="bg-card/80 backdrop-blur-lg border border-border/20 rounded-xl shadow-2xl shadow-black/10 overflow-hidden">
            <div className="h-9 bg-muted/50 flex items-center px-4 border-b border-border/20">
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
              </div>
              <div className="flex-1 text-center text-sm font-medium text-muted-foreground">
                  Admin Access
              </div>
            </div>
            <div className="p-8 pt-6 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold font-headline">Authentication Required</h1>
                    <p className="text-muted-foreground text-sm mt-1">Please enter the admin password to continue.</p>
                </div>
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="h-10 text-center"
                />
                {error && <p className="text-sm text-destructive text-center pt-1">{error}</p>}
                <Button onClick={handleLogin} className="w-full font-semibold">
                  Log In
                </Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
