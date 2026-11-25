import { Closing } from '@/components/home/Closing';
import { Hero } from '@/components/home/Hero';
import { Projects } from '@/components/home/Projects';
import { Footer } from '@/components/site/Footer';
import { Story } from '@/components/story/Story';

export default function Page() {
  return (
    <>
      <Hero />
      <main className="page">
        <Projects />
        <Story />
        <Closing />
        <Footer />
      </main>
    </>
  );
}
