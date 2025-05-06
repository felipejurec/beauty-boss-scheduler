
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup(name, email, whatsapp, password);
      navigate('/onboarding');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Logo className="mx-auto" />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Crie sua conta</CardTitle>
            <CardDescription className="text-center">
              Comece seu teste gratuito de 7 dias agora mesmo
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  placeholder="+5511999999999"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Cadastrando...' : 'Criar conta e começar trial'}
              </Button>
              <div className="text-center text-sm">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-brand-600 hover:underline font-medium">
                  Faça login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Ao criar uma conta, você concorda com nossos{' '}
            <Link to="/terms" className="text-brand-600 hover:underline">
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link to="/privacy" className="text-brand-600 hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} BeautyBoss. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
