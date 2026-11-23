import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { priorityPlanningLinks } from '@/config/priorityPlanningLinks';

export function PriorityPlanningLinks() {
  const { t, i18n } = useTranslation();
  const { localizedPath } = useLocalizedPath();
  return (
    <section className="section-padding border-t border-border bg-background" aria-labelledby="planning-guides-heading">
      <div className="container-wide">
        <h2 id="planning-guides-heading" className="mb-6 text-2xl font-heading font-bold">{t('geo.heading')}</h2>
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {priorityPlanningLinks(i18n.language.split('-')[0]).map(link => (
            <li key={link.path}><Link className="text-primary underline underline-offset-4" to={localizedPath(link.path)}>{link.label}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}