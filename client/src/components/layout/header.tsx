"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
	CodeIcon,
	Smartphone,
	ShoppingCart,
	CloudIcon,
	Wrench,
	LightbulbIcon,
	Users,
	Briefcase,
	NewspaperIcon,
	MenuIcon,
	XIcon,
	GlobeIcon,
} from 'lucide-react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuLink,
	type NavItemType,
	NavGridCard,
	NavSmallItem,
	NavItemMobile,
} from '@/components/ui/navigation-menu';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { trackCTAClick, trackLanguageSwitch } from '@/lib/analytics';
import { ThemeToggle } from '@/components/theme-toggle';

const locales = [
	{ code: 'en', label: 'English', flag: '🇬🇧' },
	{ code: 'it', label: 'Italiano', flag: '🇮🇹' },
	{ code: 'es', label: 'Español', flag: '🇪🇸' },
	{ code: 'de', label: 'Deutsch', flag: '🇩🇪' },
] as const;

export function Header() {
	const t = useTranslations();
	const params = useParams();
	const pathname = usePathname();
	const currentLocale = params.locale as string;

	const serviceLinks: NavItemType[] = [
		{
			title: "Web Development",
			href: `/${currentLocale}/services/web-development`,
			description: "Custom websites and web applications built with modern technologies",
			icon: CodeIcon,
		},
		{
			title: "SEO Optimization",
			href: `/${currentLocale}/services/seo-optimization`,
			description: "Boost your search rankings and drive organic traffic to your website",
			icon: GlobeIcon,
		},
		{
			title: "UI/UX Design",
			href: `/${currentLocale}/services/ui-ux-design`,
			description: "User-centered design that converts visitors into customers",
			icon: LightbulbIcon,
		},
		{
			title: t('services.mobile.title'),
			href: `/${currentLocale}#services`,
			description: t('services.mobile.description'),
			icon: Smartphone,
		},
		{
			title: t('services.ecommerce.title'),
			href: `/${currentLocale}#services`,
			description: t('services.ecommerce.description'),
			icon: ShoppingCart,
		},
		{
			title: t('services.maintenance.title'),
			href: `/${currentLocale}#services`,
			icon: Wrench,
		},
	];

	const companyLinks: NavItemType[] = [
		{
			title: t('company.story.title'),
			href: `/${currentLocale}#about`,
			description: t('company.story.description'),
			icon: Users,
		},
		{
			title: t('company.team.title'),
			href: `/${currentLocale}#team`,
			description: t('company.team.description'),
			icon: Briefcase,
		},
		{
			title: t('company.careers.title'),
			href: `/${currentLocale}#careers`,
			description: t('company.careers.description'),
			icon: Briefcase,
		},
		{
			title: t('company.blog.title'),
			href: `/${currentLocale}/blog`,
			description: t('company.blog.description'),
			icon: NewspaperIcon,
		},
	];

	const switchLocale = (newLocale: string) => {
		trackLanguageSwitch(currentLocale, newLocale);
		const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
		window.location.href = newPath;
	};

      return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full py-4">
          <div className="mx-auto max-w-6xl px-4">
            <div className="bg-background/95 dark:bg-black/95 supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:dark:bg-black/80 flex h-14 items-center justify-between rounded-full border border-border dark:border-white/10 px-6 shadow-lg backdrop-blur-xl">
				{/* Logo */}
				<Link
					href={`/${currentLocale}`}
					className="flex items-center gap-3 transition-opacity hover:opacity-80"
				>
					<Image
						src="/images/logos/Logo.png"
						alt="Sitovia Logo"
						width={50}
						height={50}
						className="rounded-lg object-contain"
						priority
					/>
					<p className="font-mono text-xl font-bold text-primary">
						Sitovia
					</p>
				</Link>

				{/* Desktop Navigation */}
				<DesktopMenu
					serviceLinks={serviceLinks}
					companyLinks={companyLinks}
					currentLocale={currentLocale}
					t={t}
				/>

				{/* Right Side Actions */}
				<div className="flex items-center gap-2">
                {/* Theme Toggle - Temporarily Hidden */}
                {/* <ThemeToggle /> */}

					{/* Language Switcher */}
					<div className="relative hidden md:block">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger className="gap-1">
										<GlobeIcon className="size-4" />
										<span className="uppercase">{currentLocale}</span>
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="w-48 p-2">
											{locales.map((locale) => (
												<li key={locale.code}>
													<button
														onClick={() => switchLocale(locale.code)}
														className={cn(
															'hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors',
															currentLocale === locale.code &&
																'bg-accent/50 font-medium',
														)}
													>
														<span className="text-lg">{locale.flag}</span>
														<span>{locale.label}</span>
													</button>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* CTA Button */}
					<Button
						asChild
						className="hidden md:inline-flex"
						onClick={() => trackCTAClick(t('common.cta'), 'Header')}
					>
						<Link href={`/${currentLocale}/contact`}>{t('common.cta')}</Link>
					</Button>

					{/* Mobile Menu */}
					<MobileNav
						serviceLinks={serviceLinks}
						companyLinks={companyLinks}
						currentLocale={currentLocale}
						locales={locales}
						switchLocale={switchLocale}
						t={t}
					/>
				</div>
			</div>
			</div>
		</header>
	);
}

function DesktopMenu({
	serviceLinks,
	companyLinks,
	currentLocale,
	t,
}: {
	serviceLinks: NavItemType[];
	companyLinks: NavItemType[];
	currentLocale: string;
	t: ReturnType<typeof useTranslations>;
}) {
	return (
		<NavigationMenu className="hidden lg:block">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className="cursor-pointer">
						<Link href={`/${currentLocale}`}>{t('nav.home')}</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>{t('nav.services')}</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-full md:w-4xl md:grid-cols-[1fr_.30fr]">
							<ul className="grid grow gap-4 p-4 md:grid-cols-3 md:border-r">
								{serviceLinks.slice(0, 3).map((link) => (
									<li key={link.href}>
										<NavGridCard link={link} />
									</li>
								))}
							</ul>
							<ul className="space-y-1 p-4">
								{serviceLinks.slice(3).map((link) => (
									<li key={link.href}>
										<NavSmallItem
											item={link}
											href={link.href}
											className="gap-x-1"
										/>
									</li>
								))}
							</ul>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>{t('nav.about')}</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-full gap-3 p-4 md:w-[500px] md:grid-cols-2">
							{companyLinks.map((link) => (
								<li key={link.href}>
									<NavGridCard link={link} className="min-h-28" />
								</li>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink asChild className="cursor-pointer">
						<Link href={`/${currentLocale}/work`}>{t('nav.work')}</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink asChild className="cursor-pointer">
						<Link href={`/${currentLocale}/pricing`}>Pricing</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink asChild className="cursor-pointer">
						<Link href={`/${currentLocale}/contact`}>{t('nav.contact')}</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function MobileNav({
	serviceLinks,
	companyLinks,
	currentLocale,
	locales: localesParam,
	switchLocale,
	t,
}: {
	serviceLinks: NavItemType[];
	companyLinks: NavItemType[];
	currentLocale: string;
	locales: readonly { code: string; label: string; flag: string }[];
	switchLocale: (locale: string) => void;
	t: ReturnType<typeof useTranslations>;
}) {
	const sections = [
		{
			id: 'services',
			name: t('nav.services'),
			list: serviceLinks,
		},
		{
			id: 'company',
			name: t('nav.about'),
			list: companyLinks,
		},
	];

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="ghost" className="rounded-full lg:hidden">
					<MenuIcon className="size-5" />
					<span className="sr-only">Open menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				className="bg-background/95 supports-[backdrop-filter]:bg-background/80 w-full gap-0 backdrop-blur-lg"
				showClose={false}
			>
				<div className="flex h-14 items-center justify-between border-b px-4">
					<Link
						href={`/${currentLocale}`}
						className="flex items-center gap-2"
					>
						<div className="bg-primary flex size-7 items-center justify-center rounded-md">
							<CodeIcon className="text-primary-foreground size-4" />
						</div>
						<span className="text-lg font-bold">Syntax</span>
					</Link>
					<SheetClose asChild>
						<Button size="icon" variant="ghost" className="rounded-full">
							<XIcon className="size-5" />
							<span className="sr-only">Close</span>
						</Button>
					</SheetClose>
				</div>

				<div className="container grid gap-y-2 overflow-y-auto px-4 pt-5 pb-12">
					<SheetClose asChild>
						<Link
							href={`/${currentLocale}`}
							className="hover:bg-accent rounded-md px-4 py-3 font-medium transition-colors"
						>
							{t('nav.home')}
						</Link>
					</SheetClose>

					<Accordion type="single" collapsible>
						{sections.map((section) => (
							<AccordionItem key={section.id} value={section.id}>
								<AccordionTrigger className="capitalize hover:no-underline">
									{section.name}
								</AccordionTrigger>
								<AccordionContent className="space-y-1">
									<ul className="grid gap-1">
										{section.list.map((link) => (
											<li key={link.href}>
												<SheetClose asChild>
													<NavItemMobile item={link} href={link.href} />
												</SheetClose>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>

					<SheetClose asChild>
						<Link
							href={`/${currentLocale}/work`}
							className="hover:bg-accent rounded-md px-4 py-3 font-medium transition-colors"
						>
							{t('nav.work')}
						</Link>
					</SheetClose>

					<SheetClose asChild>
						<Link
							href={`/${currentLocale}/pricing`}
							className="hover:bg-accent rounded-md px-4 py-3 font-medium transition-colors"
						>
							Pricing
						</Link>
					</SheetClose>

					<SheetClose asChild>
						<Link
							href={`/${currentLocale}/contact`}
							className="hover:bg-accent rounded-md px-4 py-3 font-medium transition-colors"
						>
							{t('nav.contact')}
						</Link>
					</SheetClose>

					<div className="mt-4 border-t pt-4">
						<p className="text-muted-foreground mb-2 px-4 text-sm font-medium">
							Language
						</p>
						<div className="grid gap-1">
							{localesParam.map((locale) => (
								<SheetClose key={locale.code} asChild>
									<button
										onClick={() => switchLocale(locale.code)}
										className={cn(
											'hover:bg-accent flex items-center gap-3 rounded-md px-4 py-3 text-left transition-colors',
											currentLocale === locale.code && 'bg-accent/50 font-medium',
										)}
									>
										<span className="text-xl">{locale.flag}</span>
										<span>{locale.label}</span>
									</button>
								</SheetClose>
							))}
						</div>
					</div>

					<Button
						asChild
						size="lg"
						className="mt-4"
						onClick={() => trackCTAClick(t('common.cta'), 'Mobile Header')}
					>
						<Link href={`/${currentLocale}/contact`}>{t('common.cta')}</Link>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}

