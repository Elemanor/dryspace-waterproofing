import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Services',
      links: [
        {
          text: 'Exterior Waterproofing',
          href: getPermalink('/services/exterior-waterproofing'),
        },
        {
          text: 'Interior Waterproofing',
          href: getPermalink('/services/interior-waterproofing'),
        },
        {
          text: 'Foundation Repair',
          href: getPermalink('/services/foundation-repair'),
        },
        {
          text: 'Sump Pump Installation',
          href: getPermalink('/services/sump-pump-installation'),
        },
        {
          text: 'French Drain Systems',
          href: getPermalink('/services/french-drain'),
        },
        {
          text: 'Underpinning',
          href: getPermalink('/services/underpinning'),
        },
        {
          text: 'Emergency Services',
          href: getPermalink('/services/emergency-waterproofing'),
        },
      ],
    },
    {
      text: 'Locations',
      links: [
        {
          text: 'Toronto',
          href: getPermalink('/locations/toronto'),
        },
        {
          text: 'Mississauga',
          href: getPermalink('/locations/mississauga'),
        },
        {
          text: 'Brampton',
          href: getPermalink('/locations/brampton'),
        },
        {
          text: 'Vaughan',
          href: getPermalink('/locations/vaughan'),
        },
        {
          text: 'Markham',
          href: getPermalink('/locations/markham'),
        },
        {
          text: 'View All Areas',
          href: getPermalink('/service-areas'),
        },
      ],
    },
    {
      text: 'Resources',
      links: [
        {
          text: 'Blog & Guides',
          href: getBlogPermalink(),
        },
        {
          text: 'Cost Calculator',
          href: getPermalink('/tools/waterproofing-cost-calculator'),
        },
        {
          text: 'Government Rebates',
          href: getPermalink('/government-rebates'),
        },
        {
          text: 'FAQ',
          href: getPermalink('/faq'),
        },
        {
          text: 'Warranty',
          href: getPermalink('/warranty'),
        },
      ],
    },
    {
      text: 'About',
      links: [
        {
          text: 'About Us',
          href: getPermalink('/about'),
        },
        {
          text: 'Case Studies',
          href: getPermalink('/case-studies'),
        },
        {
          text: 'Resources',
          href: getPermalink('/resources/inspection-checklist'),
        },
        {
          text: 'Financing',
          href: getPermalink('/financing'),
        },
      ],
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [
    {
      text: '24/7 Emergency',
      href: 'tel:437-545-0067',
      target: '_self',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Exterior Waterproofing', href: '/services/exterior-waterproofing' },
        { text: 'Interior Waterproofing', href: '/services/interior-waterproofing' },
        { text: 'Foundation Repair', href: '/services/foundation-repair' },
        { text: 'Sump Pump Installation', href: '/services/sump-pump-installation' },
        { text: 'French Drain', href: '/services/french-drain' },
        { text: 'Underpinning', href: '/services/underpinning' },
        { text: 'Emergency Services', href: '/services/emergency-waterproofing' },
      ],
    },
    {
      title: 'Service Areas',
      links: [
        { text: 'Toronto', href: '/locations/toronto' },
        { text: 'Mississauga', href: '/locations/mississauga' },
        { text: 'Brampton', href: '/locations/brampton' },
        { text: 'Vaughan', href: '/locations/vaughan' },
        { text: 'Markham', href: '/locations/markham' },
        { text: 'All Locations', href: '/service-areas' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Case Studies', href: '/case-studies' },
        { text: 'Financing', href: '/financing' },
        { text: 'Warranty', href: '/warranty' },
        { text: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog & Guides', href: '/blog' },
        { text: 'Cost Calculator', href: '/tools/waterproofing-cost-calculator' },
        { text: 'Government Rebates', href: '/government-rebates' },
        { text: 'FAQ', href: '/faq' },
        { text: 'Emergency Line', href: 'tel:437-545-0067' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Youtube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'Google Reviews', icon: 'tabler:brand-google', href: '#' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm"></span>
    &copy; 2024 Dryspace Waterproofing · Licensed & Insured · 25-Year Warranty
  `,
};