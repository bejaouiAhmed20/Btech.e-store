import { ExternalLink, GitBranch } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { PortfolioProject } from '@/types'

const CATEGORY_LABELS: Record<string, string> = {
  websites: 'Sites Web',
  'web-apps': 'Applications Web',
  branding: 'Branding',
  restaurant: 'Restaurants',
  'coffee-shop': 'Cafés',
  'graphic-design': 'Design Graphique',
  'cafe-resto': 'Cafés & Restos',
  wedding: 'Mariages',
}

interface PortfolioModalProps {
  project: PortfolioProject | null
  onClose: () => void
}

export function PortfolioModal({ project, onClose }: PortfolioModalProps) {
  return (
    <Modal isOpen={!!project} onClose={onClose} labelledBy="portfolio-modal-title">
      {project && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-3">
            {project.gallery.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} — aperçu ${index + 1}`}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            ))}
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent-600">
              {CATEGORY_LABELS[project.category] || project.category}
            </p>
            <h3 id="portfolio-modal-title" className="mt-1 font-display text-2xl font-bold text-ink-900">
              {project.name}
            </h3>
            <p className="mt-3 text-ink-500">{project.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-ink-900">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-ink-100 px-3 py-1 font-mono text-xs text-ink-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-ink-900">
                Résultats
              </h4>
              <p className="text-sm text-ink-500">{project.results}</p>
            </div>
            <div>
              <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-ink-900">
                Défis
              </h4>
              <p className="text-sm text-ink-500">{project.challenges}</p>
            </div>
            <div>
              <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-ink-900">
                Solutions
              </h4>
              <p className="text-sm text-ink-500">{project.solutions}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-ink-100 pt-6">
            {project.liveUrl && (
              <Button
                icon={<ExternalLink size={16} />}
                onClick={() => window.open(project.liveUrl, '_blank', 'noreferrer')}
              >
                Démo en ligne
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                icon={<GitBranch size={16} />}
                onClick={() => window.open(project.githubUrl, '_blank', 'noreferrer')}
              >
                GitHub
              </Button>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}
