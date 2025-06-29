"use client";

import { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { suggestProducts, type SuggestProductsOutput } from '@/ai/flows/product-suggestions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductSuggestionsProps {
  productDescription: string;
  productCategory: string;
}

export function ProductSuggestions({ productDescription, productCategory }: ProductSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<SuggestProductsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await suggestProducts({ productDescription, productCategory });
      setSuggestions(result);
    } catch (e) {
      setError('Sorry, we couldn\'t generate suggestions at this time.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Wand2 className="w-6 h-6 text-primary"/>
            <CardTitle className="font-headline">AI Product Suggestions</CardTitle>
        </div>
        <CardDescription>Looking for something else? Let our AI assistant suggest some alternatives for you.</CardDescription>
      </CardHeader>
      <CardContent>
        {!suggestions && (
            <Button onClick={handleGetSuggestions} disabled={isLoading}>
            {isLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
                </>
            ) : (
                <>
                Get AI Suggestions
                </>
            )}
            </Button>
        )}

        {error && <p className="mt-4 text-destructive">{error}</p>}

        {suggestions && suggestions.suggestions.length > 0 && (
          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-3">Here are some ideas:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {suggestions.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
             <Button onClick={handleGetSuggestions} disabled={isLoading} variant="link" className="mt-4 px-0">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Regenerate'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
