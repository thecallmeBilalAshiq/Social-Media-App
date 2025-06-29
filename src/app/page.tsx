import { products } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  return (
    <div className="container py-8 animate-in fade-in-0 duration-1000">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold font-headline tracking-tight text-foreground">Welcome to Billu Ashiq Mart</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">The latest trends in tech, fashion, and more. Explore our curated selection of high-quality products.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, i) => (
          <div key={product.id} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'backwards' }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
