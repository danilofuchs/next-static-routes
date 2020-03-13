import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

interface Props {
    messages: { [x: string]: string };
    locale: string;
    articleId: string;
}
export default function StaticPage(props: Props) {
    return (
        <>
            <div>{props.articleId}</div>
            <Link
                href="/[locale]/[help]/[helpArticle]"
                as="/pt/ajuda/encontrar-codigo-aliexpress"
            >
                <a>Aliexpress</a>
            </Link>
            <Link
                href="/[locale]/[help]/[helpArticle]"
                as="/es/ayuda/no-se-espanol"
                prefetch
            >
                <a>No sé español</a>
            </Link>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            ...helpArticles.pt.map((article) => ({
                params: {
                    locale: "pt",
                    help: "ajuda",
                    helpArticle: article.localizedId,
                },
            })),
            ...helpArticles.es.map((article) => ({
                params: {
                    locale: "es",
                    help: "ayuda",
                    helpArticle: article.localizedId,
                },
            })),
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.params?.locale;
    const articleId = context.params?.helpArticle;
    return {
        props: {
            messages: isLocale(locale) && messages[locale],
            articleId: articleId as string,
        },
    };
};

const messages = {
    pt: {
        a: "oi",
    },
    es: {
        a: "Arriba!",
    },
};

type Locale = keyof typeof messages;

const isLocale = (locale: any): locale is Locale => {
    return locale in messages;
};

const helpArticles = {
    pt: [
        {
            localizedId: "encontrar-codigo-aliexpress",
        },
        {
            localizedId: "encontrar-codigo-banggood",
        },
    ],
    es: [
        {
            localizedId: "hola-amigo",
        },
        {
            localizedId: "no-se-espanol",
        },
    ],
};
