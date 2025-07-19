import { MainNav } from '@/components/main-nav';
import WizardClientPage from './wizard-client-page';

export default function WizardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <WizardClientPage />
      </main>
    </div>
  );
}
