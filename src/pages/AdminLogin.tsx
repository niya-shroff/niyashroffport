import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

interface LoginFormInputs {
    username: string;
    password: string;
}

const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormInputs) => {
        setIsLoading(true);
        setLoginError(null);

        const { error } = await signIn(data.username, data.password);

        if (error) {
            console.error('Login error:', error);
            setLoginError(error);
        } else {
            navigate('/photography');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-primary/20 to-transparent transform -skew-x-12" />
                <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-secondary/20 to-transparent transform -skew-x-12" />
            </div>

            <div className="w-full max-w-md p-8 bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg group">
                        <Lock className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Admin Access
                    </h2>
                    <p className="text-gray-400 mt-2">Enter credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Username or Email
                        </label>
                        <input
                            {...register('username', { required: 'Username is required' })}
                            type="text"
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                            placeholder="Enter username"
                        />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            {...register('password', { required: 'Password is required' })}
                            type="password"
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {loginError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-sm text-red-500 text-center">{loginError}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Authenticating...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
