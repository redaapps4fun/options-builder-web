import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { ScrollBar } from '../ui/scroll-area'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'

interface Card {
    id: number;
    title: string;
    imageUrl: string;
}

function ScrollWithPrebuiltStratagies({ cards }: { cards: Card[] }) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-4 pb-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="min-w-[90px] h-[90px] hover:bg-accent cursor-pointer transition-colors"
            >
              <CardContent className="p-3">
                <div className="flex flex-col items-center justify-center h-full space-y-1">
                  <div className="relative w-[40px] h-[40px]">
                    <Image src={card.imageUrl} alt={card.title} fill className="object-contain" />
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center">{card.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
  )
}

export default ScrollWithPrebuiltStratagies