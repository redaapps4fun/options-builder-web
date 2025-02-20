import { MySession } from '@/lib/getsession';
import { redirect } from 'next/navigation';
import React from 'react';
import ScrollWithPrebuiltStratagies from '@/components/builder/scrollwithprebuiltstratagies';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabsWithPrebuiltStratagies from '@/components/builder/tabswithprebuiltstratagies';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Sample data - you can replace with your own
const cards = [
  { id: 1, title: 'Buy Call', imageUrl: '/images/stratagies/capture.png' },
  { id: 2, title: 'Buy Put', imageUrl: '/images/stratagies/capture.PNG' },
  { id: 3, title: 'Sell Call', imageUrl: '/images/stratagies/capture.PNG' },
  { id: 4, title: 'Sell Put', imageUrl: '/images/stratagies/capture.PNG' },
  { id: 5, title: 'Bull Call Spread', imageUrl: '/images/stratagies/capture.PNG' },
  { id: 6, title: 'Bear Put Spread', imageUrl: '/images/stratagies/capture.PNG' },
  { id: 7, title: 'Butterfly', imageUrl: '/images/stratagies/capture.PNG' },
  { id: 8, title: 'Iron Condor', imageUrl: '/images/stratagies/capture.PNG' },
  { id: 9, title: 'Straddle', imageUrl: '/images/stratagies/capture.PNG' },
  { id: 10, title: 'Strangle', imageUrl: '/images/stratagies/capture.PNG' },
];

async function BuilderPage() {
  const session = await MySession();
  const currentUser = session?.user;

  if (!currentUser) {
    redirect('/');
  }

  

  return (
    
      <div key="main" className="w-full h-full p-4">
        <TabsWithPrebuiltStratagies
          bullishCards={cards}
          bearishCards={cards}
          neutralCards={cards}
          otherCards={cards}
        />
      </div>
    
  );
  
}

export default BuilderPage;
