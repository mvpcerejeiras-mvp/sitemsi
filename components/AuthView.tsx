import React, { useState } from 'react';

interface AuthViewProps {
  onLogin: () => void;
}

type AuthMode = 'login' | 'forgot-password';

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Credenciais solicitadas
    if (email === 'msig12@gmail.com' && password === 'vida1293') {
      onLogin();
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    // Simulação de envio
    setMessage('Recuperação de senha enviada no email cadastrado.');
    setTimeout(() => {
      setMode('login');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-background-dark p-4">
      <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-border-dark overflow-hidden p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-4xl">hub</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sites MSI</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {mode === 'login' ? 'Entre para gerenciar seus portais' : 'Recupere seu acesso'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-error/10 border border-error/20 text-error text-sm rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-3 bg-success/10 border border-success/20 text-success text-sm rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            {message}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">E-mail</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </span>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all"
                  placeholder="msig12@gmail.com"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Senha</label>
                <button 
                  type="button"
                  onClick={() => setMode('forgot-password')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </span>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98]"
            >
              Entrar no Sistema
            </button>
          </form>
        ) : (
          <form onSubmit={handleRecover} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">E-mail cadastrado</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </span>
                <input 
                  required
                  type="email" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all"
                  placeholder="msig12@gmail.com"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all"
            >
              Enviar Recuperação
            </button>
            <button 
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Voltar para o Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthView;