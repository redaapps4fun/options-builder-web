import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ScrollWithPrebuiltStratagies from './scrollwithprebuiltstratagies';

// Updated props interface to accept different card sets
interface TabsWithPrebuiltStratagiesProps {
  bullishCards: any[];
  bearishCards: any[];
  neutralCards: any[];
  otherCards: any[];
}

function TabsWithPrebuiltStratagies({
  bullishCards,
  bearishCards,
  neutralCards,
  otherCards,
}: TabsWithPrebuiltStratagiesProps) {
  return (
    <Tabs defaultValue="bullish" className="w-full">
      <TabsList>
        <TabsTrigger value="bullish">Bullish</TabsTrigger>
        <TabsTrigger value="bearish">Bearish</TabsTrigger>
        <TabsTrigger value="neutral">Neutral</TabsTrigger>
        <TabsTrigger value="others">Others</TabsTrigger>
      </TabsList>

      <TabsContent value="bullish">
        <ScrollWithPrebuiltStratagies cards={bullishCards} />
      </TabsContent>

      <TabsContent value="bearish">
        <ScrollWithPrebuiltStratagies cards={bearishCards} />
      </TabsContent>

      <TabsContent value="neutral">
        <ScrollWithPrebuiltStratagies cards={neutralCards} />
      </TabsContent>

      <TabsContent value="others">
        <ScrollWithPrebuiltStratagies cards={otherCards} />
      </TabsContent>
    </Tabs>
  );
}

export default TabsWithPrebuiltStratagies;
