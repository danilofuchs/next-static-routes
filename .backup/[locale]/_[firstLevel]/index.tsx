import { GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";

const HelpPage = dynamic(() => import("../../../components/pages/HelpPage"));

const pageNamePathMap = {
    help: ["ajuda", "ayuda"],
};
const pageNameComponentMap = {
    help: HelpPage,
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
            <Component {...props} />
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
                },
            },
            {
                params: {
                    locale: "es",
                    firstLevel: "ayuda",
                },
            },
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.params?.locale;
    const firstLevel = context.params?.firstLevel as string;
    const pageName = Object.entries(pageNamePathMap).find(([_, paths]) =>
        paths.includes(firstLevel)
    )?.[0];
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
