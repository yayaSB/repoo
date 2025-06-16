import LandingViewPage from '@/features/landing/components/landing-view-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Landing Page',
  description: 'Home Landing Page'
};

export default function HomePage() {
  return <LandingViewPage/>
}
