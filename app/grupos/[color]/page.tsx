import { GROUPS } from '@/lib/data';
import GroupPageClient from './GroupPageClient';

export function generateStaticParams() {
  return GROUPS.map((group) => ({
    color: group.id,
  }));
}

export default function GroupPage() {
  return <GroupPageClient />;
}
