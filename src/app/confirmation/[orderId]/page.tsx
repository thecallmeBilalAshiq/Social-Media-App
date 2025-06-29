import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface ConfirmationPageProps {
  params: {
    orderId: string;
  };
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  return (
    <div className="container flex items-center justify-center py-24">
      <Card className="w-full max-w-md text-center animate-in fade-in-0 zoom-in-95 duration-1000">
        <CardHeader>
          <div className="mx-auto bg-green-100 dark:bg-green-900/20 rounded-full p-3 w-fit">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="mt-4 text-2xl font-headline">Order Confirmed!</CardTitle>
          <CardDescription>Thank you for your purchase.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your order is being processed and you will receive an email confirmation shortly.
          </p>
          <div className="p-3 bg-muted rounded-md border">
            <p className="text-sm text-muted-foreground">Your Order ID is:</p>
            <p className="font-mono font-semibold text-lg tracking-wider">{params.orderId}</p>
          </div>
          <Button asChild className="w-full" size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
