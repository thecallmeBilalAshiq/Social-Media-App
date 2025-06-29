"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { type Product } from '@/lib/types';
import { ProductSuggestions } from '@/components/ProductSuggestions';
import { Minus, Plus } from 'lucide-react';

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container py-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square rounded-lg overflow-hidden border bg-card shadow-sm">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="object-cover w-full h-full"
            data-ai-hint={product.category.toLowerCase()}
          />
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-primary">{product.category}</p>
            <h1 className="text-4xl font-bold tracking-tight font-headline">{product.name}</h1>
          </div>
          <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>
          <div className="text-muted-foreground leading-relaxed">
            <p>{product.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus/></Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-16 text-center"
                aria-label="Quantity"
              />
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus/></Button>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <ProductSuggestions
          productDescription={product.description}
          productCategory={product.category}
        />
      </div>
    </div>
  );
}
