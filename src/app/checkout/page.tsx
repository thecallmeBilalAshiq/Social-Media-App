"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(5, 'Address is too short'),
  city: z.string().min(2, 'City is too short'),
  zip: z.string().regex(/^\d{5}$/, 'Enter a valid 5-digit ZIP code'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart, cartTotal, cartItems } = useCart();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: '', email: '', address: '', city: '', zip: '' },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Order submitted:', data);
    const orderId = `BAM-${Date.now()}`;
    clearCart();
    router.push(`/confirmation/${orderId}`);
  };

  if (cartItems.length === 0 && typeof window !== 'undefined') {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty.</h1>
        <p className="text-muted-foreground mt-2">Add some products before checking out.</p>
        <Button asChild className="mt-6">
          <Link href="/">Go to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-in fade-in-0 duration-1000">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Shipping & Payment</CardTitle>
            <CardDescription>Enter your details to complete the purchase.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <fieldset className="space-y-4">
                  <legend className="text-lg font-medium mb-2">Shipping Information</legend>
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="zip" render={({ field }) => (
                      <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                  </div>
                </fieldset>
                
                <Separator />

                <fieldset className="space-y-4">
                  <legend className="text-lg font-medium">Payment Info (Dummy)</legend>
                   <div className="space-y-2">
                    <FormLabel>Card Number</FormLabel>
                    <Input placeholder="**** **** **** 1234" disabled />
                   </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <FormLabel>Expiration</FormLabel>
                       <Input placeholder="MM/YY" disabled />
                     </div>
                    <div>
                      <FormLabel>CVC</FormLabel>
                      <Input placeholder="***" disabled />
                    </div>
                  </div>
                </fieldset>

                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Place Order - ${cartTotal.toFixed(2)}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="pt-8 md:pt-0">
          <Card>
            <CardHeader>
                <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-4">
                {cartItems.map(({product, quantity}) => (
                    <div key={product.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-md bg-card border overflow-hidden">
                        <Image src={product.image} alt={product.name} width={64} height={64} className="object-cover w-full h-full" data-ai-hint={product.category.toLowerCase()}/>
                        </div>
                        <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                        </div>
                    </div>
                    <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
                    </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
              </div>
               <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>$0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>${cartTotal.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
