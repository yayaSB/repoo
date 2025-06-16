import { Metadata } from 'next';
import ChooseUserView from '@/features/choose-user/components/choose-user-view';

export const metadata: Metadata = {
  title: 'Choose User',
  description: 'Choose User page for authentication.'
};

export default async function ChooseUserPage() {
  return <ChooseUserView />;
}
