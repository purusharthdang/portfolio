import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCarouselProps {
  title: string;
  description: string;
  demoUrl: string;
  loomUrl?: string;
}

export function ProjectCarousel({ title, description, demoUrl, loomUrl }: ProjectCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Card className="relative overflow-hidden group">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <a href={demoUrl} target='_blank'><span>{title}</span></a>
          <div className="space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveSlide(0)}
              className={activeSlide === 0 ? 'bg-secondary' : ''}
            >
              1
            </Button>
            {loomUrl ? <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveSlide(1)}
              className={activeSlide === 1 ? 'bg-secondary' : ''}
            >
              2
            </Button> : null}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            <div className="w-full flex-shrink-0">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <iframe
                  src={demoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
            </div>
            {loomUrl ? <div className="w-full flex-shrink-0">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <iframe
                  src={loomUrl}
                  frameBorder="0"
                  className="w-full h-full"
                  allowFullScreen
                />
              </AspectRatio>
            </div> : null}
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{description}</p>
      </CardContent>

      <div className="absolute top-1/2 -translate-y-1/2 w-full justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 bg-background/80 backdrop-blur-sm"
          onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 bg-background/80 backdrop-blur-sm"
          onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}