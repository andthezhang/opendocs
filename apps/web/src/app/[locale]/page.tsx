import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { FeaturedCard } from '@/components/featured-card'
import { Announcement } from '@/components/announcement'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

import {
  PageHeader,
  PageActions,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'

export const dynamicParams = true

export default async function IndexPage({
  params,
}: {
  params: { locale: LocaleOptions }
}) {
  unstable_setRequestLocale(params.locale)

  const t = await getTranslations()

  return (
    <div className="container relative">
      <PageHeader>
        <Announcement title={t('site.announcement')} href="/docs" />
        <PageHeaderDescription>{t('site.description')}</PageHeaderDescription>

        <PageActions>
          <Link href="/docs" className={cn(buttonVariants())}>
            {t('site.buttons.get_started')}
          </Link>

          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github.url}
            title={siteConfig.links.github.label}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Icons.gitHub className="mr-2 size-4" />
            {siteConfig.links.github.label}
          </Link>
        </PageActions>
      </PageHeader>

      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
          <FeaturedCard
            icon="🧬"
            title="Next.js"
            description={t('site.featured_cards.nextjs.description')}
          />

          <FeaturedCard
            icon="⚡️"
            title="Shadcn"
            description={t('site.featured_cards.shadcn.description')}
          />

          <FeaturedCard
            icon="🚀"
            title="Tailwind"
            description={t('site.featured_cards.tailwind.description')}
          />

          <FeaturedCard
            icon="🌍"
            title="i18n"
            description={t('site.featured_cards.i18n.description')}
          />
        </div>

        <FeaturedCard
          icon="+"
          orientation="horizontal"
          title={t('site.featured_cards.more.title')}
          description={t('site.featured_cards.more.description')}
        />
      </section>
    </div>
  )
}
