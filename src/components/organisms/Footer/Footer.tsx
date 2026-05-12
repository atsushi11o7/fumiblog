import { Copyright } from '@/components/molecules/Copyright';
import { SocialLinks, type SocialLink } from '@/components/molecules/SocialLinks';

export interface FooterProps {
  siteName?: string;
  year?: number;
  socialLinks?: SocialLink[];
  className?: string;
}

export function Footer({
  siteName = 'fumiblog',
  year,
  socialLinks,
  className = '',
}: FooterProps) {
  const buildSha = process.env.NEXT_PUBLIC_GIT_SHA ?? 'dev';

  return (
    <footer className={`border-t border-border px-6 py-8 ${className}`.trim()}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Copyright siteName={siteName} year={year} />
          <span className="mono text-[11px] text-syntax-comment">
            <span className="text-cat-accent" aria-hidden="true">▶</span>
            {` build ${buildSha}`}
          </span>
        </div>
        <SocialLinks links={socialLinks} />
      </div>
    </footer>
  );
}
