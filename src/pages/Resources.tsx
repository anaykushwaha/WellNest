import { PageHeader } from '@/components/common/PageHeader';
import { EmergencyNotice } from '@/components/resources/EmergencyNotice';
import { WellnessTipsList } from '@/components/resources/WellnessTipsList';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { supportResources } from '@/data/supportResources';

export default function Resources() {
  return (
    <div>
      <PageHeader
        title="Support Resources"
        description="Wellness tips and support resources for your student journey."
      />

      <div className="space-y-8">
        <EmergencyNotice />

        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Wellness Tips</h2>
          <WellnessTipsList />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Support Resources</h2>
          <div className="space-y-3">
            {supportResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-gray-400">
          WellNest is a general wellness and self-reflection tool. It does not provide
          medical diagnosis, treatment, or emergency support. Always consult qualified
          professionals for medical or mental health concerns.
        </p>
      </div>
    </div>
  );
}
