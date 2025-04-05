import { Authors, allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import AuthorLayout from '@/layouts/AuthorLayout';
import { coreContent } from 'pliny/utils/contentlayer';
import { genPageMetadata } from 'app/seo';
import NumberTicker from '@/components/components/ui/number-ticker';
import { badgeVariants } from '@/components/components/ui/badge';
import DownloadButton from '@/components/buttonDownload';
import siteMetadata from '@/data/siteMetadata';

export const metadata = genPageMetadata({ title: 'About' });

const AchievementItem = ({ label, value }: { label: string; value: number }) => (
  <h2 className="font-semibold text-3xl md:text-2xl my-8">
    <NumberTicker value={value} />+ {label}
  </h2>
);

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'prodevopsguy') as Authors;
  const mainContent = coreContent(author);

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
        <h3 className="font-bold text-xl">Skills</h3>
        <div className="flex gap-2 mt-4">
          <span className={badgeVariants({ variant: 'outline' })}>DevOps</span>
          <span className={badgeVariants({ variant: 'outline' })}>Automation</span>
          <span className={badgeVariants({ variant: 'outline' })}>CI/CD</span>
        </div>
       <div className="flex items-start content-around gap-2 flex-wrap mt-2">
          <span className={badgeVariants({ variant: 'outline' })}>Cloud</span>
          <span className={badgeVariants({ variant: 'outline' })}>IAC</span>
          <span className={badgeVariants({ variant: 'outline' })}>Blogger</span>
          <span className={badgeVariants({ variant: 'outline' })}>Content Creater</span>
        </div>
        <div className="gap-2">
          <DownloadButton
            label="Join our Community"
            url={siteMetadata.CVUrl}
          />
        </div>
      </AuthorLayout>
    </>
  );
}