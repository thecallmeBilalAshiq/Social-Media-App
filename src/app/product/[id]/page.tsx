import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from './ProductDetailClient';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: 'Product not found',
    }
  }

  return {
    title: `${product.name} | Billu Ashiq Mart`,
    description: product.description,
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
