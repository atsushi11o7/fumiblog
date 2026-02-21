import Image from 'next/image';
import { Github, Twitter } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'twitter';
}

export interface ProfileCardProps {
  name: string;
  handle?: string;
  bio: string;
  avatarSrc: string;
  links?: SocialLink[];
  className?: string;
}

const icons = {
  github: Github,
  twitter: Twitter,
};

export function ProfileCard({
  name,
  handle,
  bio,
  avatarSrc,
  links = [],
  className = '',
}: ProfileCardProps) {
  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`.trim()}>
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={avatarSrc}
          alt={name}
          width={48}
          height={48}
          className="rounded-full object-cover"
          style={{ width: 48, height: 48 }}
        />
        <div>
          <p className="font-bold text-sm text-foreground leading-tight">{name}</p>
          {handle && (
            <p className="text-xs text-muted leading-tight">{handle}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-secondary mb-4">{bio}</p>

      {links.length > 0 && (
        <div className="flex gap-2">
          {links.map((link) => {
            const Icon = icons[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tt flex-1 flex items-center justify-center gap-1.5 border border-border rounded-lg py-2 text-xs font-medium text-foreground hover:bg-tag-bg no-underline"
              >
                <Icon size={14} />
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
