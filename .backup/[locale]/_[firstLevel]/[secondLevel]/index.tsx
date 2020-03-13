import { GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";

const HelpArticlesPage = dynamic(() =>
    import("../../../../components/pages/HelpArticlesPage")
);

const firstLevelPageNamePathMap = {
    help: ["ajuda", "ayuda"],
};

const pageNameComponentMap = {
    helpArticles: HelpArticlesPage,
};

interface Props {
    messages: { [x: string]: string };
    locale: string;
    pageName: keyof typeof pageNameComponentMap;
}
export default function StaticPage(props: Props) {
    const Component = pageNameComponentMap[props.pageName];
    return (
        <>
            <div>{props.locale}</div>
            <pre>{JSON.stringify(props.messages, null, 2)}</pre>
            <Component article="asd" />
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    locale: "pt",
                    firstLevel: "ajuda",
                    secondLevel: "encontrar-codigo",
                },
            },
            {
                params: {
                    locale: "es",
                    firstLevel: "ayuda",
                    secondLevel: "encontrar-codigo-espanol",
                },
            },
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.params?.locale;
    const firstLevel = context.params?.firstLevel as string;
    const pageName = Object.entries(
        firstLevelPageNamePathMap
    ).find(([_, paths]) => paths.includes(firstLevel))?.[0];

    console.log(pageName);
    return {
        props: {
            messages: isLocale(locale) && messages[locale],
            locale,
            pageName,
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
