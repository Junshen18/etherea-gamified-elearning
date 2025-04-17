'use client';
import QuizGame from '@/components/quiz-game';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const router = useRouter();
  return <QuizGame 
    track="Ethereum Basics" 
    onClose={() => router.push('/authenticated-pages/home')}
  />;
} 