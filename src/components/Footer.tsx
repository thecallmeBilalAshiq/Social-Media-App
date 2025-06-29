import Link from 'next/link';
import { Store, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground animate-in fade-in-0 duration-1000">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Store className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl font-headline text-foreground">Billu Ashiq Mart</span>
            </Link>
            <p className="text-sm">
              Your one-stop shop for the latest trends in tech, fashion, and more.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Apparel</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">About</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Stay Connected</h4>
            <p>Subscribe to our newsletter for the latest updates and deals.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-background" />
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Billu Ashiq Mart. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary transition-colors" /></Link>
            <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-primary transition-colors" /></Link>
            <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-primary transition-colors" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
