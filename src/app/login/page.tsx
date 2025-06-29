
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login attempt with:', data);
    // Here you would typically handle authentication
    // For this prototype, we'll just redirect to the home page.
    router.push('/');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div 
            className="space-y-2 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-1000"
          >
            <h1 className="text-3xl font-bold font-headline">Welcome Back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account.</p>
          </div>
          <Card className="animate-in fade-in-0 zoom-in-95 duration-500 delay-300">
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <Button type="submit" className="w-full" size="lg">
                    Log In
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center p-6 pt-0">
               <p className="mt-2 text-center text-sm text-muted-foreground">
                 Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-medium text-primary hover:underline underline-offset-4">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="hidden bg-muted lg:block animate-in fade-in-0 duration-1000">
        <Image
          src="https://placehold.co/1000x1200.png"
          alt="Abstract decorative image"
          width="1000"
          height="1200"
          className="h-full w-full object-cover dark:brightness-[0.3]"
          data-ai-hint="shopping vibrant"
        />
      </div>
    </div>
  );
}
