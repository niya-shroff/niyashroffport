import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    user: any | null;
    loading: boolean;
    signIn: (username: string, pass: string) => Promise<{ error: string | null }>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signIn: async () => ({ error: null }),
    signOut: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('custom_auth_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signIn = async (username: string, pass: string) => {
        try {
            // Query the profiles table in our custom schema
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('username', username)
                .eq('password', pass) // Direct comparison as requested
                .single();

            if (error || !data) {
                return { error: 'Invalid username or password' };
            }

            // Login successful
            const userObj = { username: data.username, full_name: data.full_name };
            setUser(userObj);
            localStorage.setItem('custom_auth_user', JSON.stringify(userObj));
            return { error: null };
        } catch (err: any) {
            return { error: err.message };
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('custom_auth_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
