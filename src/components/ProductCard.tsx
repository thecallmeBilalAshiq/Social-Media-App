"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl group">
      <CardHeader className="p-0 border-b">
        <Link href={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.category.toLowerCase()}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-medium">
             <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
                {product.name}
             </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-muted/50">
        <p className="text-xl font-bold">
          ${product.price.toFixed(2)}
        </p>
        <Button onClick={() => addToCart(product)} size="sm" aria-label={`Add ${product.name} to cart`}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
