"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <div className="container py-12 animate-in fade-in-0 duration-1000">
      <div className="flex items-center gap-4 mb-8">
        <ShoppingCart className="w-8 h-8"/>
        <h1 className="text-4xl font-bold font-headline">Your Cart</h1>
      </div>
      
      {cartItems.length === 0 ? (
        <Card className="text-center py-20 animate-in fade-in-0 zoom-in-95 duration-500">
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-2xl font-medium text-muted-foreground">Your cart is empty.</p>
              <Button asChild size="lg" className="mt-4">
                <Link href="/">Start Shopping</Link>
              </Button>
            </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={2} className="pl-6">Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right pr-6">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(({ product, quantity }) => (
                    <TableRow key={product.id} className="animate-in fade-in-0">
                      <TableCell className="p-4 w-24">
                         <div className="w-16 h-16 bg-card rounded-md overflow-hidden aspect-square">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                            data-ai-hint={product.category.toLowerCase()}
                          />
                         </div>
                      </TableCell>
                       <TableCell className="font-medium p-4">
                        <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
                          {product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                      </TableCell>
                      <TableCell className="p-4">
                        <div className="flex justify-center items-center">
                          <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10) || 1)}
                            className="w-16 text-center"
                            min="1"
                            aria-label={`Quantity for ${product.name}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium p-4 pr-6">
                        ${(product.price * quantity).toFixed(2)}
                      </TableCell>
                       <TableCell className="p-4 w-12">
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)}>
                          <X className="h-5 w-5" />
                          <span className="sr-only">Remove {product.name} from cart</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CardFooter className="bg-muted/50 p-4 flex justify-end">
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                 <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <Separator/>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
