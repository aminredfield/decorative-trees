import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    locale?: string;
    siteName?: string;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    productPrice?: number;
    productCurrency?: string;
    productAvailability?: 'instock' | 'outofstock' | 'preorder';
    noindex?: boolean;
    canonical?: string;
    alternateLanguages?: Array<{ lang: string; url: string }>;
}

const SEO: React.FC<SEOProps> = ({
    title = 'Декоративные деревья',
    description = 'Украсьте дом или офис живыми и искусственными деревьями премиум-класса. Доставка по Ташкенту и регионам.',
    keywords = 'декоративные деревья, бонсай, искусственные деревья, живые растения, Ташкент',
    image = '/assets/tree1.png',
    url,
    type = 'website',
    locale = 'ru_RU',
    siteName = 'Декоративные деревья',
    author = 'Декоративные деревья',
    publishedTime,
    modifiedTime,
    productPrice,
    productCurrency = 'UZS',
    productAvailability,
    noindex = false,
    canonical,
    alternateLanguages,
}) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = url ? `${baseUrl}${url}` : typeof window !== 'undefined' ? window.location.href : baseUrl;
    const fullImage = image?.startsWith('http') ? image : `${baseUrl}${image}`;
    const canonicalUrl = canonical ? `${baseUrl}${canonical}` : fullUrl;

    // Генерация JSON-LD для Schema.org
    const generateSchema = () => {
        const baseSchema = {
            '@context': 'https://schema.org',
            '@type': type === 'product' ? 'Product' : 'WebPage',
            name: title,
            description,
            url: fullUrl,
            image: fullImage,
        };

        if (type === 'product' && productPrice) {
            return {
                ...baseSchema,
                '@type': 'Product',
                offers: {
                    '@type': 'Offer',
                    price: productPrice,
                    priceCurrency: productCurrency,
                    availability: productAvailability
                        ? `https://schema.org/${productAvailability === 'instock' ? 'InStock' : productAvailability === 'preorder' ? 'PreOrder' : 'OutOfStock'}`
                        : 'https://schema.org/InStock',
                    url: fullUrl,
                },
            };
        }

        if (type === 'website') {
            return {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: siteName,
                url: baseUrl,
                logo: `${baseUrl}/favicon.svg`,
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+998-90-123-45-67',
                    contactType: 'Customer Service',
                    areaServed: 'UZ',
                    availableLanguage: ['ru', 'uz', 'en'],
                },
                sameAs: [
                    // Здесь можно добавить ссылки на социальные сети
                ],
            };
        }

        return baseSchema;
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {author && <meta name="author" content={author} />}

            {/* Canonical URL */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Alternate Languages */}
            {alternateLanguages?.map((alt) => (
                <link
                    key={alt.lang}
                    rel="alternate"
                    hrefLang={alt.lang}
                    href={`${baseUrl}${alt.url}`}
                />
            ))}

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex,nofollow" />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={locale} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Article specific tags */}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}

            {/* Product specific tags */}
            {type === 'product' && productPrice && (
                <>
                    <meta property="product:price:amount" content={productPrice.toString()} />
                    <meta property="product:price:currency" content={productCurrency} />
                </>
            )}

            {/* JSON-LD Schema */}
            <script type="application/ld+json">{JSON.stringify(generateSchema())}</script>

            {/* Favicon and App Icons */}
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

            {/* Theme Color */}
            <meta name="theme-color" content="#1F6B3B" />

            {/* Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        </Helmet>
    );
};

export default SEO;